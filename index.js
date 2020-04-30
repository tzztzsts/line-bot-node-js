//change.jsのfunctionをインポート
let flexMessage = require('./change');

// -----------------------------------------------------------------------------
//今日の日付を取得。前日に席替えするなら日付＋１
const today = new Date();
const date = today.getDate() + "";//Stringで扱う

// -----------------------------------------------------------------------------
// モジュールのインポート
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

  let events_processed = [];// すべてのイベント処理のプロミスを格納する配列

  const fs = require('fs');
  const jsonText = fs.readFileSync('./again-message.json', 'utf8', (error, data) => {
    if (error) {
      return;
    }
    console.log(data);
  });

  const messageObj = JSON.parse(jsonText);

    // イベントオブジェクトを順次処理。
  req.body.events.forEach((event) => {

    if (event.type === "message" && event.message.type === "text"){// この処理の対象をイベントタイプがメッセージで、かつ、テキストタイプだった場合に限定

      if (messageObj.word_list.some(value => value === event.message.text)){// ユーザーからのテキストメッセージが想定していたもの(再度座席表を送る)だった場合のみ反応
        events_processed.push(bot.replyMessage(event.replyToken, flexMessage(date).then(flexMessageObj)));
        // replyMessage()で返信し、そのプロミスをevents_processedに追加
      }
    }
  });

  // すべてのイベント処理が終了したら何個のイベントが処理されたか出力
  Promise.all(events_processed).then(
    (response) => {
      console.log(`${response.length} event(s) processed.`);
    }
  );
});
