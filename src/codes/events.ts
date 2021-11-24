export class Events {
    callbacks: Record<string, Function[]> = {};

    constructor() {

    }
    on(type: string, cb: Function) {
        if(!this.callbacks[type]) this.callbacks[type] = [];
        this.callbacks[type].push(cb)
    }
    off(type: string, cb: Function) {
        if (!this.callbacks[type]) return;
        this.callbacks[type] = this.callbacks[type].filter(c => c !== cb);
    }
    emit(type: string, ...params: any[]) {
        if (!this.callbacks[type].length) {
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
