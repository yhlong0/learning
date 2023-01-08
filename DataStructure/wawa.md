```js
/**
 * You need to write the code to process an incoming stream of transactions to calculate the Simple Moving Average
 * of those transactions, for a pre-defined number of the most recent transactions in the stream (called the window size).
 * 
 * Code skeleton is provided below; you need to complete the implementation of the MovingAverage class.
 * The stream of transactions will be provided as integers in a plaintext file, with one transaction per line. 
 *
 * The expected output is provided below, for the sample input given, where the window size is 2.
 * You can run your solution using the sample by Shell or PowerShell:
 **/
/*
Command: echo "
5
7
2
9
1
" > sample.txt
Command: cat sample.txt | npx ts-node moving-average.js
== Expected results
moving average after tx 1 = 5
moving average after tx 2 = 6
moving average after tx 3 = 4.5
moving average after tx 4 = 5.5
moving average after tx 5 = 5


*/
const readline = require('readline');
class MovingAverage {
    constructor() {
        // initialize
        // TODO: implement me
        this.store = []
        this.windowSize = 2
    }
    storeTransaction(amount){
        // add a new transaction
        // TODO: implement me
        this.store.push(amount)
        
    }
    getCurrentAverage() {
        // should return the current moving average
        // TODO: Implement me and fix the return value
        const len = this.store.length
        
        if(this.windowSize > len) { 
            return this.store.reduce((sum, current) => {
                sum += current
                return sum
            }, 0) / len
        }

        let sum = 0
        for(let i = 0; i < this.windowSize; i++) {
            sum += this.store[len - i - 1]
        }
        
        return sum / this.windowSize;
    }
}
const ma = new MovingAverage();
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
let count = 1;
rl.on('line', (line) => {
    const amount = parseInt(line.trim())
    ma.storeTransaction(amount);
    console.info(`moving average after tx ${count} = ${ma.getCurrentAverage()}`);
    count +=1;
});

```
