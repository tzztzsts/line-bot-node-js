//今日の日付を取得。前日に席替えするなら日付＋１
const today = new Date();
const date = today.getDate() + "";//Stringで扱う

// -----------------------------------------------------------------------------
//目が悪くない人たちの席次をまずはシャッフル
const temporarySeats1 = [1, 2, 3, 4, 5, 6, 7, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 24, 26, 27, 28, 30, 31, 32, 34, 35, 36, 37, 38];

for (let i1 = temporarySeats1.length - 1; i1 >= 0; i1--) {
  const j1 = Math.floor(Math.random() * (i1 + 1));
  [temporarySeats1[i1], temporarySeats1[j1]] = [temporarySeats1[j1], temporarySeats1[i1]];
};

// -----------------------------------------------------------------------------
//目が悪い人の席をランダムに８つ選ぶ。前から差し込まないとずれるので昇順でソート
const array = [1, 2, 3, 8, 9, 10, 15, 16, 17, 21, 22, 23, 27, 28, 29, 34, 35, 36];
const selected = [...Array(8)].map(() => array.splice(Math.floor(Math.random() * array.length), 1)[0]);

function compareFunc(a, b) {
  return a - b;
};

selected.sort(compareFunc);

// -----------------------------------------------------------------------------
//このままだと席次によって偏りが出るので目が悪い人の席次をシャッフル。さっきの席に当てはめるつもりで
const temporarySeats2 = [8, 9, 10, 22, 25, 29, 33, 39];

for (let i2 = temporarySeats2.length - 1; i2 >= 0; i2--) {
  const j2 = Math.floor(Math.random() * (i2 + 1));
  [temporarySeats2[i2], temporarySeats2[j2]] = [temporarySeats2[j2], temporarySeats2[i2]];
};

// -----------------------------------------------------------------------------
//２つのtemporarySeatsが合わさって席が決定。なんかもっとシンプルな方法ありそう
const changedSeats = (temporarySeats1, selected, temporarySeats2) => {
  for (let i = 0; i < 8; i++) {
    temporarySeats1.splice(selected[i] - 1, 0, temporarySeats2[i])
  };
  return temporarySeats1;
};

changedSeats(temporarySeats1, selected, temporarySeats2);//席替え完了

// -----------------------------------------------------------------------------
//一斉送信用のflex messageをjsonファイルから読み込む
const fs = require('fs');
let json = fs.readFileSync('flex-message.json', 'utf8');

// -----------------------------------------------------------------------------
//席替えの結果と日付に合わせてflex messageを書き換え、オブジェクトとして取得
json.replace("0?", date);

let seatNumber, changedSeatsAsString;
for (i = 1; i <= 39; i++) {
  seatNumber = i + "?";
  changedSeatsAsString = changedSeats[i - 1] + "";
  json.replace(seatNumber, changedSeatsAsString);
};

const flexMessageObj = JSON.parse(json);
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

    // イベントオブジェクトを順次処理。
  req.body.events.forEach((event) => {
    // この処理の対象をイベントタイプがメッセージで、かつ、テキストタイプだった場合に限定
    if (event.type == "message" && event.message.type == "text"){
      json = fs.readFile('again-message.json', 'utf8');
      const jsonText
      const messageObj = JSON.parse(jsonText);
      // ユーザーからのテキストメッセージが想定していたもの(再度座席表を送る)だった場合のみ反応
      if (messageObj.some(value => value == event.message.text){
        // replyMessage()で返信し、そのプロミスをevents_processedに追加
        events_processed.push(bot.replyMessage(event.replyToken, json));
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
