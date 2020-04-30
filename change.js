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
    temporarySeats1.splice(selected[i] - 1, 0, temporarySeats2[i]);
  };
  return temporarySeats1;
};

module.exports = changed => changedSeats(temporarySeats1, selected, temporarySeats2);//席替え完了。モジュールとしてエクスポート
