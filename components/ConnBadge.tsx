"use client";

type Props = { conn: "connecting" | "live" | "demo" | "error" };

const MAP = {
  connecting: { dot: "bg-muted", label: "接続中…" },
  live: { dot: "bg-pos animate-pulse-ring", label: "リアルタイム同期中" },
  demo: { dot: "bg-accent", label: "デモモード（共有オフ）" },
  error: { dot: "bg-neg", label: "接続エラー" },
} as const;

/** 右上のリアルタイム接続ステータス。 */
export default function ConnBadge({ conn }: Props) {
  const s = MAP[conn];
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-1 text-xs text-muted backdrop-blur">
      <span className={`h-2 w-2 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}
