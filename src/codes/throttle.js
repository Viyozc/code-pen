function throttle(fn, wait) {
  let timer = null;
  let org = Date.now();
  return function () {
    if (Date.now() - org < wait) {
      return;
    }
    let that = this;
    org = Date.now();
    return fn.apply(that, arguments)
  };
}
