enum STATUS {
  PENDDING,
  FULLFILLED,
  REJECTED
}

const thenPromise: (...d: any) => any = (promise2, v, resolve, reject) => {
  if( v === promise2) throw Error('error')
  
}

export class MPromise<T> {
  status = STATUS.PENDDING;
  value: any = undefined;
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

  resolve = (value: T) => {
    queueMicrotask(() => {
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
    queueMicrotask(() => {
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

  then = (onFullfilled?: (d: any) => any, onRejected?: any) => {
    onFullfilled = typeof onFullfilled === 'function' ? onFullfilled : (s: any) => s;
    onRejected = typeof onRejected === 'function' ? onRejected : (e: any) => { throw e }
    let promise2 = new MPromise((res, rej) => {
      if(this.status === STATUS.FULLFILLED) {
        queueMicrotask(() => {
          let s  = onFullfilled!(this.value)

        })
      }
    });
    if (this.status === STATUS.PENDDING) {
      this.resQueue.push(() => onFullfilled!(this.value))
      this.rejQueue.push(() => onRejected(this.reason))
    }
    if (this.status === STATUS.FULLFILLED) {
      return new MPromise((onFullfilled, onRejected) => this.value)
    }
    return new MPromise((onFullfilled, onRejected) => this.value)
  }

  catch = (onRejected: any) => {
    return this.then(undefined, onRejected)
  }

  static resolve = (val: any) => {
    return new MPromise((res, rej) => res(val))
  }
  static reject = (err: any) => {
    return new MPromise((res, rej) => rej(err))
  }
}

const p = new MPromise((res, rej) => {
  const s = 1;
  console.log('s', s)
  setTimeout(() => {
    console.log('timout')
    res(s)
  }, 1000)
  setTimeout(() => {
    console.log('macro')
  })
  queueMicrotask(() => {
    console.log('micro')
  })
})

p.then((s: any) => {
  console.log(2222, s)
  return 333
}).then((s: any) => {
  console.log('3333', s)
})