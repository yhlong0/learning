/*            4
 *           /
 * 0 - 1 - 3 - 5
 *   \        /
 *     2 - -
 *
 *   6 - 7
 *
 *   8
 */

const numberOfNodes = 9;
const graph = [[1, 2], [3, 0], [0, 5], [4, 5, 1], [3], [2, 3], [7], [6], []];

function bfs(start) {
  let queue = [];
  queue.push(start);

  let visited = Array(numberOfNodes).fill(false);
  visited[start] = true;

  let parentNode = Array(numberOfNodes).fill(null);

  while (queue.length !== 0) {
    const node = queue.shift();
    console.log(node);
    const neighbors = graph[node];

    neighbors.forEach(nextNode => {
      if (!visited[nextNode]) {
        queue.push(nextNode);
        visited[nextNode] = true;
        parentNode[nextNode] = node;
      }
    });
  }
  console.log("parentNode:", parentNode);
  //parentNode: [ null, 0, 0, 1, 3, 2, null, null, null ]
  return parentNode;
}

const walkSequence = bfs(0);

//Show the discovery path.
const endNode = 3;

let path = [endNode];
let steps = 1;
let parentNode = walkSequence[endNode];

while (parentNode !== null) {
  path.push(parentNode);
  parentNode = walkSequence[parentNode];
  steps++;
}

console.log("Path:", path.reverse());  //Path: [ 0, 1, 3 ]
console.log("Steps:", steps);  //Steps: 3



