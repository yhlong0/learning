let count = 1;
let container = document.getElementById("container");

function debounce(func, wait) {
  let timeout;
  return function() {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      func.apply(context);
    }, wait);
  };
}

function getUserAction() {
  console.log("This:", this);
  container.innerHTML = count++;
}

container.onmousemove = debounce(getUserAction, 1000);
// container.onmousemove = getUserAction;
