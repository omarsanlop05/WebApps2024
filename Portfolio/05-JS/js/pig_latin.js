/*
Pig Latin
*/

function igpayAtinlay() {
  // TODO: Initialize the word array properly

  str = document.getElementById("txtVal").value;
  var returnArray = [],
    wordArray = str.split(" ");

  // TODO: make sure that the output is being properly built to produce the desired result.
  for (var i = 0; i < wordArray.length; i++) {
    var word = wordArray[i];
    var beginning = word.charAt(0);

    if (/[aeiouAEIOU]/.test(beginning)) {
      returnArray.push(word + "way");
      continue;
    }

    var split = 0;

    for (var ii = 1; ii < word.length; ii++) {
      if (/[aeiouAEIOU]/.test(word.charAt(ii))) {
        split = ii;
        break;
      } else {
        beginning += word.charAt(ii);
      }
    }

    if(split!=0){
      var splittedWord = word.slice(split);
      returnArray.push(splittedWord + beginning + "ay")
    }
    else{
      returnArray.push(word + "ay")
    }
  }

  document.getElementById("pigLatLbl").textContent = returnArray.join(" ");
  //return returnArray.join(" ");
}

// Some examples of expected outputs
console.log(igpayAtinlay("pizza")); // "izzapay"
console.log(igpayAtinlay("apple")); // "appleway"
console.log(igpayAtinlay("happy meal")); // "appyhay ealmay"

