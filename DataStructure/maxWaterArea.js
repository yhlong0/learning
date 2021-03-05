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
    if (heights[right] > heights[left]) {
      left = left + 1;
      const newArea = area(heights, left, right);
      if (newArea > maxArea) {
        maxArea = newArea;
      }
    } else {
      right = right - 1;
      const newArea = area(heights, left, right);
      if (newArea > maxArea) {
        maxArea = newArea;
      }
    }
  }

  return maxArea;
};

console.log("result: ", getMaxArea(heights));
