/**
 * 投稿テキストの簡易モデレーション（App Store ガイドライン 1.2 対応）。
 * 明らかに不適切な語を含む投稿を送信前にブロックする。
 * 完全ではないため、各投稿の「報告」機能・「非表示」機能と併用する。
 */

// 差別・侮辱・性的・暴力を示す代表的な語（日本語・英語）。
const BANNED = [
  // English profanity / slurs (representative)
  "fuck", "shit", "bitch", "cunt", "asshole", "dick", "pussy",
  "nigger", "nigga", "faggot", "retard", "whore", "slut",
  "rape", "rapist", "kys",
  // 日本語（侮辱・差別）
  "死ね", "しね", "殺す", "ころすぞ", "きちがい", "気違い", "池沼",
  "土人", "きもい", "キモい", "ブス", "デブ",
  // 日本語（性的）
  "セックス", "レイプ", "ちんこ", "まんこ",
];

/** 大文字小文字・全半角を揃え、空白や区切り記号を落として比較しやすくする。 */
function normalize(s: string): string {
  return (s ?? "")
    .toLowerCase()
    .normalize("NFKC")
    .replace(/[\s._\-*=|/\\~^!?,;:'"`()[\]{}<>@#$%&+・…、。]+/g, "");
}

const NORMALIZED_BANNED = BANNED.map(normalize).filter(Boolean);

/** 不適切な語を含むなら理由文字列、問題なければ null を返す。 */
export function checkText(text: string): string | null {
  const n = normalize(text);
  if (!n) return null;
  for (const w of NORMALIZED_BANNED) {
    if (n.includes(w)) {
      return "不適切な表現が含まれている可能性があります。内容を見直してください。";
    }
  }
  return null;
}

/** 複数フィールドをまとめてチェック。 */
export function checkFields(...parts: (string | undefined)[]): string | null {
  return checkText(parts.filter(Boolean).join(" "));
}
