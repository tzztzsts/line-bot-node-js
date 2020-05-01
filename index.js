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
//データベースに接続
const pool = require('./database.js');
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
  //想定済文字烈の読み込み
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

          pool.query("INSERT INTO Request VALUES ("+ userId +","+ requestText +")");//メッセージの返信。要望をデータベースに格納
        }
      }
    });

    hour = dt.getHours();
    min = dt.getMinutes() + waitTime;

    excess = min - 59
    if (excess > 0) {
      min = excess - 1;
    }

    //待ち時間が過ぎても待機状態であればメッセージを送って待機状態をやめる
    cron.schedule('0 ' + min + ' ' + hour + ' * * *', () => {

      if (waiting){

        waiting = false;

        bot.replyMessage(event.replyToken, {
          type: "text",
          text: waitTime + "分間何も入力されなかったため、質問/要望/不具合に関する報告 の入力の受付を終了します。"
        });
      }
    });
});
