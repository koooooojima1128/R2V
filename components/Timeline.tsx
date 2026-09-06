"use client";

import { AnimatePresence } from "framer-motion";
import LogCard from "@/components/LogCard";
import type { Comment, LpLog, NewComment } from "@/lib/supabase/types";

type Props = {
  logs: LpLog[];
  commentsByLog: Map<string, Comment[]>;
  myName: string;
  onNameChange: (name: string) => void;
  onComment: (input: NewComment) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  loading: boolean;
};

/** LP 増減履歴のタイムライン（新しい順）。 */
export default function Timeline({
  logs,
  commentsByLog,
  myName,
  onNameChange,
  onComment,
  onDelete,
  loading,
}: Props) {
  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold text-text">タイムライン</h2>

      {loading ? (
        <p className="text-sm text-muted">読み込み中…</p>
      ) : logs.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted">
          まだ記録がありません。最初の LP を入れてみよう。
        </p>
      ) : (
        <ul className="space-y-3">
          <AnimatePresence initial={false}>
            {logs.map((log) => (
              <LogCard
                key={log.id}
                log={log}
                comments={commentsByLog.get(log.id) ?? []}
                myName={myName}
                onNameChange={onNameChange}
                onComment={onComment}
                onDelete={onDelete}
              />
            ))}
          </AnimatePresence>
        </ul>
      )}
    </section>
  );
}
