"use client";

import { motion } from "framer-motion";
import CountUp from "@/components/CountUp";
import { formatMan, progressPct } from "@/lib/format";

type Props = {
  total: number;
  goal: number;
};

/** メインダッシュボード：合計 LP と目標までの進捗バーを大きく表示。 */
export default function ProgressHero({ total, goal }: Props) {
  const pct = progressPct(total, goal);
  const remaining = Math.max(0, goal - total);
  const reached = total >= goal;

  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-card sm:p-8">
      <div className="flex items-center justify-between">
        <span className="font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-muted">
          Road to Lexus
        </span>
        <span className="rounded-full border border-border px-2.5 py-1 text-xs text-muted">
          1 LP = 1万円
        </span>
      </div>

      <div className="mt-5 flex flex-wrap items-end gap-x-3 gap-y-1">
        <CountUp
          value={total}
          className="font-display text-5xl font-extrabold leading-none tracking-tight text-text tabnum sm:text-6xl"
        />
        <span className="pb-1 font-display text-xl font-semibold text-muted">/ {goal} LP</span>
      </div>

      <p className="mt-2 text-sm text-muted">
        {reached ? (
          <span className="font-semibold text-pos">🎉 目標達成！レクサス、買えます。</span>
        ) : (
          <>
            あと <span className="font-semibold text-text">{formatMan(remaining)}</span>（
            {remaining.toFixed(1)} LP）でレクサス
          </>
        )}
      </p>

      <div className="mt-6">
        <div className="relative h-3 w-full overflow-hidden rounded-full bg-surface-2">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-text"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.div
            className="absolute top-1/2 text-sm"
            style={{ marginTop: -11, marginLeft: -9 }}
            initial={{ left: "0%" }}
            animate={{ left: `${pct}%` }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden
          >
            🚗
          </motion.div>
        </div>
        <div className="mt-2 flex justify-between font-display text-xs font-medium text-muted tabnum">
          <span>{pct.toFixed(1)}%</span>
          <span>{goal} LP</span>
        </div>
      </div>
    </section>
  );
}
