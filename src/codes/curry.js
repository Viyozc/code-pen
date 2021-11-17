exports.curry = function curry(fn) {
  let args = [];
  const len = fn.length;
  const fun = function () {
    const pars = [...arguments];
    args = args.concat(pars);
    if (args.length >= len) {
      return fn.apply(null, args);
    }
    return fun;
  };
  return fun;
};
exports.curry2 = function curry(fn) {
  const len = fn.length;
  const fun = function () {

    const pars = [...arguments];
    if (pars.length >= len) {
      return fn.apply(null, pars);
    }
    return function(){
        const preArgs = pars.concat([...arguments])
        return fun.apply(null, preArgs)
    };
  };
  return fun;
};
