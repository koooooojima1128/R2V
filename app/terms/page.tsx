import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `利用規約 — ${siteConfig.name}`,
  description: `${siteConfig.name} の利用規約（EULA）。`,
};

const UPDATED = "2026年9月9日";
const CONTACT = "koooooojima1128@gmail.com";

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-12 sm:py-16">
      <Link href="/" className="text-xs font-medium text-muted transition hover:text-text">
        ← {siteConfig.name} にもどる
      </Link>

      <h1 className="mt-6 font-display text-2xl font-extrabold tracking-tight text-text">
        利用規約
      </h1>
      <p className="mt-1 text-xs text-muted">最終更新日：{UPDATED}</p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-text/90">
        <section>
          <p>
            本規約は、{siteConfig.name}（{siteConfig.fullName}、以下「本アプリ」）の
            利用条件を定めるものです。本アプリを利用した時点で、本規約に同意したものと
            みなします。
          </p>
        </section>

        <section>
          <h2 className="font-display text-base font-bold text-text">1. サービス内容</h2>
          <p className="mt-2 text-text/80">
            本アプリは、友人グループが1つの目標金額（LP）を共同で管理するための
            共有ツールです。アカウント登録はありません。利用者が入力した内容は、
            本アプリを開いた他の利用者に表示されます。
          </p>
        </section>

        <section>
          <h2 className="font-display text-base font-bold text-text">
            2. 禁止事項（不適切コンテンツへのゼロ・トレランス）
          </h2>
          <p className="mt-2 text-text/80">
            本アプリでは、不快・不適切なコンテンツや迷惑行為を一切許容しません。
            以下の投稿・行為を禁止します。
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-text/80">
            <li>誹謗中傷、差別、ハラスメント、脅迫、いじめ</li>
            <li>わいせつ・性的に露骨な表現、暴力的な表現</li>
            <li>他人の個人情報や機微な情報の無断投稿</li>
            <li>スパム、なりすまし、その他他の利用者に迷惑をかける行為</li>
            <li>法令または公序良俗に反する行為</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-base font-bold text-text">3. モデレーション</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-text/80">
            <li>不適切な語を含む投稿は、送信時に自動的にブロックされます。</li>
            <li>各投稿・コメントの「報告」から、問題のある内容を運営に通報できます。</li>
            <li>各投稿の「非表示」で、その内容を自分の画面から除外できます。</li>
            <li>各投稿は「取り消し」で削除できます。</li>
            <li>
              報告を受けた内容は運営が確認し、規約違反と判断した投稿は削除し、
              悪質な利用者のアクセスを制限します。対応は合理的な期間内に行います。
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-base font-bold text-text">4. 免責</h2>
          <p className="mt-2 text-text/80">
            本アプリは現状有姿で提供され、特定目的への適合性や可用性を保証しません。
            利用者間のトラブル、入力内容によって生じた損害について、運営は責任を
            負いません。金額はすべて利用者が手動で入力する数値であり、実際の
            送金・決済機能はありません。
          </p>
        </section>

        <section>
          <h2 className="font-display text-base font-bold text-text">5. 規約の変更</h2>
          <p className="mt-2 text-text/80">
            本規約は必要に応じて改定されます。重要な変更は本ページで告知します。
          </p>
        </section>

        <section>
          <h2 className="font-display text-base font-bold text-text">6. お問い合わせ</h2>
          <p className="mt-2 text-text/80">
            規約・報告・削除依頼に関するご連絡先：{CONTACT}
          </p>
          <p className="mt-2 text-text/80">
            <Link href="/privacy" className="text-accent underline">
              プライバシーポリシー
            </Link>
            も併せてご確認ください。
          </p>
        </section>
      </div>
    </main>
  );
}
