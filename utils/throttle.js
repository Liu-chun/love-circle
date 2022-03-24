// 节流
export default function throttle(fn, delay) {
  let timer = null; //定义一个定时器
  return function () {
    let _this = this;
    let args = arguments;
    if (!timer) {
      timer = setTimeout(function () {
        fn.apply(_this, args);
        timer = null;
      }, delay);
    }
  }
}