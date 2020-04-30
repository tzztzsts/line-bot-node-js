//モジュールのインポート
const fs = require('fs');

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
);
