const is = (value) => (type) =>
  Object.prototype.toString.call(value).includes(type);

function cloneFunction(func) {
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcString = func.toString();
  if (func.prototype) {
    console.log("普通函数");
    const param = paramReg.exec(funcString);
    const body = bodyReg.exec(funcString);
    if (body) {
      console.log("匹配到函数体：", body[0]);
      if (param) {
        const paramArr = param[0].split(",");
        console.log("匹配到参数：", paramArr);
        return new Function(...paramArr, body[0]);
      } else {
        return new Function(body[0]);
      }
    } else {
      return null;
    }
  } else {
    return eval(funcString);
  }
}

function clone(target, map = new WeakMap()) {
  const type = is(target);
  if (type("Null")) {
    return null;
  }
  if (type("Array") || type("Object")) {
    let out = type("Array") ? [] : {};
    if (map.get(target)) {
      return map.get(target);
    }
    map.set(target, out);
    for (let i in target) {
      out[i] = clone(target[i], map);
    }
    return out;
  }
  if (type("Set")) {
    let out = new Set();
    target.forEach((v) => out.add(clone(v, map)));
    return out;
  }
  if (type("Map")) {
    let out = new Map();
    target.forEach((v, k) => out.set(k, clone(v, map)));
    return out;
  }
  if (type("Symble")) {
    return Object(Symbol.prototype.valueOf.call(targe));
  }
  if (type("RegExp")) {
    return new RegExp(targe);
  }
}

exports.clone = clone;
