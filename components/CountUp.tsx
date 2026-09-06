"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";

type Props = {
  value: number;
  decimals?: number;
  className?: string;
};

/** 値が変わるたびに、前の値から新しい値へ滑らかにカウントアップ／ダウンする。 */
export default function CountUp({ value, decimals = 1, className }: Props) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);

  useEffect(() => {
    const controls = animate(prev.current, value, {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });
    prev.current = value;
    return () => controls.stop();
  }, [value]);

  return (
    <span className={className}>
      {display.toLocaleString("ja-JP", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
    </span>
  );
}
