# chat-app<br />
# 概要<br/>
react hooksとtypescriptを使用したチャットアプリケーションです。<br />
ブラウザのタブを二つ用意し、メッセージを送信いただくとリアルタイムで受信されるのを確認することができます。<br />
データが永続化されるため、いつでも確認可能です。<br />
<br />
<img src="./スクリーンショット 2020-07-14 3.15.41.png" width="600px"><br />
# 機能一覧：<br />
・googleログイン機能（firebase）
・画像送信機能　（firebase storage）
・友だちID検索
・友だち追加
・リアルタイムアップデート（firebase onSnapshot()メソッド）
・メッセージの永続化（firebase firestore）
・チャット機能

# こだわった点<br />
・一つのサービスとして成立するように最低限の機能を持たせました。<br />

# 技術的に苦労した点<br />
・firebaseに保存するデータの設計が一番苦労しました。<br />
・オンクリックで作成されたイベントがブラウザ上に保持され、<br />
クリックした回数に応じて発火する不具合に悩まされました<br />
（保持されたイベントの開放が出来なかったが他の方法で解決しました）<br />

# ソフトウェア構成<br />
   "@types/node": "^12.12.47",<br />
    "@types/react": "^16.9.41",<br />
    "@types/react-dom": "^16.9.8",<br />
    "dotenv": "^8.2.0",<br />
    "firebase": "^7.15.5",<br />
    "firebase-tools": "^8.4.3",<br />
    "react": "^16.13.1",<br />
    "react-dom": "^16.13.1",<br />
    "react-scripts": "3.4.1"<br />
    "@material-ui/core": "^4.11.0",<br />
    "@material-ui/icons": "^4.9.1",<br />
    "typescript": "^3.9.6"<br />
