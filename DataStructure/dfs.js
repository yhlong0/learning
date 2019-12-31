/*           4
*           /
* 0 - 1 - 3 - 5
*   \       /
*     2 - - 
*
*   6 - 7
* 
*   8
*/


const numberOfNodes = 9;
const graph = [[1, 2], [3, 0], [0, 5], [4, 5, 1], [3], [2, 3], [7], [6], []];
let visited = [false, false, false, false, false, false, false, false, false];
let components = [];
let color = 0;

function dfs(node) {
  console.log("node:", node);
  if (visited[node]) {
    return;
  }
  visited[node] = true;
  components[node] = color;

  const neighbors = graph[node];
  neighbors.forEach(node => {
    dfs(node);
  });
}

function findComponents() {
  visited.forEach((node, index) => {
    if (!node) {
      color++;
      dfs(index);
    }
  });
}

findComponents();
console.log("Components:", components);
