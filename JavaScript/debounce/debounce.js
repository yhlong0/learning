let count = 1;
let container = document.getElementById("container");

function debounce(func, wait) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
}

function getUserAction() {
  container.innerHTML = count++;
}

container.onmousemove = debounce(getUserAction, 1000);
