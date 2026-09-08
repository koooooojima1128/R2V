/**
 * R2L 全体の設定。文言・目標値・「称号」段階はここに集約する。
 * - goalLp: 目標 LP（= レクサス 500万円）。1 LP = yenPerLp 円。
 * - quickAmounts: クイック操作ボタンの候補（LP）。
 * - ranks: 累計 LP に応じた称号。min は LP のしきい値（%ではない）。
 */
export const siteConfig = {
  name: "R2L",
  fullName: "Road to Lexus",
  tagline: "レクサス買って爆モテ計画",
  description:
    "友達みんなで500万円のレクサスを買って人生を変える（＝爆モテする）ためのLP管理アプリ。1 LP = 1万円、目標 500 LP。誰がアクセスしても同じダッシュボードをリアルタイム共有。",

  /** 目標 LP。 */
  goalLp: 500,
  /** 1 LP あたりの円。 */
  yenPerLp: 10_000,
  /** クイック操作ボタンの候補（円ではなく LP）。 */
  quickAmounts: [-3, -1, -0.5, 0.5, 1, 3] as number[],

  /**
   * 称号システム。累計 LP が min 以上で最後に一致した称号を表示する。
   * アルトからレクサスへ、モテ男への階段を上るおふざけモチベーション装置。
   */
  ranks: [
    {
      min: 0,
      name: "Alto Solitary",
      ja: "アルト・ソリタリー / 孤高の軽自動車",
      note: "助手席はまだ空席。愛車アルトと共に一人静かに夜道を走る孤独な男。",
    },
    {
      min: 100,
      name: "HIMARAYA Riser",
      ja: "HIMARAYA・ライザー / 期待のバイト男子",
      note: "ヒマラヤで爽やかさを振りまき、徐々にモテの基礎体力をつけ始めた段階。",
    },
    {
      min: 200,
      name: "F SPORT Seducer",
      ja: "Fスポーツ・セデューサー / 魅惑の候補生",
      note: "男としての魅力が急上昇。レクサスのスポーティな色気を醸し出し、女子の視線を集め始める。",
    },
    {
      min: 300,
      name: "Lexus Charisma",
      ja: "レクサス・カリスマ / 助手席争奪圏",
      note: "300LP突破。「今度レクサスでドライブいかない？」が冗談ではなくなるモテ男予備軍。",
    },
    {
      min: 400,
      name: "Playboy Elite",
      ja: "プレイボーイ・エリート / 夜のドライブマスター",
      note: "圧倒的な資金力と大人の余裕。女子が自ら助手席に乗りたがるラグジュアリーな領域。",
    },
    {
      min: 500,
      name: "Ultimate Lexus Lover",
      ja: "アルティメット・レクサス・ラバー / 伝説のモテ男",
      note: "500 LP完全達成。アルトから最高峰のレクサスオーナーへ即位し、遊び場（夜の街）を制覇した伝説。",
    },
  ] as { min: number; name: string; ja: string; note: string }[],
};

export type SiteConfig = typeof siteConfig;
export type Rank = SiteConfig["ranks"][number];
