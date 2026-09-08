/** @type {import('next').NextConfig} */

// BUILD_TARGET=static のときだけ静的書き出し（Capacitor / iOS アプリ用）。
// 通常の Vercel デプロイでは通常ビルドのまま。
const isStatic = process.env.BUILD_TARGET === "static";

const nextConfig = {
  reactStrictMode: true,
  ...(isStatic
    ? {
        output: "export",
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
