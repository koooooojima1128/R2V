"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/site";

type Props = { onAccept: () => void };

/**
 * 初回起動時に必ず表示する同意ゲート。
 * 同意するまでダッシュボードの操作はできない（App Store ガイドライン1.2：
 * 「利用者に規約への同意を必須にし、不適切コンテンツ・迷惑行為にゼロ・トレランスであることを
 *  明記する」への対応）。
 */
export default function EulaGate({ onAccept }: Props) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-bg/95 px-4 py-10 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-lift">
        <span className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
          利用規約への同意・17+
        </span>
        <h1 className="mt-2 font-display text-lg font-extrabold tracking-tight text-text">
          はじめる前にご確認ください
        </h1>

        <div className="mt-3 space-y-2.5 text-sm leading-relaxed text-text/85">
          <p>
            {siteConfig.name} は、不適切なコンテンツ・迷惑行為を
            <span className="font-semibold text-text">一切許容しません</span>。
            規約に違反する投稿は
            <span className="font-semibold text-text">24時間以内に削除</span>し、
            違反した利用者はアクセスをブロックします。
          </p>
          <p>
            各記録・コメントには「報告」「非表示」「投稿者をブロック」「取り消し」の
            操作があります。問題の通報は
            <a href={`mailto:${siteConfig.contactEmail}`} className="text-accent underline">
              {siteConfig.contactEmail}
            </a>
            でも受け付けます。
          </p>
          <p>本アプリは17歳以上の方を対象としています。</p>
        </div>

        <p className="mt-4 text-xs text-muted">
          詳しくは
          <Link href="/terms" target="_blank" className="mx-1 text-accent underline">
            利用規約
          </Link>
          ・
          <Link href="/privacy" target="_blank" className="mx-1 text-accent underline">
            プライバシーポリシー
          </Link>
          をご確認ください。「同意して利用を開始する」を押すと、これらに同意したものとみなします。
        </p>

        <button
          onClick={onAccept}
          className="mt-5 w-full rounded-xl bg-text px-4 py-3 text-sm font-semibold text-bg transition hover:brightness-110"
        >
          同意して利用を開始する
        </button>
      </div>
    </div>
  );
}
