1. Find possible words

Given a M x N board of letters and a dictionary of words. Find all possible words that can be formed by a sequentially adjacent cells.
You can only use either vertically or horizontally neighboring cells in a sequence.
A word should not have multiple instances of a cell.

Example:

```
Input dictionary : [CAT, HAPPY, AMAZON, TAIL]

Input Board :
C C N F
T A I H
Y P L A
F F P P

Output: [CAT, TAIL]

```

Solution: 
```js

const dictionary = ["CAT", "HAPPY", "AMAZON", "TAIL", "XX"];

const board = [
  ["C", "C", "N", "F"],
  ["T", "A", "I", "H"],
  ["Y", "P", "L", "A"],
  ["F", "F", "P", "P"],
];

const fullScan = (char) => {
  let locations = [];

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === char) {
        locations.push([i, j]);
      }
    }
  }

  return locations;
};

const adjacentScan = (chars, startPoint, visited) => {
  if (chars.length === 0) {
    return true;
  }

  if (visited[startPoint[0]][startPoint[1]]) {
    return false;
  }

  visited[startPoint[0]][startPoint[1]] = true;

  let results = [];
  const restChars = chars.slice(1);
  const locations = availableLocations(startPoint);

  locations.forEach((location) => {
    if (chars[0] === board[location[0]][location[1]]) {
      results.push(adjacentScan(restChars, location, visited));
    } else {
      results.push(false);
    }
  });

  return result.includes(true);
};

const availableLocations = (location) => {
  const north = validateLocation([startPoint[0] - 1, startPoint[1]]);
  const south = validateLocation([startPoint[0] + 1, startPoint[1]]);
  const east = validateLocation([startPoint[0] + 1, startPoint[1] - 1]);
  const west = validateLocation([startPoint[0] + 1, startPoint[1] + 1]);
  return locations;
};

const findWord = (dictionary) => {
  let foundWords = [];

  dictionary.forEach((word) => {
    const target = word.split("");
    const firstChar = target[0];
    const restChars = target.slice(1);

    const locations = fullScan(firstChar);

    if (locations.length > 0) {
      locations.forEach((location) => {
        let visited = [
          [false, false, false, false],
          [false, false, false, false],
          [false, false, false, false],
          [false, false, false, false],
        ];

        const finalResult = adjacentScan(restChars, location, visited);
        if (finalResult) {
          foundWords.push(word);
        }
      });
    }
  });

  return [...new Set(foundWords)];
};

const result = findWord(dictionary);

console.log(result);


```

2. Find locker

Giving a package s/m/l, find a open locker can fit. A locker has s/m/l and small package can be fit in large locker.





3. Calculate the median of stream latency. 

A stream of latencies, create a function to add new latency to stream, max stream size is 10000, and need a function calculate the median of the latency. 
