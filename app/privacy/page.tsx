import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `プライバシーポリシー — ${siteConfig.name}`,
  description: `${siteConfig.name} のプライバシーポリシー。`,
};

const UPDATED = "2026年9月9日";
const CONTACT = "koooooojima1128@gmail.com";

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-12 sm:py-16">
      <Link
        href="/"
        className="text-xs font-medium text-muted transition hover:text-text"
      >
        ← {siteConfig.name} にもどる
      </Link>

      <h1 className="mt-6 font-display text-2xl font-extrabold tracking-tight text-text">
        プライバシーポリシー
      </h1>
      <p className="mt-1 text-xs text-muted">最終更新日：{UPDATED}</p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-text/90">
        <section>
          <p>
            {siteConfig.name}（以下「本アプリ」）は、友人グループで目標金額（LP）を
            共同管理するためのアプリです。本ポリシーは、本アプリが取り扱う情報と
            その目的を説明します。
          </p>
        </section>

        <section>
          <h2 className="font-display text-base font-bold text-text">1. 取得する情報</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-text/80">
            <li>利用者が入力した表示名（ニックネーム）</li>
            <li>利用者が記録した LP の増減、金額、理由のテキスト</li>
            <li>各記録に対して投稿したコメントのテキストと投稿日時</li>
          </ul>
          <p className="mt-2 text-text/80">
            アカウント登録はなく、氏名・メールアドレス・電話番号・位置情報・
            連絡先・端末識別子などは取得しません。広告や行動追跡（トラッキング）は
            行いません。
          </p>
        </section>

        <section>
          <h2 className="font-display text-base font-bold text-text">2. 利用目的</h2>
          <p className="mt-2 text-text/80">
            入力された情報は、共有ダッシュボードとタイムラインを本アプリの
            利用者全員にリアルタイムで表示するためにのみ使用します。
            それ以外の目的では利用しません。
          </p>
        </section>

        <section>
          <h2 className="font-display text-base font-bold text-text">3. 保存先と第三者提供</h2>
          <p className="mt-2 text-text/80">
            データはバックエンドサービス Supabase（
            <a
              href="https://supabase.com/privacy"
              className="text-accent underline"
              target="_blank"
              rel="noreferrer"
            >
              supabase.com/privacy
            </a>
            ）上のデータベースに保存されます。ホスティングは Vercel を利用します。
            これらのインフラ提供事業者を除き、第三者へのデータの販売・提供は行いません。
          </p>
        </section>

        <section>
          <h2 className="font-display text-base font-bold text-text">4. 公開範囲</h2>
          <p className="mt-2 text-text/80">
            本アプリは URL を知っている人なら誰でも閲覧・入力できる設計です。
            機微な個人情報は入力しないでください。入力内容は他の利用者に表示されます。
          </p>
        </section>

        <section>
          <h2 className="font-display text-base font-bold text-text">5. 保持期間・削除</h2>
          <p className="mt-2 text-text/80">
            記録・コメントはアプリ内の「取り消し」操作で個別に削除できます。
            データ全体の削除を希望する場合は、下記の連絡先までご連絡ください。
            合理的な期間内に対応します。
          </p>
        </section>

        <section>
          <h2 className="font-display text-base font-bold text-text">6. コンテンツのモデレーション</h2>
          <p className="mt-2 text-text/80">
            不適切な語を含む投稿は送信時に自動でブロックされます。各投稿・コメントの
            「報告」から通報でき、報告内容は運営（Supabase 上の管理画面）で確認します。
            「非表示」で自分の画面から特定の投稿を除外することもできます。詳しくは{" "}
            <Link href="/terms" className="text-accent underline">
              利用規約
            </Link>
            をご覧ください。
          </p>
        </section>

        <section>
          <h2 className="font-display text-base font-bold text-text">7. 児童のプライバシー</h2>
          <p className="mt-2 text-text/80">
            本アプリは特定年齢層を対象に設計・宣伝しておらず、児童から意図的に
            情報を収集することはありません。
          </p>
        </section>

        <section>
          <h2 className="font-display text-base font-bold text-text">8. ポリシーの変更</h2>
          <p className="mt-2 text-text/80">
            本ポリシーは必要に応じて改定されます。重要な変更がある場合は
            本ページで告知します。
          </p>
        </section>

        <section>
          <h2 className="font-display text-base font-bold text-text">9. お問い合わせ</h2>
          <p className="mt-2 text-text/80">
            本ポリシーおよびデータの取り扱いに関するお問い合わせ先：{CONTACT}
          </p>
        </section>
      </div>
    </main>
  );
}
