import { hi } from './b.mjs'

export const a = 1;
console.log('a.mjs')
console.log('b.mjs', hi())
export const say = () => console.log('say')