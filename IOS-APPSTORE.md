# R2L を App Store で配信する手順

Web（Next.js）を **Capacitor** で iOS アプリの殻に包み、App Store Connect から審査提出する。
このリポジトリには **殻の設定まで** 入れてある。以降の作業は **Mac（または クラウドmacOS）** と
**Apple Developer Program（年 $99）** が必須。

---

## 0. 事前に用意するもの

- [ ] Apple ID（2ファクタ認証オン）
- [ ] **Apple Developer Program** 登録・支払い完了 … https://developer.apple.com/programs/
- [ ] Mac + Xcode（App Store から無料）
      … Mac が無い場合は「§B. Mac なしで出す」を参照
- [ ] アプリの一意なID（Bundle ID）。逆ドメイン形式。例 `com.koooooojima.r2l`
      → [`capacitor.config.ts`](capacitor.config.ts) の `appId` を書き換える
- [ ] 提出アセット（§4）

---

## 1. リポジトリ側（Mac で1回だけ）

```bash
git clone https://github.com/koooooojima1128/R2V.git
cd R2V
npm install
npm run build:mobile        # BUILD_TARGET=static で out/ に静的書き出し
npx cap add ios             # ios/ に Xcode プロジェクトを生成
npm run sync:ios            # out/ を iOS にコピー
npm run open:ios            # Xcode が開く
```

> `out/` が生成されない場合は Node 18+ を使う。`npx cap add ios` は Mac 専用。

---

## 2. Xcode 側の設定

`ios/App/App.xcworkspace` が開いた状態で：

1. 左ペインで **App** ターゲット → **Signing & Capabilities**
   - **Team**：自分の Apple Developer チームを選ぶ
   - **Bundle Identifier**：`capacitor.config.ts` と同じ（例 `com.koooooojima.r2l`）
   - 「Automatically manage signing」オン
2. **General**
   - Display Name：`R2L`
   - Version：`1.0.0` / Build：`1`
   - Deployment Target：iOS 14 以上
3. **アイコン**：`ios/App/App/Assets.xcassets/AppIcon.appiconset` に **1024×1024 PNG（透過なし）** を入れる
   - 簡易版は `npx @capacitor/assets generate --iconBackgroundColor '#16181C'` でも可（要 1024 の元画像）
4. 実機 or シミュレータで起動確認（`⌘R`）
   - ネット接続時にダッシュボードが出て、LP 記録が保存されれば OK

---

## 3. App Store Connect（ブラウザ）

https://appstoreconnect.apple.com → **My Apps → ＋ → New App**

- Platform：iOS
- Name：`R2L`（重複不可。取られていたら `R2L - Road to Lexus` 等）
- Primary Language：Japanese
- Bundle ID：Xcode と同じものを選択（先に developer.apple.com で登録が必要な場合あり）
- SKU：任意の文字列（例 `r2l-001`）

作成後、以下を埋める：

| 項目 | 内容 |
|---|---|
| スクリーンショット | iPhone 6.7"（1290×2796）と 6.5" は最低必要。実機/シミュレータで撮る |
| 説明文 | アプリの説明（§4 のドラフト参照） |
| キーワード | `貯金,ポイント,共有,友達` など |
| サポートURL | 連絡先が分かるページ（GitHub リポジトリURLでも可） |
| プライバシーポリシーURL | **必須**（§5） |
| カテゴリ | Finance または Lifestyle |
| 年齢レーティング | 質問に回答（本アプリは 4+ 想定） |
| App Privacy | 「収集するデータ」を申告：**User Content（名前・投稿）**、トラッキングなし |
| 価格 | 無料 |

---

## 4. 提出アセット チェックリスト

- [ ] アプリアイコン 1024×1024 PNG（角丸なし・透過なし）
- [ ] スクリーンショット（6.7" 必須、あれば 6.5" / 5.5" / iPad）
- [ ] 説明文（例）：
  > 友達みんなで目標金額を貯めるためのポイント共有アプリ。
  > 「誰が・いくら・理由」を記録するとリアルタイムで全員の画面に反映。
  > 貯まるほど称号がアップグレードします。
- [ ] プライバシーポリシー URL（§5）
- [ ] サポート URL

---

## 5. プライバシーポリシー（必須）

名前・投稿内容・コメントを Supabase に保存しているため、ポリシーページが要る。
`/privacy` ページをこのアプリ内に作れる（別途依頼）。最低限の記載事項：

- 収集する情報：ユーザーが入力した表示名、LP記録、コメント
- 利用目的：アプリ機能の提供（共有ダッシュボード表示）
- 第三者提供：なし（保存先は Supabase）
- 保持期間 / 削除依頼の連絡先
- トラッキング・広告：なし

---

## 6. 審査（Guideline 4.2）対策

Apple は「Webサイトを包んだだけ」のアプリを **却下** する。対策の方向性：

1. **Webをバンドルする**（このリポジトリは既に静的書き出し方式 = オフラインでも画面は出る）
2. ネイティブ機能を1つ以上足す：
   - プッシュ通知（`@capacitor/push-notifications` + APNs）… 効果大だが設定重め
   - ウィジェット / ショートカット
   - オフラインキャッシュ（記録を後で同期）
3. 審査メモに「友人グループ向けの共同貯金管理ツールであり、単なるサイトのミラーではない」旨を明記

**通知を入れるのが一番通りやすい。** 必要なら別途スキャフォールドする。

---

## 7. ビルド提出

Xcode：**Product → Archive** → Organizer で **Distribute App → App Store Connect → Upload**
→ App Store Connect でそのビルドを選択 → **Add for Review** → 提出

審査は通常 24〜48時間。却下されたら Resolution Center の指摘に対応して再提出。

---

## §B. Mac なしで出す（Codemagic）

Mac を持っていない場合、クラウド macOS の CI を使う。

1. https://codemagic.io に GitHub でログイン → `R2V` リポジトリを追加
2. Codemagic の **Teams → Integrations → Apple Developer Portal** に
   App Store Connect API キー（App Store Connect → Users and Access → Integrations で発行）を登録
3. リポジトリに `codemagic.yaml` を置く（別途作成可）。内容の骨子：
   - `npm ci && npm run build:mobile`
   - `npx cap add ios && npx cap sync ios`
   - CocoaPods インストール → `xcode-project build-ipa`
   - `app-store-connect publish`（TestFlight / 審査へ自動アップロード）
4. Codemagic 上でビルド実行 → App Store Connect にビルドが届く → §3〜§7 の提出作業はブラウザで実施

> それでも Apple Developer Program（$99）と、アイコン・スクショ・ポリシー等の提出物は必要。

---

## まとめ：あなたがやること / 依頼できること

| あなた（アカウント・支払い・Mac作業） | 依頼できる（コード・文章） |
|---|---|
| Apple Developer 登録・$99 支払い | `capacitor.config.ts` の appId 決定サポート |
| Mac で `npx cap add ios` 〜 Xcode 署名 | `/privacy` ページ作成 |
| App Store Connect でアプリ作成・提出物入力 | `codemagic.yaml` 作成 |
| スクリーンショット撮影 | 説明文・キーワード文案 |
| （推奨）通知機能の APNs 設定 | 通知機能のコード実装 |
