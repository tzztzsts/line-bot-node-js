//時刻の取得
var dt = new Date();

// -----------------------------------------------------------------------------
//モジュールのインポート
const fs = require('fs');//jsonの読み取り用
const express = require('express');
const line = require('@line/bot-sdk'); // Messaging APIのSDKをインポート
const bodyParser = require('body-parser');
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
});//環境変数の取得

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
const server = express();

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
  let waiting = {};//ユーザーごとに要望メッセージ待機状態か否かをここに入れる

// -----------------------------------------------------------------------------
// ルーター設定
server.post('/bot/webhook', line.middleware(line_config), (req, res, next) => {

  res.sendStatus(200);// 先行してLINE側にステータスコード200でレスポンスする

  // イベント処理
  req.body.events.forEach((event) => {

    //イベントがメッセージかつメッセージがテキストだったときのみ反応
    if (event.type === "message" && event.message.type === "text") {

      userId = event.source.userId;

      //ユーザーごとに要望メッセージ待機状態かの判断
      if (!waiting.hasOwnProperty(userId) || !waiting[userId]) {

        //ユーザーからのテキストメッセージが想定していた文字列を含む場合のみ反応
        if (messageObj_again.word_list.some(value => event.message.text.match(value))){

          bot.replyMessage(event.replyToken, flexMessageObj);

        } else if (messageObj_request.word_list.some(value => event.message.text.match(value))){

            waiting[userId] = true;

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

          waiting[userId] = false;

          requestText = event.message.text;

          client.connect();

          client.query({text: "INSERT INTO request(line_id, content) VALUES ($1, $2)", values: [userId, requestText]}), (err_client, res_client) => {
            if (err_client) {
                console.log(err_client);
            } else {
              console.log(res_client.rows[0]);
            }
          };//メッセージの返信。要望をデータベースに格納
        }
      }
    });
});

//定期連絡用
server.get('/reg', (req, res) => {
  // ステータスコード200でレスポンスする
  res.sendStatus(200);

  bot.broadcast(flexMessageObj);
});

//dynoを起こす
server.get('/', (req, res) => {
  // ステータスコード200でレスポンスする
  res.sendStatus(200);
});

server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(bodyParser.json());//json受信

server.post('/sch',(req, res) => {
  //先行してステータスコード200でレスポンスする
  res.sendStatus(200);

  bot.broadcast({
    type: "text",
    text: req.body.message
  });
});
