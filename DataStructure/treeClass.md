# JS Tree

```js
class Node {
	constructor(val) {
		this.val = val;
		this.left = null;
		this.right = null;
	}
}

const a = new Node("a");
const b = new Node("b");
const c = new Node("c");
const d = new Node("d");
const e = new Node("e");

a.left = b;
a.right = c;
b.left = d;
b.right = e;

console.log(a);

     a
   /   \
  b     c
 / \
d   e
```
