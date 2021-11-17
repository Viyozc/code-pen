function debouce(fn, wait) {
    let timer = Date.now();
    return function() {
        if(timer) {
            clearTimeout(timer)
            timer = null;
            return;
        }
        let that = this;
        timer = setTimeout(() => {
            fn.apply(that, arguments)
        }, wait)
    }
}