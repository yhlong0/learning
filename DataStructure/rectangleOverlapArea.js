/*

Given multiple rectangles, calculate the overlap area. 

leftTopCorner X : 2
leftTopCorner Y : 6
width: 4
height: 4

[
  [2, 6, 4, 4],
  [4, 4, 6, 3],
  [5, 5, 3, 2]
]
*/


const calculateArea = input => {
  const base = input[0]
  let [xStart, yStart] = base  //2, 6

  let xEnd = xStart + base[2]  //6
  let yEnd = yStart - base[3]  //10
  

  input.slice(1).forEach(target => {
    const [xTargetStart, yTargetStart] = target  //4, 4
    const xTargetEnd = xTargetStart + target[2]  //10
    const yTargetEnd = yTargetStart - target[3]  //7

    xStart = Math.max(xTargetStart, xStart) // 4
    xEnd = Math.min(xTargetEnd, xEnd)       // 6
    yStart = Math.min(yTargetStart, yStart) // 
    yEnd = Math.max(yTargetEnd, yEnd)
    
  })

  const area = Math.abs(xEnd - xStart) * Math.abs(yEnd - yStart)
  
  return area
}

const input = [
  [2, 6, 4, 4],
  [4, 4, 6, 3],
  [5, 5, 3, 2]
]

console.log(calculateArea(input))
