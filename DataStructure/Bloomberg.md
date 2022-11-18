```js

/*
Universe Set of Characters: {"0", "1"}

Rule 1: "0" -> "01"
Rule 2: "1" -> "10"

Start / Gen 0: "1"
Gen 1: "10"
Gen 2: "1001"
Gen 3: "10010110"
Gen 4: "100101100X101001"
Gen 5: "100101100X101001" + reverse("100101100X101001")

foo(start, N, k) -> Return the kth index element in the Nth generation string, assuming given "start"
foo("1", 3, k = 3) -> 1

Time Complexity: O(N * 2 ^ N) -> O(N)
Space Complexity: O(N * 2 ^ N) -> O(N)



total length = 2^N
check my k is first half, second half 
      /                     \
    divide/2                     check reverse of the first 
    / \

*/

// 1 <= k <= 2^N - 1
// 0
// 01
// 0110

// true
// true,false,
// true,false,false,true
// true,false,false,true,false,true,true,false
// true,false,false,true,false,true,true,false,false,true,true,false,true,false,false,true

const checkKthIndex = (start, N, k) => {  //0, 2, 1. | 
    if(N === 0) return start
    if(N === 1) return k === 0 ? start : !start
    
    const totalLength = Math.pow(2, N) // 4
    
    if(k + 1 <= totalLength / 2) { //2
        return checkKthIndex(start, N - 1, k) //0, 1, 1 | 0, 1, 1
    } else {
        return !checkKthIndex(start, N - 1, k - totalLength / 2)
    }  
}

let n = 4
let result = []
for (let i = 0; i < Math.pow(2, n); i++) {
    result.push(checkKthIndex(true, n, i)) //5 -> index 4
}
console.log(result)

```
