//時刻の取得
var dt = new Date();

let hour,min,excess;

// -----------------------------------------------------------------------------
//モジュールのインポート
const fs = require('fs');//jsonの読み取り用
const cron = require('node-cron');//時間をトリガーにする
const server = require('express')();
const line = require('@line/bot-sdk'); // Messaging APIのSDKをインポート
const flexMessageObj = require('./change.js');

// -----------------------------------------------------------------------------
//データベース接続準備
const {Client} = require('pg');

const client = new Client({
  user:  process.env.DB_USERNAME,
  host:  process.env.DB_HOST,
  database:  process.env.DB_DATABASE,
  password:  process.env.DB_PASSWORD,
  port: 5432
})

// -----------------------------------------------------------------------------
//要望取得準備
let userId, requestText;

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


//------------------------------------------------------------------------------
  //想定済文字列の読み込み
  const jsonText_again = fs.readFileSync('./again-message.json', 'utf8', (error, data) => {
    if (error) {
      return;
    }
    console.log(data);
  });

  const messageObj_again = JSON.parse(jsonText_again);

  const jsonText_request = fs.readFileSync('./request_message.json', 'utf8', (error, data) => {
    if (error) {
      return;
    }
    console.log(data);
  });

  const messageObj_request = JSON.parse(jsonText_request);
  //読み込み終了


//---------------------------------------------------------------------------------
  let waiting = false;//要望メッセージ待機状態か否かをここに入れる

// -----------------------------------------------------------------------------
// ルーター設定
server.post('/bot/webhook', line.middleware(line_config), (req, res, next) => {

  res.sendStatus(200);// 先行してLINE側にステータスコード200でレスポンスする

  const waitTime = 3;//待ち時間設定

  // イベント処理
  req.body.events.forEach((event) => {

    //イベントがメッセージかつメッセージがテキストだったときのみ反応
    if (event.type === "message" && event.message.type === "text") {

      //要望メッセージ待機状態かの判断
      if (!waiting) {

        //ユーザーからのテキストメッセージが想定していた文字列を含む場合のみ反応
        if (messageObj_again.word_list.some(value => event.message.text.match(value))){

          bot.replyMessage(event.replyToken, flexMessageObj);

        } else if (messageObj_request.word_list.some(value => (value === event.message.text))){

            waiting = true;

            bot.replyMessage(event.replyToken, {
              type: "text",
              text: "何かお困りでしょうか？ 質問/要望/不具合に関する報告 などなどご自由にどうぞ！"
            });
          }

        } else {
          bot.replyMessage(event.replyToken, {
            type: "text",
            text: "ご意見ありがとうございます！ これからも何かありましたら気軽にどうぞ！"
          });

          waiting = false;

          userId = event.source.userId;
          requestText = event.message.text;

          client.connect();

          client.query("INSERT INTO request (line_id, content) VALUES ("+ userId +","+ requestText +")", (err, res) => {
            if (err) {
                console.log(err);
            }
          });//メッセージの返信。要望をデータベースに格納

          client.end;

        }
      }
    });
});

cron.schedule('0 36 11 * * *',() => {

  server.post('/bot/webhook', line.middleware(line_config), (req, res, next) => {
    // 先行してLINE側にステータスコード200でレスポンスする。
    res.sendStatus(200);

    bot.broadcast(flexMessageObj)
  });
});
