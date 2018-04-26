/*-----------splice------------*/

var a = ['a', 'b', 'c', 'd']

//Remove element at index 1.
a.splice(1)

/*    process.argv

$ node processargs.js one two=three four

0: /usr/local / bin / node
1: /Users/mjr / work / node / process - args.js
2: one
3: two = three
4: four

*/
var a = 3;
var b = -2;
var data = 'abcdef';

console.log(a > 0 || b > 0);

var tasks = JSON.parse(data || '[]');


/*-----------forEach------------------*/
var array1 = ['a', 'b', 'c'];

array1.forEach(function (element) {
    console.log(element);
});

// expected output: "a"
// expected output: "b"
// expected output: "c"

/*-----------Array.push()------------------*/
var animals = ['pigs', 'goats', 'sheep'];

console.log(animals.push('cows'));
// expected output: 4

console.log(animals);
// expected output: Array ["pigs", "goats", "sheep", "cows"]