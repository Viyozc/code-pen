Function.prototype.call = function(context) {
    if (typeof this !== 'function') {
        throw new TypeError('type error')
    }
    let args = [...arguments].slice(1)
    let result = null;
    context = context || window;
    context.fn = this;
    result = context.fn(...args);
    delete context.fn;
    return result;
}