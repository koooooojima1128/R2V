"use client";

import { AnimatePresence } from "framer-motion";
import LogCard from "@/components/LogCard";
import type { Comment, LpLog, NewComment, NewReport } from "@/lib/supabase/types";

type Props = {
  logs: LpLog[];
  commentsByLog: Map<string, Comment[]>;
  myName: string;
  onNameChange: (name: string) => void;
  onComment: (input: NewComment) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onReport: (input: NewReport) => Promise<void>;
  onHide: (id: string) => void;
  onReported: () => void;
  hiddenIds: string[];
  onUnhideAll: () => void;
  loading: boolean;
};

/** LP 増減履歴のタイムライン（新しい順）。非表示にした投稿は各自の端末で除外される。 */
export default function Timeline({
  logs,
  commentsByLog,
  myName,
  onNameChange,
  onComment,
  onDelete,
  onReport,
  onHide,
  onReported,
  hiddenIds,
  onUnhideAll,
  loading,
}: Props) {
  const visible = logs.filter((l) => !hiddenIds.includes(l.id));
  const hiddenCount = logs.length - visible.length;

  return (
    <section>
      <h2 className="mb-3 font-display text-sm font-bold text-text">タイムライン</h2>

      {loading ? (
        <p className="text-sm text-muted">読み込み中…</p>
      ) : logs.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border bg-surface p-6 text-center text-sm text-muted">
          まだ記録がありません。最初の LP を入れてみよう。
        </p>
      ) : visible.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border bg-surface p-6 text-center text-sm text-muted">
          すべての記録を非表示にしています。
          <button onClick={onUnhideAll} className="ml-1 text-accent underline">
            再表示
          </button>
        </p>
      ) : (
        <ul className="space-y-3">
          <AnimatePresence initial={false}>
            {visible.map((log) => (
              <LogCard
                key={log.id}
                log={log}
                comments={commentsByLog.get(log.id) ?? []}
                myName={myName}
                onNameChange={onNameChange}
                onComment={onComment}
                onDelete={onDelete}
                onReport={onReport}
                onHide={onHide}
                onReported={onReported}
              />
            ))}
          </AnimatePresence>
        </ul>
      )}

      {hiddenCount > 0 && visible.length > 0 && (
        <button
          onClick={onUnhideAll}
          className="mt-3 text-xs text-muted underline underline-offset-2 transition hover:text-text"
        >
          非表示にした投稿 {hiddenCount} 件を再表示
        </button>
      )}
    </section>
  );
}
