import { expect } from '@jest/globals';
import { Events } from '../src/codes/events';

test('event',(done)=>{
    const evt = new Events();
    evt.on('test', (d: any) => {
        console.log('test 123', d)
        expect(d).toBe('123')
        done()
        return d
    })
    evt.emit('test', '123')
    // expect(fns.clone(target).field4.child2.child2 === 'child2')
})
