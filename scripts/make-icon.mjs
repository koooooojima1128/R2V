// アプリアイコン (1024x1024 PNG) をコードから生成する。
// Codemagic のビルド時に実行され、resources/icon.png を作る。
// 手書きの画像を用意したい場合は、このスクリプトを使わず
// resources/icon.png を直接置けばよい（そちらが優先）。
import sharp from "sharp";
import { mkdir, access } from "node:fs/promises";

const OUT = "resources/icon.png";

try {
  await access(OUT);
  console.log(`${OUT} は既に存在するので生成をスキップ`);
  process.exit(0);
} catch {
  /* 無ければ生成する */
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024">
  <rect width="1024" height="1024" fill="#16181C"/>
  <text x="512" y="560" fill="#FFFFFF"
    font-family="Arial, Helvetica, sans-serif" font-size="430" font-weight="700"
    letter-spacing="-16" text-anchor="middle">R2L</text>
</svg>`;

await mkdir("resources", { recursive: true });
await sharp(Buffer.from(svg)).png().toFile(OUT);
console.log(`generated ${OUT} (1024x1024)`);
