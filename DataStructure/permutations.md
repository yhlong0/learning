### Permutations

Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.

#### Example 1:
```
Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

#### Example 2:
```
Input: nums = [0,1]
Output: [[0,1],[1,0]]
```

#### Example 3:
```
Input: nums = [1]
Output: [[1]]
```


### Solution(backtracking)
```js
const input = [1, 2, 3];

const permutation = (unused, used = [], answer = []) => {
  if (unused.length === 0) {
    answer.push([...used]);
  }

  for (let i = 0; i < unused.length; i++) {
    const leftover = unused.filter((number) => number !== unused[i]);
    used.push(unused[i]);
    permutation(leftover, used, answer);
    used.pop();
  }

  return answer;
};

const result = permutation(input);
console.log(result);

```
