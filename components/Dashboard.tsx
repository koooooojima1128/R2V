"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProgressHero from "@/components/ProgressHero";
import RankCard from "@/components/RankCard";
import QuickLpForm from "@/components/QuickLpForm";
import Timeline from "@/components/Timeline";
import { useMyName } from "@/hooks/useMyName";
import { useR2L } from "@/hooks/useR2L";
import { siteConfig } from "@/lib/site";
import { recordToast } from "@/lib/format";

/** 全員共通の1画面。誰がアクセスしても同じデータをリアルタイム表示。 */
export default function Dashboard() {
  const { name: myName, setName } = useMyName();
  const {
    logs,
    commentsByLog,
    total,
    goal,
    loading,
    error,
    addLp,
    addComment,
    removeLp,
  } = useR2L();

  const [toast, setToast] = useState<string | null>(null);
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(id);
  }, [toast]);

  const handleRecorded = useCallback((amount: number) => {
    setToast(recordToast(amount));
  }, []);

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:py-14">
      <header className="mb-7 flex items-center justify-between">
        <div>
          <h1 className="font-display text-lg font-extrabold tracking-tight text-text">
            {siteConfig.name}{" "}
            <span className="font-semibold text-muted">{siteConfig.fullName}</span>
          </h1>
          <p className="text-xs text-muted">{siteConfig.tagline}</p>
        </div>
        <span className="rounded-full border border-border bg-surface px-3 py-1 font-display text-xs font-medium text-muted">
          目標 {goal} LP
        </span>
      </header>

      {error && (
        <p className="mb-4 rounded-xl border border-neg/30 bg-neg/10 px-3 py-2 text-xs text-neg">
          {error}
        </p>
      )}

      <div className="space-y-5">
        <ProgressHero total={total} goal={goal} />
        <RankCard total={total} />
        <QuickLpForm
          myName={myName}
          onNameChange={setName}
          onSubmit={addLp}
          onRecorded={handleRecorded}
        />
        <Timeline
          logs={logs}
          commentsByLog={commentsByLog}
          myName={myName}
          onNameChange={setName}
          onComment={addComment}
          onDelete={removeLp}
          loading={loading}
        />
      </div>

      <footer className="mt-12 text-center text-xs text-muted">
        1 LP = {siteConfig.yenPerLp.toLocaleString("ja-JP")}円 ／ 目標 {goal} LP ・ レクサス買って爆モテ
      </footer>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none fixed inset-x-0 bottom-6 z-50 mx-auto w-fit max-w-[90vw] rounded-full border border-border bg-surface px-4 py-2 text-center text-sm font-medium text-text shadow-lift"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
