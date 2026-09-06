"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "r2l:my-name";

/** 「自分の名前」をブラウザに記憶する（承認フローが無いので識別だけの軽いもの）。 */
export function useMyName() {
  const [name, setNameState] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) setNameState(saved);
    } catch {
      /* private mode などでは無視 */
    }
  }, []);

  const setName = useCallback((next: string) => {
    setNameState(next);
    try {
      if (next) localStorage.setItem(KEY, next);
      else localStorage.removeItem(KEY);
    } catch {
      /* 無視 */
    }
  }, []);

  return { name, setName };
}
