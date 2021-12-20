import { say } from './a.mjs'

export const a = 1;
setTimeout(() => {
    console.log('in b', say)
})
export const hi = () => 2;