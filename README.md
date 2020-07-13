# chat-app<br />
# 概要<br/>
react hooksとtypescriptを使用したチャットアプリケーションです。<br />
ブラウザのタブを二つ用意し、メッセージを送信いただくとリアルタイムで受信されるのを確認することができます。<br />
データが永続化されるため、いつでも確認可能です。<br />
<br />
<img src="./スクリーンショット 2020-07-14 3.15.41.png" width="600px">
# 機能一覧：<br />
・googleログイン機能（firebase）
・画像送信機能　（firebase storage）
・友だちID検索
・友だち追加
・リアルタイムアップデート（firebase onSnapshot()メソッド）
・メッセージの永続化（firebase firestore）
・チャット機能

# こだわった点
・一つのサービスとして成立するように最低限の機能を持たせました。

# 技術的に苦労した点
・firebaseに保存するデータの設計が一番苦労しました。
・オンクリックで作成されたイベントがブラウザ上に保持され、
クリックした回数に応じて発火する不具合に悩まされました
（保持されたイベントの開放が出来なかったが他の方法で解決しました）

# ソフトウェア構成<br />
   
