import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0B0F19",
        surface: "#121826",
        "surface-2": "#161D2E",
        border: "#232B3D",
        text: "#E7EAF3",
        muted: "#8A93A7",
        pos: "#34D399",
        neg: "#FB7185",
        accent: "#38BDF8",
      },
      fontFamily: {
        sans: ["var(--font-noto)", "system-ui", "sans-serif"],
        mono: ["var(--font-jbmono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 8px 30px -12px rgba(0,0,0,0.6)",
        glow: "0 0 0 1px rgba(56,189,248,0.25), 0 0 40px -8px rgba(56,189,248,0.35)",
      },
      keyframes: {
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(52,211,153,0.35)" },
          "70%": { boxShadow: "0 0 0 12px rgba(52,211,153,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(52,211,153,0)" },
        },
      },
      animation: {
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.4,0,0.6,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
