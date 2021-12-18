// function test(a, b) {
//   function pare(x, y) {
//     // if(!x || !y) return false;
//     // if(!x.length || !y.length ) return false;
//     for(let i = 0; i< x.length; i ++) {
//         for(let j = 0; j<y.length; j++) {
//             if(y[j] === x[i]) return true;
//         }
//     }
//     return false;
//   }
//   let res = [];
//   for(let i = 0; i< a.length; i++) {
//     res.push(pare(a[i], b[i]) ? 'YES' : 'NO')
//   }
//   return res;
// }

// console.log(test(['hi','wo'], ['h1', 'ab']))

function countDuplicates(numbers) {
  let map = {};
  let res = 0;
  for(let i = 0; i< numbers.length; i++) {
      if(map[numbers[i]]) {
          res += 1;
      } else {
          map[numbers[i]] = true;
      }
  }
  return res;

}

console.log(countDuplicates([1,1,2,2,3,4,5]))

  
function t3() {
  this.isPresent = function(root, val) {
    // Add your code here
    let res = [];
    let isIn = (v, root) => {
        if(!root) return false;
        if(root.data === v) return true;
        return isIn(v, root.left) || isIn(v, root.right)
    }
    for(let i = 0; i < val.length; i++) {
        res.push(isIn(val[i], root))
    }
    return res;
  }
}