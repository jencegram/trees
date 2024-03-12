/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    const minDepthHelper = (node) => {
      if (node === null) return 0;
      if (node.left === null && node.right === null) return 1;
      if (!node.left) return 1 + minDepthHelper(node.right);
      if (!node.right) return 1 + minDepthHelper(node.left);
      return 1 + Math.min(minDepthHelper(node.left), minDepthHelper(node.right));
    };

    return minDepthHelper(this.root);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    const maxDepthHelper = (node) => {
      if (node === null) return 0;
      return 1 + Math.max(maxDepthHelper(node.left), maxDepthHelper(node.right));
    };

    return maxDepthHelper(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let globalMaxSum = -Infinity;

    const maxSumHelper = (node) => {
      if (node === null) return 0;
      const leftSum = Math.max(0, maxSumHelper(node.left));
      const rightSum = Math.max(0, maxSumHelper(node.right));
      globalMaxSum = Math.max(globalMaxSum, node.val + leftSum + rightSum);
      return node.val + Math.max(leftSum, rightSum);
    };

    maxSumHelper(this.root);
    return globalMaxSum !== -Infinity ? globalMaxSum : 0;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    let result = Infinity;

    const nextLargerHelper = (node) => {
      if (node === null) return;
      if (node.val > lowerBound) result = Math.min(result, node.val);
      nextLargerHelper(node.left);
      nextLargerHelper(node.right);
    };

    nextLargerHelper(this.root);
    return result === Infinity ? null : result;
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
