import { MPromise } from '../src/codes/promise';

test('promise',(done)=>{
    // const mp = new MPromise((res, rej) => {
    //     console.log('res')
    //     res(1)
    // })
    // mp.then(s => console.log(222, s))
    let promise = new MPromise((resolve, reject) => {
        setTimeout(() => {
            resolve('1');
        }, 500);
    })
     promise.then((res: any) => {
        expect(res).toBe('1')
        done()
    }, (err: any) => {
        console.log(err);
    })

    // expect(mp.then(s => console.log(s)))
})
