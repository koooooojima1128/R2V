"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CommentThread from "@/components/CommentThread";
import { formatLp, timeAgo } from "@/lib/format";
import type { Comment, LpLog, NewComment } from "@/lib/supabase/types";

type Props = {
  log: LpLog;
  comments: Comment[];
  myName: string;
  onNameChange: (name: string) => void;
  onComment: (input: NewComment) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

/** タイムラインの1カード。LP の増減 ＋ コメント欄。 */
export default function LogCard({
  log,
  comments,
  myName,
  onNameChange,
  onComment,
  onDelete,
}: Props) {
  const [open, setOpen] = useState(false);
  const positive = Number(log.amount) >= 0;

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl border border-border bg-surface/80 p-4 shadow-card backdrop-blur"
    >
      <div className="flex items-start gap-3">
        <div
          className={`shrink-0 rounded-xl border px-3 py-2 text-center font-mono text-lg font-bold ${
            positive ? "border-pos/30 bg-pos/10 text-pos" : "border-neg/30 bg-neg/10 text-neg"
          }`}
        >
          {formatLp(log.amount)}
          <span className="ml-0.5 text-[10px] font-medium opacity-70">LP</span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-text">{log.author}</span>
            <span className="font-mono text-[11px] text-muted">{timeAgo(log.created_at)}</span>
          </div>
          <p className="mt-0.5 break-words text-sm text-text/90">
            {log.reason || <span className="text-muted">（理由なし）</span>}
          </p>

          <div className="mt-2 flex items-center gap-3 text-xs">
            <button
              onClick={() => setOpen((v) => !v)}
              className="text-muted transition hover:text-text"
            >
              💬 コメント{comments.length > 0 ? ` ${comments.length}` : ""}
            </button>
            <button
              onClick={() => {
                if (confirm("この記録を取り消しますか？")) void onDelete(log.id);
              }}
              className="text-muted/70 transition hover:text-neg"
            >
              取り消し
            </button>
          </div>
        </div>
      </div>

      {open && (
        <CommentThread
          logId={log.id}
          comments={comments}
          myName={myName}
          onNameChange={onNameChange}
          onSubmit={onComment}
        />
      )}
    </motion.li>
  );
}
