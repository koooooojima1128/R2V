"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site";
import { formatLp } from "@/lib/format";
import type { NewLpLog } from "@/lib/supabase/types";

type Props = {
  myName: string;
  onNameChange: (name: string) => void;
  onSubmit: (input: NewLpLog) => Promise<void>;
  onRecorded?: (amount: number) => void;
};

/** クイック LP 操作：誰が / 何 LP / 理由 を入力して即時反映。 */
export default function QuickLpForm({ myName, onNameChange, onSubmit, onRecorded }: Props) {
  const [amount, setAmount] = useState<number>(0.5);
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const canSubmit = myName.trim() !== "" && amount !== 0 && !busy;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setBusy(true);
    setErr(null);
    try {
      await onSubmit({ author: myName.trim(), amount, reason: reason.trim() });
      onRecorded?.(amount);
      setReason("");
      setAmount(0.5);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "送信に失敗しました");
    } finally {
      setBusy(false);
    }
  }

  const inputCls =
    "w-full rounded-xl border border-border bg-bg px-3 py-2 text-sm text-text outline-none transition placeholder:text-muted/70 focus:border-accent focus:bg-surface";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-surface p-5 shadow-card sm:p-6"
    >
      <h2 className="font-display text-sm font-bold text-text">クイック LP 操作</h2>

      {/* 誰が */}
      <label className="mt-4 block text-xs font-medium text-muted">誰が</label>
      <input
        value={myName}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder="あなたの名前"
        className={`mt-2 ${inputCls}`}
      />

      {/* 何 LP */}
      <label className="mt-4 block text-xs font-medium text-muted">
        何 LP <span className="font-display font-semibold text-text">{formatLp(amount)}</span>
      </label>
      <div className="mt-2 flex flex-wrap gap-2">
        {siteConfig.quickAmounts.map((v) => (
          <button
            type="button"
            key={v}
            onClick={() => setAmount(v)}
            className={`rounded-lg border px-3 py-1.5 font-display text-sm font-medium transition ${
              amount === v
                ? v > 0
                  ? "border-pos bg-pos/10 text-pos"
                  : "border-neg bg-neg/10 text-neg"
                : "border-border text-muted hover:border-muted hover:text-text"
            }`}
          >
            {formatLp(v)}
          </button>
        ))}
        <input
          type="number"
          step="0.1"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-24 rounded-lg border border-border bg-bg px-3 py-1.5 text-right font-display text-sm text-text outline-none focus:border-accent focus:bg-surface"
        />
      </div>

      {/* 理由 */}
      <label className="mt-4 block text-xs font-medium text-muted">理由</label>
      <input
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="例：ブナ山バイト / ポケカ購入"
        className={`mt-2 ${inputCls}`}
      />

      {err && <p className="mt-3 text-xs text-neg">{err}</p>}

      <motion.button
        type="submit"
        disabled={!canSubmit}
        whileTap={{ scale: 0.98 }}
        className={`mt-4 w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
          canSubmit
            ? amount >= 0
              ? "bg-pos text-white hover:brightness-105"
              : "bg-neg text-white hover:brightness-105"
            : "cursor-not-allowed bg-surface-2 text-muted"
        }`}
      >
        {busy ? "反映中…" : `${formatLp(amount)} LP を記録`}
      </motion.button>
    </form>
  );
}
