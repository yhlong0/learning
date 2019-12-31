/*           4
*           /
* 0 - 1 - 3 - 5
*   \       /
*     2 - - 
*/


const numberOfNodes = 6;
const graph = [[1, 2], [3, 0], [0, 5], [4, 5, 1], [3], [2, 3]];
let visited = [false, false, false, false, false, false];

function dfs(node) {
  console.log("node:", node);
  if (visited[node]) {
    return;
  }
  visited[node] = true;

  const neighbors = graph[node];
  neighbors.forEach(node => {
    dfs(node);
  });
}

dfs(0);
