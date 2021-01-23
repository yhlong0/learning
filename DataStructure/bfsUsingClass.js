class Node {
  constructor(value, left, right) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

const n4 = new Node(4, null, null);
const n5 = new Node(5, null, null);
const n6 = new Node(6, null, null);
const n7 = new Node(7, null, null);
const n2 = new Node(2, n4, n5);
const n3 = new Node(3, n6, n7);
const n1 = new Node(1, n2, n3);

/*

      n1
    n2   n3
n4   n5  n6  n7

*/

const bfs = (tree) => {
  //   console.log("tree", tree);
  let queue = [];
  queue.push(tree);

  while (queue.length !== 0) {
    const node = queue.shift();
    console.log("Node: ", node);

    if (node.left !== null) {
      queue.push(node.left);
    }

    if (node.right !== null) {
      queue.push(node.right);
    }
  }
};
bfs(n1);

const bfsFoundValue = (tree, target) => {
  //   console.log("tree", tree);
  //   console.log("target", target);
  let queue = [];
  queue.push(tree);

  while (queue.length !== 0) {
    const node = queue.shift();

    if (node.value === target) {
      return target;
    }

    if (node.left !== null) {
      queue.push(node.left);
    }
    if (node.right !== null) {
      queue.push(node.right);
    }
  }

  return "Not Found";
};

const result = bfsFoundValue(n1, 3);
console.log("result", result);
