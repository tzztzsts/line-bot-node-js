//日付の取得
const now = new Date();
const today = now.getDate();

//-------------------------------------------------------------------------------
//目が悪くない人たちの席次をまずはシャッフル
const temporarySeats1 = [1, 2, 3, 4, 5, 6, 7, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 24, 26, 27, 28, 30, 31, 32, 34, 35, 36, 37, 38];

for (let i1 = temporarySeats1.length - 1; i1 >= 0; i1--) {
  const j1 = Math.floor(Math.random() * (i1 + 1));
  [temporarySeats1[i1], temporarySeats1[j1]] = [temporarySeats1[j1], temporarySeats1[i1]];
}

// -----------------------------------------------------------------------------
//目が悪い人の席をランダムに８つ選ぶ。前から差し込まないとずれるので昇順でソート
const array = [1, 2, 3, 8, 9, 10, 15, 16, 17, 21, 22, 23, 27, 28, 29, 34, 35, 36];
const selected = [...Array(8)].map(() => array.splice(Math.floor(Math.random() * array.length), 1)[0]);

function compareFunc(a, b) {
  return a - b;
}

selected.sort(compareFunc);

// -----------------------------------------------------------------------------
//このままだと席次によって偏りが出るので目が悪い人の席次をシャッフル。さっきの席に当てはめるつもりで
const temporarySeats2 = [8, 9, 10, 22, 25, 29, 33, 39];

for (let i2 = temporarySeats2.length - 1; i2 >= 0; i2--) {
  const j2 = Math.floor(Math.random() * (i2 + 1));
  [temporarySeats2[i2], temporarySeats2[j2]] = [temporarySeats2[j2], temporarySeats2[i2]];
}

// -----------------------------------------------------------------------------
//２つのtemporarySeatsが合わさって席が決定。なんかもっとシンプルな方法ありそう
const changedSeats = (temporarySeats1, selected, temporarySeats2) => {
  for (let i = 0; i < 8; i++) {
    temporarySeats1.splice(selected[i] - 1, 0, temporarySeats2[i]);
  }
  return temporarySeats1;
};

const changed = changedSeats(temporarySeats1, selected, temporarySeats2);//席替え完了

//-----------------------------------------------------------------------------
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
            }
          ]
        }
      ]
    }
  }
};

module.exports = flexMessageObj;
