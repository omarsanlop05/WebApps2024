/*
    Sieve of Eratosthenes - The sieve of Eratosthenes is one of the most efficient ways
    to find all of the smaller primes (below 10 million or so).
*/

// TODO: Adjust this script so it can work with the sieve.html file.

document.getElementById("btn").addEventListener("click", () =>{
  var prime = sieve(Number(document.getElementById("num").value));
  document.getElementById("primes").textContent = prime.join(", ");
});

var sieve = function (n) {
  "use strict";

  var array = [],
    primes = [],
    i,
    j;

  // TODO: Implement the sieve of eratosthenes algorithm to find all the prime numbers under the given number.

  for(i = 0; i <= n; i++){
    array[i] = true;
  }

  array[0] = false;
  array[1] = false;

  for(j = 2; j*j <= n; j++){
    if(array[j]){
      for(i = j*j; i <= n; i += j){
        array[i] = false;
      }
    }
  }

  for(i = 2; i <= n; i++){
    if(array[i]){
      primes.push(i)
    }
  }

  return primes;
};

console.log(sieve(1000000));
