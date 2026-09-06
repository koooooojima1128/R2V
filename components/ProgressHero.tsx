"use client";

import { motion } from "framer-motion";
import CountUp from "@/components/CountUp";
import { formatMan, moteHearts, moteLevel, progressPct } from "@/lib/format";

type Props = {
  total: number;
  goal: number;
};

/** メインダッシュボード：合計 LP・目標までの進捗バー・爆モテ度を大きく表示。 */
export default function ProgressHero({ total, goal }: Props) {
  const pct = progressPct(total, goal);
  const remaining = Math.max(0, goal - total);
  const reached = total >= goal;
  const mote = moteLevel(pct);

  return (
    <section className="rounded-3xl border border-border bg-surface/80 p-6 shadow-card backdrop-blur sm:p-8">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
          Road to Lexus
        </span>
        <span className="rounded-full border border-border px-2.5 py-1 text-xs text-muted">
          1 LP = 1万円
        </span>
      </div>

      <div className="mt-6 flex flex-wrap items-end gap-x-3 gap-y-1">
        <CountUp
          value={total}
          className="font-mono text-5xl font-bold leading-none tracking-tight text-text tabnum sm:text-6xl"
        />
        <span className="pb-1 font-mono text-xl text-muted">/ {goal} LP</span>
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

      {/* progress bar */}
      <div className="mt-6">
        <div className="relative h-4 w-full overflow-hidden rounded-full border border-border bg-surface-2">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-pos via-accent to-accent"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* runner */}
          <motion.div
            className="absolute top-1/2 text-base"
            style={{ marginTop: -12, marginLeft: -10 }}
            initial={{ left: "0%" }}
            animate={{ left: `${pct}%` }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden
          >
            🚗
          </motion.div>
        </div>
        <div className="mt-2 flex justify-between font-mono text-xs text-muted tabnum">
          <span>{pct.toFixed(1)}%</span>
          <span>{goal} LP</span>
        </div>
      </div>

      {/* 爆モテ度メーター */}
      <div className="mt-6 rounded-2xl border border-border bg-surface-2/60 p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
              爆モテ度
            </span>
            <p className="mt-0.5 truncate text-sm font-semibold text-text">{mote.label}</p>
          </div>
          <span className="shrink-0 text-base leading-none tracking-tight" aria-hidden>
            {moteHearts(pct)}
          </span>
        </div>
        <p className="mt-1 text-xs text-muted">{mote.note}</p>
      </div>
    </section>
  );
}
