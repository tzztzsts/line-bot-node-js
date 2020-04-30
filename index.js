//日付の取得
const date = new Date();
const today = date.getDate();

// -----------------------------------------------------------------------------
//モジュールのインポート
const fs = require('fs');
const server = require("express")();
const line = require("@line/bot-sdk"); // Messaging APIのSDKをインポート
const changed = require("./change");

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

let events_processed = [];// すべてのイベント処理のプロミスを格納する配列

  // イベント処理
req.body.events.forEach((event) => {

  //ユーザーからのテキストメッセージが想定していた文字列を含む場合のみ反応
  if (messageObj.word_list.some(value => event.message.text.match(value))){

    //replyMessage()で返信し、そのプロミスをevents_processedに追加
    events_processed.push(bot.replyMessage(event.replyToken, {
      type: "flex",
      altText: "席替えの結果",
      contents:{
          type: "bubble",
          size: "giga",
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: '"'+ today + '日の座席"',
                weight: "bold",
                size: "xl"
              },
              {
                type: "box",
                layout: "horizontal",
                spacing: "none",
                offsetTop: "md",
                contents: [
                  {
                    type: "separator"
                  },
                  {
                    type: "box",
                    layout: "vertical",
                    paddingStart: "md",
                    paddingEnd: "md",
                    spacing: "md",
                    contents: [
                      {
                        type: "separator"
                      },
                      {
                        type: "text",
                        text: "" + changed[0],
                        align: "center",
                        gravity: "center"
                      },
                      {
                        type: "separator"
                      },
                      {
                        type: "text",
                        text: "" + changed[1],
                        align: "center",
                        gravity: "center"
                      },
                      {
                        type: "separator"
                      },
                      {
                        type: "text",
                        text: "" + changed[2],
                        align: "center",
                        gravity: "center"
                      },
                      {
                        type: "separator"
                      },
                      {
                        type: "text",
                        text: "" + changed[3],
                        align: "center",
                        gravity: "center"
                      },
                      {
                        type: "separator"
                      },
                      {
                        type: "text",
                        text: "" + changed[4],
                        align: "center",
                        gravity: "center"
                      },
                      {
                        type: "separator"
                      },
                      {
                        type: "text",
                        text: "" + changed[5],
                        align: "center",
                        gravity: "center"
                      },
                      {
                        type: "separator"
                      },
                      {
                        type: "text",
                        text: "" + changed[6],
                        align: "center",
                        gravity: "center"
                      },
                      {
                        type: "separator"
                      }
                    ]
                  },
                  {
                    type: "separator"
                  },
                  {
                    type: "box",
                    layout: "vertical",
                    paddingStart: "md",
                    paddingEnd: "md",
                    spacing: "md",
                    contents: [
                      {
                        type: "separator"
                      },
                      {
                        type: "text",
                        text: "" + changed[7],
                        align: "center",
                        gravity: "center"
                      },
                      {
                        type: "separator"
                      },
                      {
                        type: "text",
                        text: "" + changed[8],
                        align: "center",
                        gravity: "center"
                      },
                      {
                        type: "separator"
                      },
                      {
                        type: "text",
                        text: "" + changed[9],
                        align: "center",
                        gravity: "center"
                      },
                      {
                        type: "separator"
                      },
                      {
                        type: "text",
                        text: "" + changed[10],
                        align: "center",
                        gravity: "center"
                      },
                      {
                        type: "separator"
                      },
                      {
                        type: "text",
                        text: "" + changed[11],
                        align: "center",
                        gravity: "center"
                      },
                      {
                        type: "separator"
                      },
                      {
                        type: "text",
                        text: "" + changed[12],
                        align: "center",
                        gravity: "center"
                      },
                      {
                        type: "separator"
                      },
                      {
                        type: "text",
                        text: "" + changed[13],
                        align: "center",
                        gravity: "center"
                      },
                      {
                        type: "separator"
                      }
                    ]
                  },
                  {
                    type: "separator"
                  },
                  {
                    type: "box",
                    layout: "vertical",
                    paddingStart: "md",
                    paddingEnd: "md",
                    spacing: "md",
                    contents: [
                      {
                        type: "separator"
                      },
                      {
                        type: "text",
                        text: "" + changed[14],
                        align: "center",
                        gravity: "center"
                      },
                      {
                        type: "separator"
                      },
                      {
                        type: "text",
                        text: "" + changed[15],
                        align: "center",
                        gravity: "center"
                      },
                      {
                        type: "separator"
                      },
                      {
                        type: "text",
                        text: "" + changed[16],
                        align: "center",
                        gravity: "center"
                      },
                      {
                        type: "separator"
                      },
                      {
                        type: "text",
                        text: "" + changed[17],
                        align: "center",
                        gravity: "center"
                      },
                      {
                        type: "separator"
                      },
                      {
                        type: "text",
                        text: "" + changed[18],
                        align: "center",
                        gravity: "center"
                      },
                      {
                        type: "separator"
                      },
                      {
                        type: "text",
                        text: "" + changed[19],
                        align: "center",
                        gravity: "center"
                      },
                      {
                        type: "separator"
                      }
                    ]
                  },
                  {
                    type: "separator"
                  },
                  {
                    type: "box",
                    layout: "vertical",
                    paddingStart: "md",
                    paddingEnd: "md",
                    spacing: "md",
                    contents: [
                      {
                        type: "separator"
                      },
                      {
                        type: "text",
                        text: "" + changed[20],
                        align: "center",
                        gravity: "center"
                      },
                      {
                        type: "separator"
                      },
                      {
                        type: "text",
                        text: "" + changed[21],
                        align: "center",
                        gravity: "center"
                      },
                      {
                        type: "separator"
                      },
                      {
                        type: "text",
                        text: "" + changed[22],
                        align: "center",
                        gravity: "center"
                      },
                      {
                        type: "separator"
                      },
                      {
                        type: "text",
                        text: "" + changed[23],
                        align: "center",
                        gravity: "center"
                      },
                      {
                        type: "separator"
                      },
                      {
                        type: "text",
                        text: "" + changed[24],
                        align: "center",
                        gravity: "center"
                      },
                      {
                        type: "separator"
                      },
                      {
                        type: "text",
                        text: "" + changed[25],
                        align: "center",
                        gravity: "center"
                      },
                      {
                        type: "separator"
                      }
                    ]
                  },
                  {
                    type: "separator"
                  },
                  {
                    type: "box",
                    layout: "vertical",
                    paddingStart: "md",
                    paddingEnd: "md",
                    spacing: "md",
                    contents: [
                      {
                        type: "separator"
                      },
                      {
                        type: "text",
                        text: "" + changed[26],
                        align: "center",
                        gravity: "center"
                      },
                      {
                        type: "separator"
                      },
                      {
                        type: "text",
                        text: "" + changed[27],
                        align: "center",
                        gravity: "center"
                      },
                      {
                        type: "separator"
                      },
                      {
                        type: "text",
                        text: "" + changed[28],
                        align: "center",
                        gravity: "center"
                      },
                      {
                        type: "separator"
                      },
                      {
                        type: "text",
                        text: "" + changed[29],
                        align: "center",
                        gravity: "center"
                      },
                      {
                        type: "separator"
                      },
                      {
                        type: "text",
                        text: "" + changed[30],
                        align: "center",
                        gravity: "center"
                      },
                      {
                        type: "separator"
                      },
                      {
                        type: "text",
                        text: "" + changed[31],
                        align: "center",
                        gravity: "center"
                      },
                      {
                        type: "separator"
                      },
                      {
                        type: "text",
                        text: "" + changed[32],
                        align: "center",
                        gravity: "center"
                      },
                      {
                        type: "separator"
                      }
                    ]
                  },
                  {
                    type: "separator"
                  },
                  {
                    type: "box",
                    layout: "vertical",
                    paddingStart: "md",
                    paddingEnd: "md",
                    spacing: "md",
                    contents: [
                      {
                        type: "separator"
                      },
                      {
                        type: "text",
                        text: "" + changed[33],
                        align: "center",
                        gravity: "center"
                      },
                      {
                        type: "separator"
                      },
                      {
                        type: "text",
                        text: "" + changed[34],
                        align: "center",
                        gravity: "center"
                      },
                      {
                        type: "separator"
                      },
                      {
                        type: "text",
                        text: "" + changed[35],
                        align: "center",
                        gravity: "center"
                      },
                      {
                        type: "separator"
                      },
                      {
                        type: "text",
                        text: "" + changed[36],
                        align: "center",
                        gravity: "center"
                      },
                      {
                        type: "separator"
                      },
                      {
                        type: "text",
                        text: "" + changed[37],
                        align: "center",
                        gravity: "center"
                      },
                      {
                        type: "separator"
                      },
                      {
                        type: "text",
                        text: "" + changed[38],
                        align: "center",
                        gravity: "center"
                      },
                      {
                        type: "separator"
                      }
                    ]
                  },
                ]
              }
            ]
          }
      }

    }));

  };
});

// すべてのイベント処理が終了したら何個のイベントが処理されたか出力
Promise.all(events_processed).then(
  (response) => {
    console.log(`${response.length} event(s) processed.`);
  }
)
});
