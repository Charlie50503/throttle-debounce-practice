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
  //紀錄上一次函數觸發的時間
  var lastTime = 0;

  //透過一個閉包的方式讓lastTime被記錄起來
  return function () {
    //紀錄當前函數觸發的時間
    var nowTime = Date.now();

    if (nowTime - lastTime > delay) {
      //將當前函數的this傳入到調用的function裡面
      //修正this指向問題
      fn.call(this);
      //同步時間
      lastTime = nowTime;
    }
  };
}
//在想要添加節流的函數包起來
// document.onscroll = throttle(function () {
//   console.log("scroll事件被觸發", Date.now());
// }, 200);

/*
    防抖函數，一個需要頻繁觸發函數，在規定時間內，只讓最後一次生效，前面的不生效
    這裡主要的原理是利用clearTime來取消上一次的動作
    如果用戶重複觸發函數時，如果沒有超過等待時間，
    timer就會被 clear 如果用戶 等待的時間有超過timer設定的時間函數就會被觸發
*/
function debounce(fn, delay) {
  //紀錄上一次的延時器
  var timer = null;
  // 為了記錄上一次的延時器必須使用閉包
  return function () {
    //需要先清除上一次的延時器
    clearTimeout(timer);
    //重新設置新的延時器
    timer = setTimeout(function () {
      fn.apply(this);
    }, delay);
  };
}

document.getElementById("btn").onclick = debounce(function () {
  console.log("點擊事件被觸發了", Date.now());
}, 500);
