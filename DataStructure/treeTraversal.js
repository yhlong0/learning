/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
 
const preorderTraversal = (root) => {
    if(root === null || root.val === undefined) {
        return []
    }
    return [root.val, ...preorderTraversal(root.left), ...preorderTraversal(root.right)]
};

const preorderTraversalIteratively = (root) => {
    if(root === null || root.val === undefined) {
        return []
    }
    
    let result = []
    let stack = [root]

    while(stack.length > 0) {
        const node = stack.pop()
        result.push(node.val)
        if(node.right !== null) {
            stack.push(node.right)
        }
        if(node.left !== null) {
            stack.push(node.left)
        }
    }
    
    return result
};

const inorderTraversal = (root) => {
    if(root === null || root.val === undefined) {
        return []
    }
    return [ ...inorderTraversal(root.left), root.val, ...inorderTraversal(root.right)]
};

const postorderTraversal = (root) => {
    if(root === null || root.val === undefined) {
        return []
    }
    return [ ...postorderTraversal(root.left), ...postorderTraversal(root.right), root.val]
};

