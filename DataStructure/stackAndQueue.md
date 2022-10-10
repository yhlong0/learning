# Stack and Queue

```js
let stack = [];
stack.push(2);       // stack is now [2]
stack.push(5);       // stack is now [2, 5]
let i = stack.pop(); // stack is now [2]
alert(i);            // displays 5

let queue = [];
queue.push(2);         // queue is now [2]
queue.push(5);         // queue is now [2, 5]
let i = queue.shift(); // queue is now [5]
alert(i);              // displays 2
```

```js
array.unshift(1) //add element to the begining. 

array.splice(start, deleteCount, item1, item2, itemN)

array.splice(1, 0, 'a') //add 'a' at index 1
array.splice(0, 1, 'replace') //replace one element at index 0
array.splice(0, 0, 'add', 'two') //add two elements start from index 0, remove none

const myFish = ['angel', 'clown', 'trumpet', 'sturgeon'];
const removed = myFish.splice(0, 2, 'parrot', 'anemone', 'blue');

// myFish is ["parrot", "anemone", "blue", "trumpet", "sturgeon"]
// removed is ["angel", "clown"]

//remove two, start from index 2
const myFish = ['parrot', 'anemone', 'blue', 'trumpet', 'sturgeon'];
const removed = myFish.splice(2, 2);

// myFish is ["parrot", "anemone", "sturgeon"]
// removed is ["blue", "trumpet"]

//remove all, start from index 2
const myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
const removed = myFish.splice(2);

// myFish is ["angel", "clown"]
// removed is ["mandarin", "sturgeon"]
```
