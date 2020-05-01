const cron = require('node-cron');
const flexMessageObj = require('./change.js');
const server = require('express')();
const line = require('@line/bot-sdk'); // Messaging APIのSDKをインポート

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

cron.schedule('0 25 20 * * *',() => {

  server.post('/bot/webhook', line.middleware(line_config), (req, res, next) => {
    // 先行してLINE側にステータスコード200でレスポンスする。
    res.sendStatus(200);

    bot.broadcast(flexMessageObj)
  });
},{
  scheduled: true,
  timezone: "Japan/Tokyo"
});
