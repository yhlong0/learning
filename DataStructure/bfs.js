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

  while (queue.length !== 0) {
    const node = queue.shift();
    console.log(node);
    const neighbors = graph[node];

    neighbors.forEach(node => {
      if (!visited[node]) {
        queue.push(node);
        visited[node] = true;
      }
    });
  }
}

bfs(0);
