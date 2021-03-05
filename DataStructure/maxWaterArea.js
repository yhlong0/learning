const heights = [1, 6, 1, 1, 6, 1];

const area = (heights, left, right) => {
  const height = Math.min(heights[left], heights[right]);
  const width = right - left;
  return height * width;
};

const getMaxArea = (heights) => {
  let left = 0;
  let right = heights.length - 1;
  let maxArea = area(heights, left, right);

  while (left !== right) {
    maxArea = Math.max(maxArea, area(heights, left, right));
    if (heights[right] > heights[left]) {
      left = left + 1;
    } else {
      right = right - 1;
    }
  }

  return maxArea;
};

console.log("result: ", getMaxArea(heights));
