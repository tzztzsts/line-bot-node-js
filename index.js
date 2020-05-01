//日付の取得
const date = new Date();
const today = date.getDate();

// -----------------------------------------------------------------------------
//モジュールのインポート
const fs = require('fs');
const server = require("express")();
const line = require("@line/bot-sdk"); // Messaging APIのSDKをインポート
const changed = require("change");

// -----------------------------------------------------------------------------
//報告用のflexmessageオブジェクト
const flexMessageObj = {
  type: "flex",
  altText: today + "日の席替えの結果",
  contents:{
      type: "bubble",
      size: "giga",
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: today + "日の座席",
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
};

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
        if (waiting) {
          events_processed.push(bot.replyMessage(event.replyToken, {
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
          }));

          waiting = false;

          userId = event.source.userId;
          requestText = event.message.text;

          dbClient.query("INSERT INTO Request VALUES ("+ userId +","+ requestText +")");

        }
      }
  })();

  //待機時間は2分
  const timeOut = asyncSetTimeout(1000 * 60 * 2);

// -----------------------------------------------------------------------------
// ルーター設定
server.post('/bot/webhook', line.middleware(line_config), (req, res, next) => {

  res.sendStatus(200);// 先行してLINE側にステータスコード200でレスポンスする

  let events_processed = [];// すべてのイベント処理のプロミスを格納する配列
  // イベント処理
  req.body.events.forEach((event) => {

    //イベントがメッセージかつメッセージがテキストだったときのみ反応
    if (event.type === "message" && event.message.type === "text") {

      //要望メッセージ待機状態かの判断
      if (!waiting) {

        //ユーザーからのテキストメッセージが想定していた文字列を含む場合のみ反応
        if (messageObj_again.word_list.some(value => event.message.text.match(value))){

          events_processed.push(bot.replyMessage(event.replyToken, changedSeatObj));

        } else if (messageObj_request.word_list.some(value => (value === event.message.text))){

              waiting = true;

              events_processed.push(bot.replyMessage(event.replyToken, {
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
              }));

              await timeOut.exec();
              await asyncFunc(){
                return false;
              }

              waiting = asyncFunc();

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

            cancel();//メッセージの返信。要望をデータベースに格納

          }
        }
      }
    });

    // すべてのイベント処理が終了したら何個のイベントが処理されたか出力
  Promise.all(events_processed).then(
    (response) => {
      console.log(`${response.length} event(s) processed.`);
  })
});
