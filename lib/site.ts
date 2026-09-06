/**
 * R2L 全体の設定。文言・目標値・メンバー・「モテ度」段階はここに集約する。
 * - goalLp: 目標 LP（= レクサス 500万円）。1 LP = yenPerLp 円。
 * - quickAmounts: クイック操作ボタンの候補（LP）。
 * - members: 入力補助用のメンバー。
 * - moteLevels: 進捗率(%)に応じた「爆モテ度」。min は達成率のしきい値。
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

  /** 入力補助用のメンバー。名前は自由に変更（schema.sql の seed と揃えると綺麗）。 */
  members: [
    { name: "きじま", emoji: "" },
    { name: "ゆすけう", emoji: "" },
    { name: "かれ", emoji: "" },
  ] as { name: string; emoji: string }[],

  /**
   * 爆モテ度メーター。達成率(%)が min 以上で最後に一致した段階を表示する。
   * レクサスに近づくほどモテる、というおふざけモチベーション装置。
   */
  moteLevels: [
    { min: 0, label: "モテ度 0", note: "まだ何も持っていない" },
    { min: 15, label: "かろうじてモテ", note: "「車は親の」と正直に答える段階" },
    { min: 35, label: "二度見されるモテ", note: "信号待ちで視線を感じる" },
    { min: 55, label: "合コンで話題のモテ", note: "初手で名前を覚えられる" },
    { min: 75, label: "助手席プレミアム", note: "予約が入りはじめる" },
    { min: 90, label: "モテ臨界点", note: "あと一歩で頂点" },
    { min: 100, label: "爆モテ確定 🔥", note: "レクサス納車。ここから人生が変わる" },
  ] as { min: number; label: string; note: string }[],
};

export type SiteConfig = typeof siteConfig;
