enum STATUS {
  PENDDING,
  FULLFILLED,
  REJECTED
}

export class MPromise {
  status = STATUS.PENDDING;
  value = undefined;
  reason = undefined;
  resQueue: Function[] = [];
  rejQueue: Function[] = [];
  constructor(exector: (rs: any, rj: any) => any) {
    try {
      exector(this.resolve, this.reject)
    } catch (e) {
      this.reject(e)
    }
  }

  resolve = (value: any) => {
    setTimeout(() => {
      if (this.status === STATUS.PENDDING) {
        this.status = STATUS.FULLFILLED
        this.value = value;
        while (this.resQueue.length) {
          const cb = this.resQueue.shift();
          cb?.(value);
        }
      }

    })
  }

  reject = (err: any) => {
    setTimeout(() => {
      if (this.status === STATUS.PENDDING) {
        this.status = STATUS.REJECTED
        this.reason = err;
        while (this.rejQueue.length) {
          const cb = this.rejQueue.shift();
          cb?.(err);
        }
      }
    })
  }

  then = (onFullfilled: any, onRejected: any) => {
    onFullfilled = typeof onFullfilled === 'function' ? onFullfilled : (s: any) => s;
    onRejected = typeof onRejected === 'function' ? onRejected : (e: any) => { throw e }
    let promise2;
    if (this.status === STATUS.PENDDING) {
      this.resQueue.push(() => onFullfilled(this.value))
      this.rejQueue.push(() => onRejected(this.reason))
    }
    if (this.status === STATUS.FULLFILLED) {

    }
  }

  catch = (onRejected: any) => {
    return this.then(null, onRejected)
  }

  static resolve = (val: any) => {
    return new MPromise((res, rej) => res(val))
  }
  static reject = (err: any) => {
    return new MPromise((res, rej) => rej(err))
  }
}