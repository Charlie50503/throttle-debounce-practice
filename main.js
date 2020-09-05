// 什麼是還是函數節流?什麼是函數防斗
// 函數節流，一個函數執行一次，只有大於設定的執行週期後才會執行第二次
/*
    假設有一個需要頻繁觸發的函數，出於優化性能的角度，在規定時間內，只讓函數觸發的第一次生效，後面不生效
*/
/**
 * 節流函數
 * @param {要被節流的函數} fn
 * @param {規定的時間} delay
 */
function throttle(fn, delay) {
  fn();
  //紀錄上一次函數觸發的時間
  var lastTime = 0;

  //透過一個閉包的方式讓lastTime被記錄起來
  return function () {
    //紀錄當前函數觸發的時間
    var nowTime = Date.now();

    if (nowTime - lastTime > delay) {
      fn();
      //同步時間
      lastTime = nowTime;
    }
  };
}

document.onscroll = throttle(function () {
  console.log("scroll事件被觸發", Date.now());
}, 200);
