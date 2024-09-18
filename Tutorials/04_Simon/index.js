
var color = ["red", "blue", "green", "yellow"];

var pattern = [];
var userPattern = [];

var level = 0;
var started = false;

$(".btn").click(function(){

  //nextSequence();

  var selectedButton = $(this).attr("id");
  userPattern.push(selectedButton);

  sound(selectedButton);
  animatePress(selectedButton);

  checkAnswer(userPattern.length-1);
});

$(document).keypress(function() {
  if(started!=true){
    nextSequence();
    started = true;
  }
});


function checkAnswer(index){
  if(userPattern[index] == pattern[index]){
    if(userPattern.length == pattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else{
    sound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart")

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    restart();
  }
}


function nextSequence(){
  userPattern = []

  level++;
  $("#level-title").text("Level " + level);
  var num = Math.floor(Math.random()*4);

  var selectedColor = color[num];
  pattern.push(selectedColor);

  $("#"+selectedColor).fadeOut(100).fadeIn(100);

  sound(selectedColor);
}


function sound(color){
  var sound = new Audio("sounds/"+color+".mp3")
  sound.play();
}


function animatePress(button){
  $("#" + button).addClass("pressed");
  
  setTimeout(function() {
      $("#" + button).removeClass("pressed");
  }, 100)
}

function restart(){
  level = 0;
  pattern = [];
  started = false;
}