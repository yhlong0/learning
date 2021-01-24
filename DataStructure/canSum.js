/*
    targetSum = 7
    numbers = [5,3,4,7]
    All numbers in array can only be use once. 

    canSum(targetSum, numbers)
    return true/false
*/

const canSum = (targetSum, numbers) => {
  const result = numbers.map((number) => {
    const newTarget = targetSum - number;
    if (newTarget === 0) {
      return true;
    }
    if (newTarget < 0) {
      return false;
    }
    const newNumbers = numbers.filter((item) => item !== number);
    return canSum(newTarget, newNumbers);
  });
  return result.includes(true);
};

const result = canSum(700, [5, 1, 4, 2]);
console.log("Result", result);

/*
    Numbers in array can be reuse
*/

const canSumReuse = (targetSum, numbers) => {
  if (targetSum === 0) {
    return true;
  }
  if (targetSum < 0) {
    return false;
  }

  for (let num of numbers) {
    const newTarget = targetSum - num;
    if (canSumReuse(newTarget, numbers)) {
      return true;
    }
  }

  return false;
};

const result2 = canSumReuse(300, [7, 14]);
console.log("Result", result2);
