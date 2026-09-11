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
  onBlock: (author: string) => void;
  onReported: () => void;
  hiddenIds: string[];
  onUnhideAll: () => void;
  blockedAuthors: string[];
  onUnblockAll: () => void;
  loading: boolean;
};

/**
 * LP 増減履歴のタイムライン（新しい順）。
 * 非表示にした投稿・ブロックした投稿者の記録は、各自の端末でのみ除外される。
 */
export default function Timeline({
  logs,
  commentsByLog,
  myName,
  onNameChange,
  onComment,
  onDelete,
  onReport,
  onHide,
  onBlock,
  onReported,
  hiddenIds,
  onUnhideAll,
  blockedAuthors,
  onUnblockAll,
  loading,
}: Props) {
  const visible = logs.filter(
    (l) => !hiddenIds.includes(l.id) && !blockedAuthors.includes(l.author),
  );
  const removedCount = logs.length - visible.length;

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
          表示できる記録がありません（非表示／ブロック中）。
          <button
            onClick={() => {
              onUnhideAll();
              onUnblockAll();
            }}
            className="ml-1 text-accent underline"
          >
            すべて解除
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
                onBlock={onBlock}
                onReported={onReported}
              />
            ))}
          </AnimatePresence>
        </ul>
      )}

      {removedCount > 0 && visible.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted">
          {hiddenIds.length > 0 && (
            <button onClick={onUnhideAll} className="underline underline-offset-2 hover:text-text">
              非表示の投稿を再表示（{hiddenIds.length}件）
            </button>
          )}
          {blockedAuthors.length > 0 && (
            <button onClick={onUnblockAll} className="underline underline-offset-2 hover:text-text">
              ブロック中の投稿者を解除（{blockedAuthors.length}人）
            </button>
          )}
        </div>
      )}
    </section>
  );
}
