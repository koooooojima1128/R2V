"use client";

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
// 旧方式の anon key（eyJ...）と新方式の publishable key（sb_publishable_...）の
// どちらの変数名で渡されても拾えるようにする。
const anon =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

/** 環境変数が揃っているか。未設定ならアプリはローカルのデモデータで動作する。 */
export const isSupabaseConfigured = Boolean(url && anon);

/**
 * ブラウザ用の Supabase クライアント（シングルトン）。
 * 未設定でも import 時に落ちないよう、空文字でフォールバックする。
 */
export const supabase = createClient(url ?? "http://localhost", anon ?? "public-anon-key", {
  auth: { persistSession: false },
  realtime: { params: { eventsPerSecond: 10 } },
});
