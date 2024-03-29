let heap = [2,3,4,10,1];

function getLeftChildIndex(parentIndex) {
    return parentIndex + 1;
}

function getRightChildIndex(parentIndex) {
    return parentIndex + 2;
}

function getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
}

function hasLeftChild(index) {
    return getLeftChildIndex(index) < heap.length;
}


function hasRightChild(index) {
    return getRightChildIndex(index) < heap.length;
}

function hasParent(index) {
    return getParentIndex(index) >= 0;
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

function swap(indexOne, indexTwo) {
    let temp = heap[indexOne];
    heap[indexOne] = heap[indexTwo];
    heap[indexTwo] = temp;
}

function poll() {
    let heap = heap[0];
    heap[0] = heap[heap.length - 1];
    heap.pop();
    heapifyDown();
    return heap;
}

function add(item) {
    heap.push(item)
    heapifyUp();
    return heap;
}

function heapifyUp() {
    let index = heap.length - 1;
    console.log(parent(index));
    while (hasParent(index) && (parent(index) > heap[index])) {
        swap(getParentIndex(index), index)
        index = getParentIndex(index);
    } 
}

function heapifyDown() {
    let index = 0;
    let smallerChildIndex;

    while (hasLeftChild(index)) {
        smallerChildIndex = getLeftChildIndex(index);
        if(hasRightChild(index) && rightChild(index) < leftChild(index)) {
            smallerChildIndex = getRightChildIndex(index);
        }

        if(heap[index] < heap[smallerChildIndex]) {
            break;
        } else {
            swap(index, smallerChildIndex);
        }

        index = smallerChildIndex;
    }
}

heapifyUp();
console.log(heap);