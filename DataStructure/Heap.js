let heap = [];

function getLeftChildIndex(parentIndex) {
    return parentIndex + 1;
}

function getRightChildIndex(parentIndex) {
    return parentIndex + 2;
}

function getParentIndex(childIndex) {
    return (childIndex - 1) / 2;
}

function hasLeftChild(index) {
    return getLeftChildIndex(index) < heap.length;
}


function hasRightChild(index) {
    return getRightChildIndex(index) < heap.length;
}


function leftChild(index) {
    return heap[getLeftChildIndex(index)];
}


function rightChild(index) {
    return heap[getRightChildIndex(index)];
}


function parent(index) {
    return heap[getParentIndex(index)];
}