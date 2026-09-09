-- ============================================================
--  R2L (Road to Lexus) — Supabase schema
--  1 LP = 1万円 / 目標 500 LP（= レクサス 500万円）
--  Supabase の SQL Editor にこのファイルを貼り付けて実行してください。
--  何度実行しても安全（冪等）になるように書いています。
-- ============================================================

create extension if not exists "pgcrypto";

-- ── members : 入力補助用のメンバー一覧（任意） ──────────────────
create table if not exists public.members (
  id         uuid primary key default gen_random_uuid(),
  name       text not null unique,
  emoji      text,
  created_at timestamptz not null default now()
);

-- ── lp_logs : LP の加算・減算の履歴（タイムラインの1カード＝1行） ──
create table if not exists public.lp_logs (
  id         uuid primary key default gen_random_uuid(),
  author     text not null,                              -- 誰が
  amount     numeric(7,2) not null check (amount <> 0),  -- 何 LP（+0.5 / -1.0 など。0 は不可）
  reason     text not null default '',                   -- 理由
  created_at timestamptz not null default now()
);
create index if not exists lp_logs_created_at_idx on public.lp_logs (created_at desc);

-- ── comments : 各履歴カードへのコメント（野次・応援） ────────────
create table if not exists public.comments (
  id         uuid primary key default gen_random_uuid(),
  log_id     uuid not null references public.lp_logs(id) on delete cascade,
  author     text not null,
  body       text not null check (char_length(body) between 1 and 500),
  created_at timestamptz not null default now()
);
create index if not exists comments_log_id_idx on public.comments (log_id, created_at);

-- ── reports : 不適切な投稿の報告（UGCモデレーション用） ────────────
create table if not exists public.reports (
  id          uuid primary key default gen_random_uuid(),
  target_type text not null check (target_type in ('log', 'comment')),
  target_id   uuid not null,
  reporter    text,
  note        text,
  created_at  timestamptz not null default now()
);
create index if not exists reports_created_at_idx on public.reports (created_at desc);

-- ── lp_summary : 合計 LP を返すビュー（クライアントでも計算するが確認用） ──
create or replace view public.lp_summary as
select
  coalesce(sum(amount), 0)::numeric(10,2) as total_lp,
  500::numeric                            as goal_lp,
  count(*)                                as log_count
from public.lp_logs;

-- ============================================================
--  RLS : 友達同士の信頼ベース。承認フローなし＝anon で読み書き可。
--  （本番で公開範囲を絞りたくなったら、ここを差し替える）
-- ============================================================
alter table public.members  enable row level security;
alter table public.lp_logs  enable row level security;
alter table public.comments enable row level security;
alter table public.reports  enable row level security;

drop policy if exists "members read"    on public.members;
drop policy if exists "members insert"  on public.members;
drop policy if exists "lp_logs read"    on public.lp_logs;
drop policy if exists "lp_logs insert"  on public.lp_logs;
drop policy if exists "lp_logs delete"  on public.lp_logs;
drop policy if exists "comments read"   on public.comments;
drop policy if exists "comments insert" on public.comments;
drop policy if exists "comments delete" on public.comments;
drop policy if exists "reports insert"  on public.reports;

create policy "members read"    on public.members  for select using (true);
create policy "members insert"  on public.members  for insert with check (true);

create policy "lp_logs read"    on public.lp_logs  for select using (true);
create policy "lp_logs insert"  on public.lp_logs  for insert with check (true);
create policy "lp_logs delete"  on public.lp_logs  for delete using (true);  -- おふざけの取り消し用

create policy "comments read"   on public.comments for select using (true);
create policy "comments insert" on public.comments for insert with check (true);
create policy "comments delete" on public.comments for delete using (true);

-- reports は anon から insert のみ可（読み取り不可）。運営は Supabase 管理画面で確認する。
create policy "reports insert"  on public.reports  for insert with check (true);

-- ============================================================
--  Realtime : 変更を全ユーザーへ配信するため publication に追加
-- ============================================================
do $$
begin
  alter publication supabase_realtime add table public.lp_logs;
exception when duplicate_object then null;
end $$;

do $$
begin
  alter publication supabase_realtime add table public.comments;
exception when duplicate_object then null;
end $$;

-- ── seed : メンバー初期値（任意。名前は自由に変更） ────────────
insert into public.members (name, emoji) values
  ('きじま', null),
  ('ゆすけう', null),
  ('かれ', null)
on conflict (name) do nothing;
