function readOnly(target, name, descriptor) {
  descriptor.writable = false;
  return descriptor;
}

function log(target, name, descriptor) {
  const oldFun = descriptor.value;
  descriptor.value = function () {
    console.log("fun is called", name);
    oldFun.apply(this, arguments);
  };
  return descriptor;
}
