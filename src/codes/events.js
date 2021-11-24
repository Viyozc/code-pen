class Events {
    callbacks = {};

    constructor(){

    }
    on(type, cb){
        this.callbacks[type] = (this.callbacks[tpye] || []).push(cb)
    }
    off(type, cb){
        if(!this.callbacks[type]) return;
        this.callbacks[type] = this.callbacks[type].filter(c => c !== cb);
    }
    emit(type, ...params) {
        if(!this.callbacks[type].legnth) {
            return;
        }
        this.callbacks[type].forEach(cb => {
            cb(...params)
        })
    }
    removeAll() {
        this.callbacks = {};
    }

}
