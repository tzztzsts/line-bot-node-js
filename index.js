//時刻の取得
const now = new Date();
const today = now.getDate();

// -----------------------------------------------------------------------------
//モジュールのインポート
const fs = require('fs');//jsonの読み取り用
const cron = require('node-cron');//時間をトリガーにする
const server = require('express')();
const line = require('@line/bot-sdk'); // Messaging APIのSDKをインポート
const flexMessageObj = require('./change.js');

// -----------------------------------------------------------------------------
//データベースに接続
const { Client } = require('pg');

const dbClient = new Client({
  connectionString: process.env.DATABASE_URI
});

dbClient.connect();
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

  const jsonText_request = fs.readFileSync('./request_message.json', 'uft8', (error, data) => {
    if (error) {
      return;
    }
    console.log(data);
  });

  const messageObj_request = JSON.parse(jsonText_request);
  //読み込み終了


//---------------------------------------------------------------------------------
  let waiting = false;//要望メッセージ待機状態か否かをここに入れる

//---------------------------------------------------------------------------------
  //待機時間を作る
  function asyncSetTimeout(msec, func = () => {}){
      let timeoutId;
      let r;
      const exec = () => new Promise((res) => {
              r = res
              timeoutId = setTimeout(async () => {
                  timeoutId = null;
                  await func();
                  res();
              },msec);
          });
      return {
          exec,
          cancel: () => {
              if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
                r();
              }
          }
      };
  }

  //要望メッセージ待機状態を途中で解除する
  let cancel;

  (async ()=>{
      const a = asyncSetTimeout(1000,asyncFunc);
      cancel = a.cancel;
      await a.exec();// ここで設定した時間分処理を待ったあとasyncFuncを実行する

      //cancel()されるとここの処理が行われる
      {

      }
  })();

// -----------------------------------------------------------------------------
// ルーター設定
server.post('/bot/webhook', line.middleware(line_config), (req, res, next) => {

  res.sendStatus(200);// 先行してLINE側にステータスコード200でレスポンスする

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
                messages: [
                  {
                    type: "text",
                    text: "何かお困りでしょうか？"
                  },
                  {
                    type: "text",
                    text: "質問/要望/不具合に関する報告 をご自由にどうぞ！"
                  }
                ]
              });

              waiting = false;

              events_processed.push(bot.replyMessage(event.replyToken, {
                messages: [
                  {
                    type: "text",
                    text: "2分間何も入力されなかったため、質問/要望/不具合に関する報告 の入力の受付を終了します。"
                  },
                  {
                    type: "text",
                    text: "いつでも気軽にご報告ください！"
                  }
                ]
              }));

          } else {
            bot.replyMessage(event.replyToken, {
              messages: [
                {
                  type: "text",
                  text: "ご意見ありがとうございます！"
                },
                {
                  type: "text",
                  text: "これからも何かありましたら気軽にどうぞ！"
                }
              ]
            });

            waiting = false;

            userId = event.source.userId;
            requestText = event.message.text;

            dbClient.query("INSERT INTO Request VALUES ("+ userId +","+ requestText +")");//メッセージの返信。要望をデータベースに格納
          }
        }
      }
    });
});
