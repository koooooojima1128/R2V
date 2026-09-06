/**
 * 表示用の整形ヘルパー。LP・円換算・相対時間・進捗率・称号。
 */
import { siteConfig } from "@/lib/site";

/** LP を符号付きで整形（+2.5 / −1）。 */
export function formatLp(n: number): string {
  const v = Number(n);
  const sign = v > 0 ? "+" : v < 0 ? "−" : "";
  const abs = Math.abs(v);
  const body = Number.isInteger(abs) ? String(abs) : abs.toFixed(1);
  return `${sign}${body}`;
}

/** LP を円換算（1 LP = siteConfig.yenPerLp 円）。「12.5万円」形式。 */
export function formatMan(lp: number): string {
  const man = (Number(lp) * siteConfig.yenPerLp) / 10_000;
  const body = Number.isInteger(man) ? String(man) : man.toFixed(1);
  return `${body}万円`;
}

/** 相対時間（日本語・ざっくり）。 */
export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const sec = Math.max(0, Math.floor(diff / 1000));
  if (sec < 60) return "たった今";
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}分前`;
  const hour = Math.floor(min / 60);
  if (hour < 24) return `${hour}時間前`;
  const day = Math.floor(hour / 24);
  if (day < 7) return `${day}日前`;
  return new Date(iso).toLocaleDateString("ja-JP", { month: "numeric", day: "numeric" });
}

/** 進捗率（0–100、上限クリップ）。 */
export function progressPct(total: number, goal: number): number {
  if (goal <= 0) return 0;
  return Math.min(100, Math.max(0, (total / goal) * 100));
}

/** 累計 LP に対応する現在の称号。 */
export function currentRank(total: number) {
  let rank = siteConfig.ranks[0];
  for (const r of siteConfig.ranks) {
    if (total >= r.min) rank = r;
  }
  return rank;
}

/** 次の称号（最上位に到達済みなら null）。 */
export function nextRank(total: number) {
  return siteConfig.ranks.find((r) => r.min > total) ?? null;
}

/** LP 記録時に出すおふざけトーストの文言。 */
export function recordToast(amount: number): string {
  const lp = formatLp(amount);
  if (amount >= 0) return `${lp} LP　称号ゲージが上がった`;
  return `${lp} LP　レクサスが遠のいた…`;
}
