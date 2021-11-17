const fns  = require('../src/codes/curry')

test('curry',()=>{
    const fun = (a, b, c) => a+b+c
    const nf = fns.curry(fun)
    expect(nf(1)(2)(3)).toBe(6)
    expect(fns.curry(fun)(1,2)(3)).toBe(6)
    expect(fns.curry(fun)(1,2)(3,4)).toBe(6)
    const fn2 = fns.curry(fun)(1, 2)
    expect(fn2(3,2)).toBe(6)
})

test('curry2',()=>{
    const fun = (a, b, c) => a+b+c
    const nf = fns.curry2(fun)
    expect(nf(1)(2)(3)).toBe(6)
    expect(nf(1,2)(3)).toBe(6)
    expect(nf(1,2)(3,4)).toBe(6)
    const fn2 = nf(1, 2)
    expect(fn2(3,2)).toBe(6)
})