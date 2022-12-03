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

Bond
```
/*

Below is a description of a problem about paying bonds in a mortgage backed
securities deal. No previous financial knowledge is required. This question will
involve an exercise using sample data, and eventually designing and writing a
program implementing an algorithm.


A mortgage backed securities deal is a set of related bonds. For this problem,
consider the following deal.

Bond    Balance
---------------
A       $1000
B       $1000
C       $2000

A bond has a balance, it is owed that much money. When you "pay" a bond, its
balance goes down. Paying the A bond $200 would make its balance $800.

Each MBS deal has to pay all of its bonds, but they can do so in different ways.
This problem will cover 2 different ways of paying multiple bonds at the same
time, "sequential" and "prorata".


Sequential payments pay multiple bonds in order.

Sequential
    A
    B
    C
    
Pay $1,200

Bond    Start Bal.   Payment    End Bal.
----------------------------------------
A       $1,000       $1,000     $0
B       $1,000       $200       $800
C       $2,000       $0         $2,000
    
This nesting syntax means that you first pay A until it's balance is 0, then B,
then C. If you pay $1200, A is paid down and B receives $200.


Prorata payments pay all bonds proportional to their starting balance, so they
all pay down at the same time.

Prorata
    A
    B
    C
    
Pay $1,000

Bond    Start Bal.   Payment    End Bal.
----------------------------------------
A       $1,000      1/4  $250       $750
B       $1,000      1/4  $250       $750
C       $2,000      1/2  $500       $1,500

C has twice the balance of A and B, so it gets twice the money, and all 3 bonds
have 75% of their original balance.


Prorata and Sequential payments can be nested. We'll work through the following
examples together.

Sequential
    X - Prorata
        A
        B
    C
    
Note the nesting, first the entire prorata is paid, then the C bond.

Pay $1,000

Bond    Start Bal.   Payment    End Bal.
----------------------------------------
A       $1,000       $500         $500
B       $1,000       $500         $500
C       $2,000       $0         $2000

Pay $3,000

Bond    Start Bal.   Payment    End Bal.
----------------------------------------
A       $1,000       $1000         $0
B       $1,000       $1000         $0
C       $2,000       $1000         $1000



Prorata
    A.  1000 - $600
    Sequential 3000 - $1800
        B
        C

This one's tricky!

Pay $2,400

Bond    Start Bal.   Payment    End Bal.
----------------------------------------
A       $1,000       $600         $400
B       $1,000       $1000         $0
C       $2,000       $800         $1200


After completing the above exercises, please write a program in the language of
your choice that

1. Can represent the nested structures above
2. Implements paying bonds, sequentials, and proratas

pseudo code:

  pay(s, amount)
  
what is s?
amount is a dollar amount, float

s = {
    Seq: {
        A:
        B:
        Pro: {
            C
            D
            E
        }
    }
} 
    
    
    
    -Pro
}

*/
```


tax bracket calculator

```
/**
 * 
10%    $0 to $9,950          
12%    $9,951 to $40,525   
22%    $40,526 to $86,375    
24%    $86,376 to $164,925    
32%    $164,926 to $209,425
35%    $209,426 to $523,600
37%    $523,601 or more     
 * 
 * 
 */


const calculateTax = (income) => {
    const brackets = {
        9950: 0.1,
        40525: 0.12,
        86375: 0.22
    }
    
    //5000, 20,000
    const mapping = Object.entries(brackets) //[[9950, 0.1], [44022, 0.12], 666222]
    
    let amountLeft = income
    let totalTax = 0
    for(let i = 0; i < mapping.length; i++) {
        const [tax, percentage] = mapping[i]
        
        let taxDifference = 0
        if(i === 0) {
            taxDifference = 0
        } else {
            taxDifference = mapping[i][0] - mapping[i - 1][0]
        }
        
        if(amountLeft < tax - taxDifference) {
            totalTax += amountLeft * percentage
            amountLeft = 0
        } else {
            amountLeft = amountLeft - tax
            totalTax += tax * percentage
        }

        console.log(totalTax, amountLeft)
    }
    
    return totalTax
}



function main() {
    const result = calculateTax(12000)
    console.log(result)
}







/*

 calculateTax(brackets, income) {
     
     
     return tax
 }
 
 1 - 10,000     5%
 10,000 - 20,000    14%
 20,001 - 50,000    20%
 
 
 100,000
 5,000  ... 250
 
 15,000    -->
    10,000     5%        500
    5,000     10%       500
    
 
    taxable $1,000   
 
 30,000 
    10,000     5%        500
    10,000     10%       1,000
    10,000      20%      2,000
 
 tax due on 30,000 -> $3,500






10%    $0 to $9,950          
12%    $9,951 to $40,525   
22%    $40,526 to $86,375    
24%    $86,376 to $164,925    
32%    $164,926 to $209,425
35%    $209,426 to $523,600
37%    $523,601 or more      

 
 
 
 
 */
```


