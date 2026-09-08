import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** iOS「ホーム画面に追加」時のアイコン（ビルド時に PNG 生成）。 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#16181C",
          color: "#ffffff",
          fontSize: 72,
          fontWeight: 800,
          letterSpacing: "-0.05em",
        }}
      >
        R2L
      </div>
    ),
    { ...size },
  );
}
