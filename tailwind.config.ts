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
        // 白基調・都会的（クールペーパー + グラファイト + エグゼクティブブルー）
        bg: "#F4F5F7",
        surface: "#FFFFFF",
        "surface-2": "#EEF0F3",
        border: "#E2E5EA",
        text: "#16181C",
        muted: "#6E747E",
        pos: "#0F9D6B",
        neg: "#DC2B3A",
        accent: "#1F3A5F",
      },
      fontFamily: {
        sans: ["var(--font-noto)", "system-ui", "sans-serif"],
        display: ["var(--font-archivo)", "var(--font-noto)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,40,0.04), 0 6px 20px -8px rgba(16,24,40,0.10)",
        lift: "0 1px 2px rgba(16,24,40,0.05), 0 14px 40px -14px rgba(16,24,40,0.16)",
      },
    },
  },
  plugins: [],
};

export default config;
