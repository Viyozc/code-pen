const { expect } = require('@jest/globals');
const fns  = require('../src/codes/clone')

test('clone',()=>{
    const target = {
        field1: 1,
        field2: undefined,
        field3: 'ConardLi',
        field4: {
            child: 'child',
            child2: {
                child2: 'child2'
            }
        }
    };
    target.self = target
    
    expect(fns.clone(target).field4.child2.child2 === 'child2')
})
