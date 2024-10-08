/*
    Prime Factorization - Have the user enter a number and find
    all Prime Factors (if there are any) and display them.
*/

/*
document.getElementById("btn").addEventListener("click", () => {
  var primes = getPrimeFactors(Number(document.getElementById("num").value));
  document.getElementById("pf").textContent = primes;
});
*/

var getPrimeFactors = function () {
  "use strict";
  var n = Number(document.getElementById("num").value);

  function isPrime(n) {
  var i;

    for (i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        return false;
      }
    }
    return true;
  }

  var i,
    sequence = [];

  //TODO: Check which numbers are factors of n and also check if
  // that number also happens to be a prime
  for (i = 2; i <= n; i++){
    if (isPrime(i) && n % i == 0){
      sequence.push(i);
    }
  }

  document.getElementById("pf").textContent = sequence;
};


// the prime factors for this number are: [ 2, 3, 5, 7, 11, 13 ]
console.log(getPrimeFactors(30030));
