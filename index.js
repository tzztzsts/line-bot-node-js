const today = new Date();
const date = today.getDate();

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39];

const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const fs = require('fs');
const defaultFlexMessage = fs.readFileSync('flex-message.default.json','utf8');

let flexMessage = defaultFlexMessage.replace('00', date);

for( let i = 1; i >= 39; i++) {
  flexMessage = flexMessage.replace(i + "?", shuffle[i])
};

fs.writeFileSync("flex-message.json", flexMessage);


// -----------------------------------------------------------------------------
// モジュールのインポート
const line = require("@line/bot-sdk"); // Messaging APIのSDKをインポート

// -----------------------------------------------------------------------------
// パラメータ設定
const line_config = {
    channelAccessToken: process.env.LINE_ACCESS_TOKEN, // 環境変数からアクセストークンをセットしています
    channelSecret: process.env.LINE_CHANNEL_SECRET // 環境変数からChannel Secretをセットしています
};

// -----------------------------------------------------------------------------
// APIコールのためのクライアントインスタンスを作成
const bot = new line.Client(line_config);

// -----------------------------------------------------------------------------
// ルーター設定
const fs = require('fs');
const flexMessage = fs.readFileSync("flex-message.json",'utf8');

const message = FlexSendMessage.new_from_json_dict(flexMessage);

bot.broadcast([
  type: "flex",
  text: message
])
