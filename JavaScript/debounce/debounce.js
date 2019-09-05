let count = 1;
let container = document.getElementById("container");

function debounce(func, wait) {
  let timeout;
  return function() {
    const context = this;
    //The arguments that passed to this function, in this case is mouseEvent
    console.log("arguments:", arguments);
    const args = arguments;

    clearTimeout(timeout);
    timeout = setTimeout(function() {
      func.apply(context, args);
    }, wait);
  };
}

function getUserAction(e) {
  console.log("Event", e);
  console.log("This:", this);
  container.innerHTML = count++;
}

container.onmousemove = debounce(getUserAction, 1000);
// container.onmousemove = getUserAction;
