import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `サポート — ${siteConfig.name}`,
  description: `${siteConfig.name} の使い方とお問い合わせ。`,
};

const CONTACT = "roadtolex@gmail.com";

export default function SupportPage() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-12 sm:py-16">
      <Link href="/" className="text-xs font-medium text-muted transition hover:text-text">
        ← {siteConfig.name} にもどる
      </Link>

      <h1 className="mt-6 font-display text-2xl font-extrabold tracking-tight text-text">
        サポート
      </h1>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-text/90">
        <section>
          <h2 className="font-display text-base font-bold text-text">これは何？</h2>
          <p className="mt-2 text-text/80">
            {siteConfig.name}（{siteConfig.fullName}）は、友人グループで目標金額を
            共同で貯めるためのポイント（LP）管理アプリです。1 LP = 1万円、
            目標は {siteConfig.goalLp} LP。誰かが記録すると全員の画面に
            リアルタイムで反映されます。
          </p>
        </section>

        <section>
          <h2 className="font-display text-base font-bold text-text">使い方</h2>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-text/80">
            <li>「クイック LP 操作」で、自分の名前・増減する LP・理由を入力</li>
            <li>「記録」を押すと、合計・進捗バー・称号が全員分更新される</li>
            <li>各記録にコメント（応援・野次）を残せる</li>
            <li>間違えたら記録の「取り消し」で削除できる</li>
          </ol>
        </section>

        <section>
          <h2 className="font-display text-base font-bold text-text">
            不適切な投稿を見つけたら
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-text/80">
            <li>
              各記録・コメントの「<span className="font-medium text-text">報告</span>」ボタン、
              またはアプリ内フッター記載のメール（{CONTACT}）で運営に通報できます。
            </li>
            <li>
              運営は報告を確認し、規約違反の投稿を
              <span className="font-medium text-text">24時間以内に削除</span>し、
              違反を繰り返す利用者のアクセスをブロックします。
            </li>
            <li>
              「<span className="font-medium text-text">非表示</span>」で、その投稿を
              自分の画面から除外できます。
            </li>
            <li>
              「<span className="font-medium text-text">投稿者をブロック</span>」で、
              その利用者の投稿を今後自分の画面に表示しないようにできます。
            </li>
            <li>
              「<span className="font-medium text-text">取り消し</span>」で、
              投稿者を問わず即座に投稿を削除できます。
            </li>
            <li>不適切な語を含む投稿は、送信時に自動でブロックされます。</li>
          </ul>
          <p className="mt-2 text-text/80">
            禁止事項と対応方針は{" "}
            <Link href="/terms" className="text-accent underline">
              利用規約
            </Link>
            に記載しています。本アプリは 17+（成人向け）です。
          </p>
        </section>

        <section>
          <h2 className="font-display text-base font-bold text-text">よくある質問</h2>
          <p className="mt-2 font-medium text-text">Q. データは誰に見えますか？</p>
          <p className="text-text/80">
            アプリを開いた全員に見えます。ログインはありません。機微な個人情報は
            入力しないでください。
          </p>
          <p className="mt-3 font-medium text-text">Q. 反映されません</p>
          <p className="text-text/80">
            ネットワーク接続を確認し、アプリを再起動してください。オフライン中の
            変更は再接続時に同期されます。
          </p>
          <p className="mt-3 font-medium text-text">Q. データを全部消したい</p>
          <p className="text-text/80">下記の連絡先までご連絡ください。</p>
        </section>

        <section>
          <h2 className="font-display text-base font-bold text-text">お問い合わせ</h2>
          <p className="mt-2 text-text/80">{CONTACT}</p>
          <p className="mt-2 text-text/80">
            プライバシーについては{" "}
            <Link href="/privacy" className="text-accent underline">
              プライバシーポリシー
            </Link>
            をご覧ください。
          </p>
        </section>
      </div>
    </main>
  );
}
