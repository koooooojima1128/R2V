"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CommentThread from "@/components/CommentThread";
import { formatLp, timeAgo } from "@/lib/format";
import type { Comment, LpLog, NewComment, NewReport } from "@/lib/supabase/types";

type Props = {
  log: LpLog;
  comments: Comment[];
  myName: string;
  onNameChange: (name: string) => void;
  onComment: (input: NewComment) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onReport: (input: NewReport) => Promise<void>;
  onHide: (id: string) => void;
  onReported: () => void;
};

/** タイムラインの1カード。LP の増減 ＋ コメント欄 ＋ モデレーション操作。 */
export default function LogCard({
  log,
  comments,
  myName,
  onNameChange,
  onComment,
  onDelete,
  onReport,
  onHide,
  onReported,
}: Props) {
  const [open, setOpen] = useState(false);
  const positive = Number(log.amount) >= 0;

  async function handleReport() {
    const note = window.prompt("この記録を報告します。理由（任意）:");
    if (note === null) return;
    try {
      await onReport({
        target_type: "log",
        target_id: log.id,
        reporter: myName.trim() || null,
        note: note.trim() || null,
      });
      onReported();
    } catch {
      /* 失敗時は静かに無視（ネットワーク等） */
    }
  }

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-xl border border-border bg-surface p-4 shadow-card"
    >
      <div className="flex items-start gap-3">
        <div
          className={`shrink-0 rounded-lg border px-3 py-2 text-center font-display text-lg font-bold ${
            positive ? "border-pos/25 bg-pos/10 text-pos" : "border-neg/25 bg-neg/10 text-neg"
          }`}
        >
          {formatLp(log.amount)}
          <span className="ml-0.5 text-[10px] font-medium opacity-70">LP</span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-text">{log.author}</span>
            <span className="text-[11px] text-muted">{timeAgo(log.created_at)}</span>
          </div>
          <p className="mt-0.5 break-words text-sm text-text/90">
            {log.reason || <span className="text-muted">（理由なし）</span>}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
            <button
              onClick={() => setOpen((v) => !v)}
              className="text-muted transition hover:text-text"
            >
              💬 コメント{comments.length > 0 ? ` ${comments.length}` : ""}
            </button>
            <button
              onClick={handleReport}
              className="text-muted/80 transition hover:text-text"
            >
              報告
            </button>
            <button
              onClick={() => onHide(log.id)}
              className="text-muted/80 transition hover:text-text"
            >
              非表示
            </button>
            <button
              onClick={() => {
                if (confirm("この記録を取り消しますか？")) void onDelete(log.id);
              }}
              className="text-muted/80 transition hover:text-neg"
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
          onReport={onReport}
          onReported={onReported}
        />
      )}
    </motion.li>
  );
}
