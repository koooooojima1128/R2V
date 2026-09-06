# R2L — Road to Lexus 🚗

友達みんなで **500万円のレクサス** を買って人生を変える（＝**爆モテ**する）ための
LP（レクサスポイント）管理アプリ。
**1 LP = 1万円 / 目標 500 LP。** 誰がアクセスしても同じダッシュボードを**リアルタイム**で共有します。

- ダークモード基調（`#0B0F19`）のミニマル UI
- 承認フローなし：誰でも直接 LP を加算・減算（信頼＆おふざけベース）
- 各履歴カードにコメント（野次・応援）欄
- **爆モテ度メーター**：レクサスに近づくほどモテ度が上がる（`lib/site.ts` の `moteLevels`）

## 技術スタック

- Next.js 14（App Router）/ React 18 / TypeScript
- Tailwind CSS 3 / Framer Motion
- Supabase（Postgres ＋ Realtime）
- デプロイ：Vercel

---

## 開発手順

### STEP 0. セットアップ

```bash
cd r2v
npm install
cp .env.local.example .env.local   # まだ Supabase が無くても起動可（デモモード）
npm run dev
```

`http://localhost:3000` を開く。`.env.local` 未設定なら、ローカルのデモデータ（初期 0 LP）で
UI を確認できます（共有・リアルタイムは無効）。

### STEP 1. Supabase プロジェクト作成 ＋ DB 設計

1. [supabase.com](https://supabase.com) でプロジェクトを新規作成
2. **SQL Editor** に [`supabase/schema.sql`](supabase/schema.sql) を貼り付けて実行
   - テーブル `lp_logs` / `comments`（＋任意の `members`）
   - 合計 LP ビュー `lp_summary`（`goal_lp = 500`）
   - RLS ポリシー（anon で読み書き可＝承認なし）
   - `supabase_realtime` publication へ `lp_logs` / `comments` を追加
3. **Project Settings → API** から `URL` と `anon public` キーをコピーし `.env.local` に設定

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```

4. `npm run dev` を再起動 → 右上バッジが「リアルタイム同期中」になれば接続 OK

### STEP 2. ダッシュボード UI（実装済み）

| 要件 | 実装 |
| --- | --- |
| 合計 LP ＋ 進捗バー ＋ 爆モテ度 | [`components/ProgressHero.tsx`](components/ProgressHero.tsx)（Framer Motion でバー・数値をアニメーション） |
| クイック LP 操作（誰が / 何 LP / 理由） | [`components/QuickLpForm.tsx`](components/QuickLpForm.tsx)（記録時におふざけトースト） |
| タイムライン（カード形式・新しい順） | [`components/Timeline.tsx`](components/Timeline.tsx) / [`components/LogCard.tsx`](components/LogCard.tsx) |
| 履歴ごとのコメント欄 | [`components/CommentThread.tsx`](components/CommentThread.tsx) |

### STEP 3. Realtime（実装済み）

[`hooks/useR2L.ts`](hooks/useR2L.ts) が単一チャネル `r2l-realtime` で
`lp_logs` / `comments` の `INSERT` / `DELETE` を購読し、全ユーザーの画面へ即時反映します。
書き込み（`addLp` / `addComment`）は `insert` するだけ。自分の画面も Realtime イベントで更新されます。

### STEP 4. Vercel デプロイ

1. `r2v/` を Git リポジトリにして GitHub に push
2. [vercel.com/new](https://vercel.com/new) で Import（Framework は Next.js に自動判定）
3. **Root Directory** は `./`（`r2v/` 単体リポジトリの場合）
4. 環境変数 `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` を登録
5. Deploy

---

## データ構造

### `lp_logs` — LP 増減履歴（タイムラインの1カード＝1行）

| カラム | 型 | 説明 |
| --- | --- | --- |
| `id` | uuid (PK) | |
| `author` | text | 誰が |
| `amount` | numeric(7,2) | 何 LP（`+0.5` / `-1.0`。`0` は不可） |
| `reason` | text | 理由 |
| `created_at` | timestamptz | 記録日時 |

### `comments` — 履歴へのコメント

| カラム | 型 | 説明 |
| --- | --- | --- |
| `id` | uuid (PK) | |
| `log_id` | uuid (FK → `lp_logs.id`, on delete cascade) | 対象の履歴 |
| `author` | text | 誰が |
| `body` | text | 本文（1–500 字） |
| `created_at` | timestamptz | |

### `members`（任意） — 入力補助用のメンバー一覧

`id` / `name`（unique）/ `emoji` / `created_at`。UI 側は `lib/site.ts` の
`members`（きじま / ゆすけう / かれ）でも代替可能。

### 合計 LP

`SELECT sum(amount) FROM lp_logs`。ビュー `lp_summary`（`total_lp` / `goal_lp` / `log_count`）でも取得可。
クライアントは読み込んだ `logs` から合計を計算します。

---

## ディレクトリ構成

```
r2v/
  app/
    layout.tsx        … フォント（Noto Sans JP + JetBrains Mono）・メタ・ダークテーマ
    page.tsx          … <Dashboard /> を描画するだけ
    globals.css
  components/
    Dashboard.tsx     … 全員共通の1画面（状態を束ねる・トースト）
    ProgressHero.tsx  … 合計LP＋進捗バー＋爆モテ度メーター
    QuickLpForm.tsx   … LP 加算・減算フォーム
    Timeline.tsx / LogCard.tsx / CommentThread.tsx
    CountUp.tsx / ConnBadge.tsx
  hooks/
    useR2L.ts         … 初回ロード＋Realtime購読＋書き込み
    useMyName.ts      … 自分の名前を localStorage に記憶
  lib/
    site.ts           … 文言・目標値・メンバー・爆モテ度をここに集約
    format.ts         … LP整形・円換算・相対時間・進捗率・moteLevel
    supabase/client.ts … ブラウザ用クライアント（未設定でも落ちない）
    supabase/types.ts
  data/
    seed.ts           … デモ用シード（初期 0 LP）
  supabase/
    schema.sql        … これを Supabase の SQL Editor で実行
```

## カスタマイズ（`lib/site.ts`）

| 設定 | 内容 |
| --- | --- |
| `goalLp` | 目標 LP（初期値 `500`） |
| `yenPerLp` | 1 LP あたりの円（初期値 `10000`） |
| `quickAmounts` | クイック操作ボタンの候補 |
| `members` | メンバー名（`schema.sql` の seed と揃える） |
| `moteLevels` | 達成率(%)に応じた「爆モテ度」の段階とコピー |

配色は [`tailwind.config.ts`](tailwind.config.ts) の `colors`。
