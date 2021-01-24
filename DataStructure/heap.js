/*

      9
   7     5
 4  2  1  3

 [9, 7, 5, 4, 2, 1, 3]
 [0, 1, 2, 3, 4, 5, 6]

         parentIndex = (n - 2)/2
                |
             index = n
          /           \
 leftChild 2n + 1    rightChild 2n + 2
 

*/

let maxHeap = [];

const insertItem = (number) => {
  maxHeap.push(number);
  const newItemIndex = maxHeap.length - 1;
  bubbleUp(newItemIndex);
};

const deleteItem = () => {
  //replace the first item with last item
  maxHeap[0] = maxHeap[maxHeap.length - 1];
  maxHeap.length = maxHeap.length - 1;
  bubbleDown(0);
};

const bubbleUp = (childIndex) => {
  if (childIndex === 0) {
    return;
  }

  const newItem = maxHeap[childIndex];
  const parentIndex = getParentIndex(childIndex);
  const parent = maxHeap[parentIndex];
  //It is a maxHeap now.
  if (parent > newItem) {
    return;
  }
  //Not maxHeap, switch parent and child
  const temp = parent;
  maxHeap[parentIndex] = newItem;
  maxHeap[childIndex] = temp;
  bubbleUp(parentIndex);
};

const bubbleDown = (parentIndex) => {
  const parent = maxHeap[parentIndex];

  const leftChildIndex = 2 * parentIndex + 1;
  const leftChild = maxHeap[leftChildIndex];

  const rightChildIndex = 2 * parentIndex + 2;
  const rightChild = maxHeap[rightChildIndex];

  //No child node
  if (leftChild === undefined && rightChild === undefined) {
    return;
  }
  //It is maxHeap now
  if (parent > leftChild && parent > rightChild) {
    return;
  }

  if (rightChild === undefined && parent > leftChild) {
    return;
  }

  //Left child node bigger than parent, swap and bubble down
  if (rightChild === undefined && parent < leftChild) {
    const temp = parent;
    maxHeap[parentIndex] = leftChild;
    maxHeap[leftChildIndex] = temp;
    bubbleDown(leftChildIndex);
    return;
  }

  //Find max between left and right child
  if (leftChild > rightChild) {
    const temp = parent;
    maxHeap[parentIndex] = leftChild;
    maxHeap[leftChildIndex] = temp;
    bubbleDown(leftChildIndex);
  } else {
    const temp = parent;
    maxHeap[parentIndex] = rightChild;
    maxHeap[rightChildIndex] = temp;
    bubbleDown(rightChildIndex);
  }
  return;
};

const getParentIndex = (index) => {
  if (index === 0 || index === 1) {
    return 0;
  } else {
    return Math.ceil((index - 2) / 2);
  }
};

insertItem(3);
insertItem(1);
insertItem(2);
insertItem(10);
insertItem(4);
insertItem(5);
console.log(maxHeap);
deleteItem();
deleteItem();
console.log(maxHeap);
