//モジュールのインポート
const fs = require('fs');
const server = require("express")();
const line = require("@line/bot-sdk"); // Messaging APIのSDKをインポート

// -----------------------------------------------------------------------------
// パラメータ設定
const line_config = {
  channelAccessToken: process.env.LINE_ACCESS_TOKEN, // 環境変数からアクセストークンをセット
  channelSecret: process.env.LINE_CHANNEL_SECRET // 環境変数からChannel Secretをセット
};

// -----------------------------------------------------------------------------
// Webサーバー設定
server.listen(process.env.PORT || 3000);

// -----------------------------------------------------------------------------
// APIコールのためのクライアントインスタンスを作成
const bot = new line.Client(line_config);

// -----------------------------------------------------------------------------
// ルーター設定
server.post('/bot/webhook', line.middleware(line_config), (req, res, next) => {

  res.sendStatus(200);// 先行してLINE側にステータスコード200でレスポンスする

//想定済文字烈の読み込み
const jsonText = fs.readFileSync('./again-message.json', 'utf8', (error, data) => {
  if (error) {
    return;
  }
  console.log(data);
});

const messageObj = JSON.parse(jsonText);

  // イベント処理
req.body.events.forEach((event) => {

  //ユーザーからのテキストメッセージが想定していた文字列を含む場合のみ反応
  if (messageObj.word_list.some(value => event.message.text.match(value))){

    var events_processed = require('./report')

  };
});

// すべてのイベント処理が終了したら何個のイベントが処理されたか出力
Promise.all(events_processed).then(
  (response) => {
    console.log(`${response.length} event(s) processed.`);
  }
)
});
