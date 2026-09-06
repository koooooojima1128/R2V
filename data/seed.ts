/**
 * デモ用のシードデータ。
 * Supabase の環境変数が未設定のとき、この配列でローカル動作する
 * （リアルタイム共有は無効。UI 確認用）。
 * 本番では Supabase 側の lp_logs / comments が参照される。
 *
 * 初期状態は「合計 0 LP」。動作確認用のサンプルを入れたいときは
 * 下のコメントを参考に DEMO_LOGS へ追記する。
 */
import type { Comment, LpLog } from "@/lib/supabase/types";

export const DEMO_LOGS: LpLog[] = [
  // 例:
  // {
  //   id: "demo-1",
  //   author: "きじま",
  //   amount: 1,
  //   reason: "自炊した",
  //   created_at: new Date().toISOString(),
  // },
];

export const DEMO_COMMENTS: Comment[] = [];
