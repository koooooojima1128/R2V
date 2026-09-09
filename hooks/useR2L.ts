"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";
import { siteConfig } from "@/lib/site";
import { checkFields } from "@/lib/moderation";
import { DEMO_COMMENTS, DEMO_LOGS } from "@/data/seed";
import type { Comment, LpLog, NewComment, NewLpLog, NewReport } from "@/lib/supabase/types";

type ConnState = "connecting" | "live" | "demo" | "error";

const HIDDEN_KEY = "r2l:hidden";

function readHidden(): string[] {
  try {
    const raw = JSON.parse(localStorage.getItem(HIDDEN_KEY) || "[]");
    return Array.isArray(raw) ? raw.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function prependUnique(list: LpLog[], row: LpLog): LpLog[] {
  if (list.some((r) => r.id === row.id)) return list;
  return [row, ...list].sort((a, b) => b.created_at.localeCompare(a.created_at));
}

function appendUnique(list: Comment[], row: Comment): Comment[] {
  if (list.some((r) => r.id === row.id)) return list;
  return [...list, row].sort((a, b) => a.created_at.localeCompare(b.created_at));
}

/**
 * R2L の状態を1か所で持つフック。
 * - 初回ロード（lp_logs / comments）
 * - Supabase Realtime を購読し INSERT / DELETE を即時反映
 * - addLp / addComment で書き込み（送信前に checkFields で不適切語をブロック）
 * - addReport で不適切投稿を報告、hideLog で各自の端末から投稿を非表示
 */
export function useR2L() {
  const [logs, setLogs] = useState<LpLog[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [conn, setConn] = useState<ConnState>(isSupabaseConfigured ? "connecting" : "demo");
  const [error, setError] = useState<string | null>(null);
  const [hiddenIds, setHiddenIds] = useState<string[]>([]);

  useEffect(() => {
    setHiddenIds(readHidden());
  }, []);

  // ── 初回ロード ──────────────────────────────────────────────
  useEffect(() => {
    let active = true;

    if (!isSupabaseConfigured) {
      setLogs(DEMO_LOGS);
      setComments(DEMO_COMMENTS);
      setLoading(false);
      return;
    }

    (async () => {
      const [logsRes, commentsRes] = await Promise.all([
        supabase.from("lp_logs").select("*").order("created_at", { ascending: false }),
        supabase.from("comments").select("*").order("created_at", { ascending: true }),
      ]);
      if (!active) return;

      if (logsRes.error || commentsRes.error) {
        setError((logsRes.error ?? commentsRes.error)?.message ?? "読み込みに失敗しました");
        setConn("error");
      } else {
        setLogs((logsRes.data as LpLog[]) ?? []);
        setComments((commentsRes.data as Comment[]) ?? []);
      }
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, []);

  // ── Realtime 購読 ──────────────────────────────────────────
  useEffect(() => {
    if (!isSupabaseConfigured) return;

    const channel: RealtimeChannel = supabase
      .channel("r2l-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "lp_logs" },
        (payload) => setLogs((prev) => prependUnique(prev, payload.new as LpLog)),
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "lp_logs" },
        (payload) => {
          const removed = payload.old as { id: string };
          setLogs((prev) => prev.filter((r) => r.id !== removed.id));
          setComments((prev) => prev.filter((c) => c.log_id !== removed.id));
        },
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "comments" },
        (payload) => setComments((prev) => appendUnique(prev, payload.new as Comment)),
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "comments" },
        (payload) => {
          const removed = payload.old as { id: string };
          setComments((prev) => prev.filter((c) => c.id !== removed.id));
        },
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") setConn("live");
        else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") setConn("error");
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // ── 派生値 ─────────────────────────────────────────────────
  const total = useMemo(
    () => logs.reduce((sum, l) => sum + Number(l.amount), 0),
    [logs],
  );

  const commentsByLog = useMemo(() => {
    const map = new Map<string, Comment[]>();
    for (const c of comments) {
      const arr = map.get(c.log_id);
      if (arr) arr.push(c);
      else map.set(c.log_id, [c]);
    }
    return map;
  }, [comments]);

  // ── 書き込み ───────────────────────────────────────────────
  const addLp = useCallback(async (input: NewLpLog) => {
    const bad = checkFields(input.author, input.reason);
    if (bad) throw new Error(bad);

    if (!isSupabaseConfigured) {
      const row: LpLog = {
        ...input,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
      };
      setLogs((prev) => prependUnique(prev, row));
      return;
    }
    const { error } = await supabase.from("lp_logs").insert(input);
    if (error) throw new Error(error.message);
  }, []);

  const addComment = useCallback(async (input: NewComment) => {
    const bad = checkFields(input.author, input.body);
    if (bad) throw new Error(bad);

    if (!isSupabaseConfigured) {
      const row: Comment = {
        ...input,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
      };
      setComments((prev) => appendUnique(prev, row));
      return;
    }
    const { error } = await supabase.from("comments").insert(input);
    if (error) throw new Error(error.message);
  }, []);

  const removeLp = useCallback(async (id: string) => {
    if (!isSupabaseConfigured) {
      setLogs((prev) => prev.filter((r) => r.id !== id));
      setComments((prev) => prev.filter((c) => c.log_id !== id));
      return;
    }
    const { error } = await supabase.from("lp_logs").delete().eq("id", id);
    if (error) throw new Error(error.message);
  }, []);

  // ── モデレーション：報告 / 非表示 ─────────────────────────────
  const addReport = useCallback(async (input: NewReport) => {
    if (!isSupabaseConfigured) return; // デモモードでは記録先が無いので無視
    const { error } = await supabase.from("reports").insert(input);
    if (error) throw new Error(error.message);
  }, []);

  const hideLog = useCallback((id: string) => {
    setHiddenIds((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      try {
        localStorage.setItem(HIDDEN_KEY, JSON.stringify(next));
      } catch {
        /* private mode などでは無視 */
      }
      return next;
    });
  }, []);

  const unhideAll = useCallback(() => {
    setHiddenIds([]);
    try {
      localStorage.removeItem(HIDDEN_KEY);
    } catch {
      /* 無視 */
    }
  }, []);

  return {
    logs,
    commentsByLog,
    total,
    goal: siteConfig.goalLp,
    loading,
    conn,
    error,
    hiddenIds,
    addLp,
    addComment,
    removeLp,
    addReport,
    hideLog,
    unhideAll,
  };
}
