// ボードの高さをWindowの高さに合わせる
const changeBoardHeight = function () {
   // ボードのエレメントを取得
  const bord = document.getElementById('bord');
  // 上端の位置を取得
  const bordTop = bord.getBoundingClientRect().top;
  // bodyのフォントサイズを取得
  const defaultFontSize = parseInt(window.getComputedStyle(document.body).fontSize, 10);
  // 高さから上端までの高さと下端に一文字分のスペースを引いたものを高さとする
  bord.style.height = 'calc(100vh - ' + (bordTop + defaultFontSize) + 'px)';
};

// windowのサイズが変わるたびに高さを調整する
window.addEventListener('resize', changeBoardHeight);
// 初期読み込み時に一度実行する
changeBoardHeight();