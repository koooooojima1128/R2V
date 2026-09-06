"use client";

import { motion } from "framer-motion";
import { currentRank, nextRank } from "@/lib/format";

type Props = { total: number };

/** 称号カード：累計 LP に応じた「アルト→レクサス」のモテ男称号を表示。 */
export default function RankCard({ total }: Props) {
  const rank = currentRank(total);
  const next = nextRank(total);

  const tierPct = next
    ? Math.min(100, Math.max(0, ((total - rank.min) / (next.min - rank.min)) * 100))
    : 100;
  const toNext = next ? Math.max(0, next.min - total) : 0;

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
      <div className="border-b border-border px-6 py-5">
        <span className="font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-muted">
          現在の称号
        </span>
        <h2 className="mt-1.5 font-display text-2xl font-extrabold tracking-tight text-accent sm:text-[26px]">
          {rank.name}
        </h2>
        <p className="mt-1 text-xs font-medium text-muted">{rank.ja}</p>
        <p className="mt-3 text-sm leading-relaxed text-text/80">{rank.note}</p>
      </div>

      <div className="px-6 py-4">
        {next ? (
          <>
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-muted">
                次の称号 <span className="font-semibold text-text">{next.name}</span>
              </span>
              <span className="font-display font-semibold text-text tabnum">
                あと {toNext.toFixed(1)} LP
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
              <motion.div
                className="h-full rounded-full bg-accent"
                initial={{ width: 0 }}
                animate={{ width: `${tierPct}%` }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </>
        ) : (
          <p className="text-center text-xs font-semibold text-accent">
            最高称号に到達 — 伝説のモテ男
          </p>
        )}
      </div>
    </section>
  );
}
