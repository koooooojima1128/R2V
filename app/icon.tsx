import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 512, height: 512 };
export const contentType = "image/png";

/** ブラウザタブ／マニフェスト用アイコン（ビルド時に PNG 生成）。 */
export default function Icon() {
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
          fontSize: 210,
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
