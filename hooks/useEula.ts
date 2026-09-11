"use client";

import { useCallback, useEffect, useState } from "react";

const EULA_KEY = "r2l:eula-accepted";

/**
 * 利用規約（ゼロ・トレランス方針）への同意状態。
 * 未同意のうちはダッシュボードを表示させず、同意ゲートを出す。
 */
export function useEula() {
  // null = 判定中（localStorage 読み込み前）。初回描画のちらつきを避けるため
  // 判定できるまでは何もレンダリングしない。
  const [accepted, setAccepted] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      setAccepted(localStorage.getItem(EULA_KEY) === "1");
    } catch {
      // localStorage が使えない環境ではブロックしない
      setAccepted(true);
    }
  }, []);

  const accept = useCallback(() => {
    setAccepted(true);
    try {
      localStorage.setItem(EULA_KEY, "1");
    } catch {
      /* 無視 */
    }
  }, []);

  return { accepted, accept };
}
