import type { CapacitorConfig } from "@capacitor/cli";

/**
 * Capacitor 設定（iOS アプリの殻）。
 * - appId: App Store 用の一意な逆ドメインID。取得ドメインに合わせて必ず変更する。
 * - webDir: `npm run build:mobile` の出力先（Next の静的書き出し = out/）。
 * - server.url をコメント解除すると、ビルドを同梱せず本番URLを読むだけの
 *   「オンライン専用ラッパー」になる（審査で 4.2 却下されやすいので非推奨）。
 */
const config: CapacitorConfig = {
  appId: "com.example.r2l",
  appName: "R2L",
  webDir: "out",
  ios: {
    contentInset: "always",
  },
  // server: {
  //   url: "https://r2-v.vercel.app",
  //   cleartext: false,
  // },
};

export default config;
