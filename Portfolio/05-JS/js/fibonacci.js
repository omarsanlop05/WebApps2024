/*
    Fibonacci Sequence - Enter a number and have the program
    generate the Fibonacci sequence to that number or to the Nth number.
*/
// This array will keep memory of the previous fibonacci numbers
var memo = {};

/*
document.getElementById("btn").addEventListener("click", () => {
  var num = fibonacci();
  document.getElementById("fibonacciLbl").textContent = "Fibonacci number: " + num;
});
*/

function fibonacci() {
  "use strict";
  var n = document.getElementById("num").value;
  var val = f(n);
  //return val;
  document.getElementById("fibonacciLbl").textContent = "Fibonacci number: " + val;
};

function f(n) {
  var value;
  // Check if the memory array already contains the requested number
  if (memo.hasOwnProperty(n)) {
    value = memo[n];
  } else {
    //TODO: Implement the fibonacci function here!
    if (n <= 1){
      value = n;
    }
    else{
      value = f(n-1) + f(n-2);
    }
    memo[n] = value;
  }

  return value;
};

console.log(fibonacci());
