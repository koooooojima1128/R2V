"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { timeAgo } from "@/lib/format";
import type { Comment, NewComment } from "@/lib/supabase/types";

type Props = {
  logId: string;
  comments: Comment[];
  myName: string;
  onNameChange: (name: string) => void;
  onSubmit: (input: NewComment) => Promise<void>;
};

/** 履歴カード内のコメント欄（野次・応援）。リアルタイムで増える。 */
export default function CommentThread({
  logId,
  comments,
  myName,
  onNameChange,
  onSubmit,
}: Props) {
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = body.trim();
    const author = myName.trim();
    if (!text || !author || busy) return;
    setBusy(true);
    try {
      await onSubmit({ log_id: logId, author, body: text });
      setBody("");
    } catch {
      /* エラーは握りつぶし、必要なら親でトースト表示に拡張 */
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-3 border-t border-border pt-3">
      <ul className="space-y-2">
        <AnimatePresence initial={false}>
          {comments.map((c) => (
            <motion.li
              key={c.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-sm"
            >
              <span className="font-semibold text-text">{c.author}</span>{" "}
              <span className="text-text/90">{c.body}</span>{" "}
              <span className="text-[11px] text-muted">{timeAgo(c.created_at)}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
        <input
          value={myName}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="名前"
          className="w-20 shrink-0 rounded-lg border border-border bg-bg px-2 py-1.5 text-xs text-text outline-none focus:border-accent focus:bg-surface"
        />
        <input
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="コメントする…"
          className="flex-1 rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-text outline-none placeholder:text-muted/70 focus:border-accent focus:bg-surface"
        />
        <button
          type="submit"
          disabled={!body.trim() || !myName.trim() || busy}
          className="shrink-0 rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:bg-surface-2 disabled:text-muted"
        >
          送信
        </button>
      </form>
    </div>
  );
}
