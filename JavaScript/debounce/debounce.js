let count = 1;
let container = document.getElementById("container");

function debounce(func, wait) {
  let timeout, result;
  let debounced = function() {
    const context = this;
    //The arguments that passed to this function, in this case is mouseEvent
    console.log("arguments:", arguments);
    const args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      let callNow = !timeout;
      timeout = setTimeout(function() {
        timeout = null;
      }, wait)
      if (callNow) result = func.apply(context, args)
    } else {
        timeout = setTimeout(function() {
          func.apply(context, args);
        }, wait);
    }
    return result;
  };
  
  debounced.cancel = function() {
    clearTimeout(timeout);
    timeout = null;
  };
  
  return debounced;
}

function getUserAction(e) {
  console.log("Event", e);
  console.log("This:", this);
  container.innerHTML = count++;
}

const setUserAction = debounce(getUserAction, 10000, true);
container.onmousemove = setUserAction;
document.getElementById("button").addEventListener('click', function() {
  setUseAction.cancel();
})
// container.onmousemove = getUserAction;
