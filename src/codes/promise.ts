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

/**
class Promise {
  constructor(executor) {
      this.status = 'pending' // 初始化状态
      this.value = undefined // 初始化成功返回的值
      this.reason = undefined // 初始化失败返回的原因

      // 解决处理异步的resolve
      this.onResolvedCallbacks = [] // 存放所有成功的resolve
      this.onRejectedCallbacks = [] // 存放所有失败的reject


      const resolve = (value) => {
          if(this.status === 'pending') {
              this.status = 'fulfilled' // 成功时将状态转换为成功态fulfilled
              this.value = value // 将成功返回的值赋值给promise
              // 为了解决异步resolve以及返回多层promise
              this.onResolvedCallbacks.forEach(fn => {
                  fn() // 当状态变为成功态依次执行所有的resolve函数
              })
          }
      }
      const reject = (reason) => {
          if(this.status === 'pending') {
              this.status = 'rejected' // 失败时将状态转换为成功态失败态rejected
              this.reason = reason // 将失败返回的原因赋值给promise
              this.onRejectedCallbacks.forEach(fn => {
                  fn() // 当状态变为失败态依次执行所有的reject函数
              })
          }
      }
      executor(resolve, reject) // 执行promise传的回调函数
  }

  then(onFulfilled, onRejected) {
      // 为了解决then方法返回Promise的情况
      const promise2 = new Promise((resolve, reject) => {
          if(this.status === 'fulfilled') { // 如果状态为fulfilled时则将值传给这个成功的回调
              setTimeout(() => {
                  const x = onFulfilled(this.value) // x的值有可能为 promise || 123 || '123'...
                  // 注意：此时调用promise2时还没有返回值，要用setTimeout模拟进入第二次事件循环；先有鸡先有蛋
                  resolvePromise(promise2, x, resolve, reject)
              }, 0)
          }
          if(this.status === 'rejected') {
              setTimeout(() => {
                  const x = onRejected(this.reason) // 如果状态为rejected时则将视频的原因传给失败的回调
                  resolvePromise(promise2, x, resolve, reject)
              }, 0)
          }
          if(this.status === 'pending') { // 记录-》解决异步
              this.onResolvedCallbacks.push(() => {
                  setTimeout(() => {
                      const x = onFulfilled(this.value)
                      resolvePromise(promise2, x, resolve, reject)
                  }, 0)
              })
              this.onRejectedCallbacks.push(() => {
                  setTimeout(() => {
                      const x = onRejected(this.reason)
                      resolvePromise(promise2, x, resolve, reject)
                  }, 0)
              })
          }
      })
      return promise2; // 解决多次链式调用的问题
  }
}

const resolvePromise = (promise2, x, resolve, reject) => {
  // console.log(promise2, x, resolve, reject)
  if(promise2 === x) { // 如果返回的值与then方法返回的值相同时
      throw TypeError('循环引用')
  }
  // 判断x是不是promise;注意：null的typeof也是object要排除
  if(typeof x === 'function' || (typeof x === 'object' && x !== null)) {
      try {
          const then = x.then // 获取返回值x上的then方法；注意方法会报错要捕获异常；原因111
          if(typeof then === 'function') { // 就认为是promise
              then.call(x, y => {
                  // resolve(y)
                  // 递归解析 ; 有可能返回多个嵌套的promise
                  resolvePromise(promise2, y, resolve, reject)
              }, r => {
                  reject(r)
              })
          }
      } catch(e) {
          reject(e)
      }
  } else {
      resolve(x);
  }
}
module.exports = Promise;
