let arr = [1, -3, 5, 7, -4, 2]

function handle(arr: number[]) {
    let res: number[] = [];
    let i = 0;
    while (i < arr.length) {
        if(i === 2)  continue;
        console.log('i', i)
        // let pre = res.pop();
        // if (pre && pre < 0) {
        //     pre && res.push(pre)
        //     i++;
        //     continue;
        // }
        // if (!pre || (arr[i] ^ pre) > 0) {
        //     pre && res.push(pre)
        //     res.push(arr[i])
        // } else {
        //     if (arr[i] + pre > 0) {
        //         res.push(pre)
        //     }
        //     if (arr[i] + pre < 0) {
        //         i--;
        //     }
        //     if (arr[i] + pre === 0) {

        //     }
        // }
        // i++;

    }
    console.log(res)
    return res;
}

handle(arr)