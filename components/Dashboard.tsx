"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import EulaGate from "@/components/EulaGate";
import ProgressHero from "@/components/ProgressHero";
import RankCard from "@/components/RankCard";
import QuickLpForm from "@/components/QuickLpForm";
import Timeline from "@/components/Timeline";
import { useEula } from "@/hooks/useEula";
import { useMyName } from "@/hooks/useMyName";
import { useR2L } from "@/hooks/useR2L";
import { siteConfig } from "@/lib/site";
import { recordToast } from "@/lib/format";

/** 全員共通の1画面。誰がアクセスしても同じデータをリアルタイム表示。 */
export default function Dashboard() {
  const { accepted, accept } = useEula();
  const { name: myName, setName } = useMyName();
  const {
    logs,
    commentsByLog,
    total,
    goal,
    loading,
    error,
    hiddenIds,
    blockedAuthors,
    addLp,
    addComment,
    removeLp,
    addReport,
    hideLog,
    unhideAll,
    blockAuthor,
    unblockAll,
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

  const handleReported = useCallback(() => {
    setToast("報告を受け付けました。ご協力ありがとうございます。");
  }, []);

  const handleBlock = useCallback(
    (author: string) => {
      blockAuthor(author);
      setToast(`「${author}」の投稿をブロックしました`);
    },
    [blockAuthor],
  );

  // 利用規約への同意が確認できるまでは何も描画しない（ちらつき防止）。
  if (accepted === null) return null;
  if (!accepted) return <EulaGate onAccept={accept} />;

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
          onReport={addReport}
          onHide={hideLog}
          onBlock={handleBlock}
          onReported={handleReported}
          hiddenIds={hiddenIds}
          onUnhideAll={unhideAll}
          blockedAuthors={blockedAuthors}
          onUnblockAll={unblockAll}
          loading={loading}
        />
      </div>

      <footer className="mt-12 space-y-3 text-center text-xs text-muted">
        <p>1 LP = {siteConfig.yenPerLp.toLocaleString("ja-JP")}円 ／ 目標 {goal} LP</p>

        <div className="mx-auto max-w-md space-y-1.5 rounded-xl border border-border bg-surface px-4 py-3 text-left leading-relaxed">
          <p className="font-semibold text-text">不適切な内容の報告（17+）</p>
          <p>
            誹謗中傷・わいせつ・差別・迷惑行為などの投稿は禁止です。各記録・コメントの
            「<span className="font-medium text-text">報告</span>」「
            <span className="font-medium text-text">投稿者をブロック</span>」ボタン、
            または下記メールで通報してください。運営は報告を確認し、規約違反の投稿を
            <span className="font-medium text-text">24時間以内に削除</span>し、
            違反を繰り返す利用者のアクセスをブロックします。
          </p>
          <p>
            連絡先：
            <a
              href={`mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(
                "R2L 不適切な内容の報告",
              )}`}
              className="text-accent underline"
            >
              {siteConfig.contactEmail}
            </a>
          </p>
        </div>

        <p className="flex flex-wrap justify-center gap-x-3">
          <Link href="/terms" className="underline underline-offset-2 hover:text-text">
            利用規約
          </Link>
          <Link href="/privacy" className="underline underline-offset-2 hover:text-text">
            プライバシー
          </Link>
          <Link href="/support" className="underline underline-offset-2 hover:text-text">
            サポート
          </Link>
        </p>
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
