Function.prototype.myApply = function () {
  let args = arguments[1];
  let context = arguments[0];
  context.fn = this;
  let result;
  if (args.length) {
    result = context.fn(...args);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
};
