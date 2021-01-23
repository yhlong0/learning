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

const dfs = (tree) => {
  console.log(tree.value);
  if (tree.left !== null) {
    dfs(tree.left);
  }
  if (tree.right !== null) {
    dfs(tree.right);
  }
};
dfs(n1);

const dfsFindTarget = (tree, target) => {
  let result = false;
  let leftResult = false;
  let rightResult = false;

  if (tree.value === target) {
    result = true;
  }
  if (tree.left !== null) {
    leftResult = dfsFindTarget(tree.left, target);
  }
  if (tree.right !== null) {
    rightResult = dfsFindTarget(tree.right, target);
  }

  const finalResult = [result, leftResult, rightResult].includes(true);

  return finalResult;
};

const result = dfsFindTarget(n1, 9);
console.log("Final Result: ", result);
