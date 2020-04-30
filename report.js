//日付の取得
const date = new Date();
const today = date.getDate();

// モジュールのインポート
const server = require("express")();
const line = require("@line/bot-sdk"); // Messaging APIのSDKをインポート

const changed = require("./change");



  let events_processed = [];// すべてのイベント処理のプロミスを格納する配列

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

module.exports = events_processed;
