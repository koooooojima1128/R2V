# App Store Connect 入力内容（コピペ用）

App Store Connect のフォームおよび Resolution Center への返信に使う文面。
連絡先は `roadtolex@gmail.com`。

---

## 基本情報

| 欄 | 値 |
|---|---|
| App 名 | `R2L`（作成済み・Apple ID 6809658635） |
| サブタイトル（30字以内） | `友達と貯めて、称号を上げる` |
| プライマリカテゴリ | ファイナンス |
| セカンダリカテゴリ | ライフスタイル |
| 年齢レーティング | 4+（すべて「なし」） |
| 価格 | 無料 |
| サポート URL | `https://road-to-lexus.vercel.app/support` |
| マーケティング URL | （空欄） |
| プライバシーポリシー URL | `https://road-to-lexus.vercel.app/privacy` |
| コンテンツ配信権 | サードパーティのコンテンツを含まない（オリジナルのみ） |

## スクリーンショット必要サイズ（この App Store Connect の枠）

- **iPhone 6.5"** … `1284 × 2778`（透過なし・RGB）
- **iPad 13"** … `2048 × 2732`（透過なし・RGB）

---

## プロモーションテキスト（170字以内）

```
友達みんなで目標金額を貯めるための共有アプリ。誰かが「＋1 LP」と記録すると、全員の画面の合計と称号がその場で更新。アルトから始まり、貯まるほどモテ称号がランクアップします。
```

## 説明（Description）

```
R2L（Road to Lexus）は、友人グループで一つの目標金額を一緒に貯めるためのポイント管理アプリです。

■ 1つの画面をみんなで共有
1 LP = 1万円。誰かが LP を増減させると、その場で全員の画面の合計・進捗バー・称号が更新されます。リロードは不要です。

■ 記録はかんたん
「誰が / いくら / 理由」を入力して記録するだけ。バイト代が入ったら＋、衝動買いしたら−。ゆるい家計簿のように使えます。

■ 称号システム
累計 LP に応じて称号がランクアップ。Alto Solitary（孤高の軽自動車）から始まり、500 LP 到達で Ultimate Lexus Lover。目標到達までのモチベーションになります。

■ コメントで盛り上がる
それぞれの記録に、応援や野次をコメントで残せます。

■ モデレーション
不適切な語を含む投稿は自動でブロック。各投稿・コメントは「報告」で通報、「非表示」で自分の画面から除外、「取り消し」で削除できます。禁止事項は利用規約に記載しています。

■ ログイン不要
アカウント登録はありません。共有された相手とだけ使ってください。
```

## キーワード（100字以内）

```
貯金,目標,共有,ポイント,友達,グループ,家計簿,割り勘,モチベーション,称号,リアルタイム,貯める
```

---

## App のプライバシー（回答）

| 質問 | 回答 |
|---|---|
| データを収集するか | はい |
| 収集する種類 | **ユーザーコンテンツ**（表示名、記録の理由テキスト、コメント本文） |
| 用途 | **アプリの機能** のみ |
| ユーザーIDに紐づくか | いいえ |
| トラッキングに使うか | いいえ |
| 位置情報・連絡先・識別子・使用状況データ | 収集しない |

---

## App Review Information → Notes（審査メモ）

```
No account or login is required. The app opens directly to a shared dashboard.

To test the main feature:
1. Launch the app.
2. In "クイック LP 操作": type any name in "誰が", tap an amount (e.g. +1), optionally type a reason, then tap "記録".
3. The total, progress bar and rank at the top update immediately.
4. Tap "💬 コメント" on any entry to add a comment.
5. Tap "取り消し" to delete an entry, "非表示" to hide it locally, "報告" to report it.

Purpose: a lightweight shared savings tracker for a small private group of friends pooling money toward one goal. Data is a single shared state edited from multiple devices via Supabase Realtime; it is not a mirror of a website. Ages 17+.

User-generated content moderation:
- Objectionable words are blocked at submission time (client-side filter).
- Every entry and comment has a "報告" (report) action that writes to a moderation queue we review.
- Every entry has "非表示" (hide from my view) and "取り消し" (delete).
- Terms of Use with zero tolerance for objectionable content and abusive users: https://road-to-lexus.vercel.app/terms
- Contact: roadtolex@gmail.com

External services: Supabase (PostgreSQL database + Realtime sync), Vercel (static hosting of bundled front-end assets). No auth provider, payment processor, ads, analytics, tracking, or AI service.

Regional differences: none. Japanese-language only, no region-locked content, no location-based logic. Works consistently in all regions.

Not a regulated industry: it is a personal savings tracker with no money movement (amounts are numbers entered manually). All UI text and the icon are original; no third-party or protected material.

Privacy policy: https://road-to-lexus.vercel.app/privacy
Support: https://road-to-lexus.vercel.app/support
```

---

## Guideline 2.1 への返信（Resolution Center に貼る・英語）

> **1. Screen recording**
> Attached / linked below. It launches the app, then: enter name → select amount → tap Record → totals and rank update in real time → open a comment thread → add a comment → tap Report on an entry → tap Undo to delete it. (No account, login, deletion flow, or paid content exists in the app.)
>
> **2. Purpose & target audience**
> R2L is a lightweight shared savings tracker for a small private group of friends pooling money toward one goal (in our case, buying a car). Problem: friends saving toward a shared goal have no simple way to see everyone's contributions in one live place; spreadsheets aren't real-time and need accounts. Value: one shared screen — anyone enters "who / how much / why" and every member's screen updates instantly (total, progress bar, and a playful rank that levels up). Members can comment on each entry. Target audience: groups of 3–6 friends saving toward a common purchase or trip. Ages 17+.
>
> **3. Setup / access instructions**
> No account, login, or sample file is required. The app opens directly to the shared dashboard. To exercise the main feature: (1) Launch the app. (2) In "クイック LP 操作": type any name, tap an amount such as +1, optionally type a reason, tap "記録". (3) The total, progress bar and rank update immediately. (4) Tap "💬 コメント" on an entry to comment. (5) Tap "取り消し" to delete, "非表示" to hide, "報告" to report. All data is shared in real time across every device that opens the app.
>
> **4. External services**
> - Supabase (supabase.com): hosted PostgreSQL database + Realtime; stores entries/comments and syncs changes to all connected clients.
> - Vercel (vercel.com): static hosting for the front-end assets that are bundled inside the app.
> No authentication provider, payment processor, advertising SDK, analytics, tracking, or AI service is used.
>
> **5. Regional differences**
> None. The app functions identically in all regions. It is Japanese-language only, contains no region-locked content, and makes no location-based decisions.
>
> **6. Regulated industry / protected material**
> Not applicable. The app is a personal savings tracker; it is not a bank or financial institution and performs no money movement — amounts are just numbers entered manually. It contains no third-party or protected material; all UI text and the app icon are original.
>
> **User-generated content handling (per Guideline 1.2)**
> The app filters objectionable words at submission time, provides a "Report" action on every entry and comment that feeds a moderation queue we review, provides "Hide" and "Delete" on every entry, publishes contact information, and has a Terms of Use with zero tolerance for objectionable content and abusive users (https://road-to-lexus.vercel.app/terms). We remove violating content and restrict abusive users within a reasonable time.

同じ内容を **App Review Information → Notes** にも貼ること。

---

## Guideline 1.2（2回目の却下）への返信

App Store Connect でやること：
1. **年齢制限を 17+ に変更**（アプリ情報 → 年齢制限指定 → 編集 → UGC の質問に「はい」／未成年に不適切な項目を選び 17+ にする）
2. 新ビルド（フッターに連絡先＋24時間対応の明記あり）を選択
3. 下記を Resolution Center に返信 ＋ Notes に反映

> We have addressed all three points in Guideline 1.2:
>
> **1. Age rating now reflects 17+.** We updated the age rating questionnaire so the app is rated 17+.
>
> **2. Acting on reports within 24 hours — removing content and ejecting the user.** Our Terms of Use (https://road-to-lexus.vercel.app/terms , section 3) now states explicitly that we review every report and, within 24 hours, delete content that violates the rules and block the offending user's access (disabling writes and rotating/revoking the shared URL). The app already lets any participant remove any post ("取り消し"/Undo) and hide any post ("非表示"/Hide); reports are collected in a moderation queue we monitor.
>
> **3. Contact information inside the app + ability to report.** The main screen footer now shows, directly in the app UI (not behind a link): the rules, the 24-hour removal + user-block policy, and a contact email (roadtolex@gmail.com) with a "Report inappropriate content" mailto link. In addition, every entry and every comment has a "報告" (Report) button. Objectionable words are also blocked at submission time.
>
> No account or login exists; the app opens directly to the shared dashboard. Test: type a name, tap an amount, tap 記録; tap 報告 / 非表示 / 取り消し on any entry; the contact email and reporting instructions are visible in the footer.

---

## Guideline 1.2（3回目の却下 — フルチェックリスト）への返信

**⚠️ この却下は「Version reviewed: 1.0 (29815669)」＝前回直したビルドではなく、それより前のビルドが再審査されていた。
提出前に必ずバージョンページの「ビルド」が最新（このリリースのもの）になっているか確認すること。**

対応した6項目：

> 1. **Age rating**: Set to the highest tier our questionnaire produces (Unrestricted Web Access = Yes, User-Generated Content = Yes). No violence/sexual/gambling content exists that would qualify for a higher tier — happy to adjust further if you tell us which answer to change.
>
> 2. **Require users to agree to terms (EULA) with an explicit zero-tolerance statement**: The app now shows a mandatory consent screen on first launch (before any other screen is usable). It states that objectionable content and abusive users are not tolerated at all, that violating content is removed within 24 hours, and that violating users are blocked. The user must tap "同意して利用を開始する" (Agree & Start) to proceed; there is no way to dismiss it otherwise. Full Terms: https://road-to-lexus.vercel.app/terms
>
> 3. **A method for filtering objectionable content**: Text is checked against a blocklist at submission time and rejected before it is posted.
>
> 4. **A mechanism for users to flag objectionable content**: Every entry and every comment has a "報告" (Report) button that submits to our moderation queue.
>
> 5. **A mechanism for users to block abusive users**: Every entry now has a "投稿者をブロック" (Block this poster) action. Once blocked, that person's entries and comments are hidden from the reporting user's view on that device going forward.
>
> 6. **A mechanism for users to immediately remove posts from the feed**: "取り消し" (Undo/Delete) removes any entry in real time for every connected user.
>
> **Acting within 24 hours + contact info in-app**: unchanged from our previous reply — stated in the Terms (zero tolerance, 24-hour removal + block) and the app's main-screen footer, which shows the contact email (roadtolex@gmail.com) directly in the UI alongside the same 24-hour policy.
>
> This submission is build [ここに新ビルド番号を書く]. Screen recording attached, showing: the mandatory consent screen on first launch → dashboard → record an entry → 報告 → 投稿者をブロック → 非表示 → 取り消し → footer with contact info.
