/* 
* What is a closure?
* A closure is a feature in JavaScript where an inner function 
* has access to the outer (enclosing) function’s variables — a scope chain.
*/


function outer() {
   const b = 10;
  
   function inner() {
         const a = 20; 
         console.log(a+b);
    }
  return inner;
}

/*
* inner() is able to access var b, what interest is when you return inner
*/

const out = outer()

// out === function inner() {....}

out()

//will print 30


const debounce = function (fn, delayTime) {
   let timeId;
   
   return function() {
      let context = this,
      let args = arguments;
      
      timeId && clearTimeout(timeout);
      timeId = setTimeout(function {
         fn.apply(context, args);
      }, delayTime)
   }
}



