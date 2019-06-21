1. Filter duplicate

```js
const array = [1, 2, 3, 3, 5, 5, 1]
const uniqueArray = [...new Set(array)]

console.log(uniqueArray) //[1,2,3,5]
```


2. Short-Circuit Evaluation

```js
if(this.state.data) {
  return this.state.data
} else {
  return 'Fetching Data'
}
```
Instead could write like below

```js
return (this.state.data || 'Fetching Data')
```


3. Float to Integer

```js
console.log(23.9 | 0 )  // Result: 23
console.log(-23.9 | 0 ) // Result: -23

console.log(1553 / 10 | 0) // Result: 155
console.log(1553 / 100 | 0) // Result: 15
```



4. Delete element from end of array

```js
let array = [0, 1, 2, 3]
array.length = 2
console.log(array) // Result: [0, 1]
```


5. Format JSON

```js
console.log(JSON.stringify({ alpha: 'A', beta: 'B' }, null, '\t'));

// Result:
// '{
//     "alpha": A,
//     "beta": B
// }'
```


6. Simple rate function

```js
"★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate);
```



