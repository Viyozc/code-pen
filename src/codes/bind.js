Function.prototype.myBind = function () {
  let args = [...arguments].slice(1);
  let context = arguments[0];
  let fn = this;
  return function () {
    return fn.apply(context, args.concat([...arguments]));
  };
};
