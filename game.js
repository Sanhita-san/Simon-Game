var gamePattern= [];
var userClickedPattern= [];
var buttonColours=["red","blue","green","yellow"];

var level=0;
var started = false;

$("html").on("keypress",function(){
	if(!started){
	nextSequence();
 	started = true;
 	}
	});

$(".btn").on("click",handler);


function nextSequence(){
	
	userClickedPattern=[];
	level = level+1;
	$("h1").html("Level "+level);
	var randomNumber= Math.floor(Math.random()*4);
	var randomChosenColour= buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);
	var colorSelector="#"+randomChosenColour;
	$(colorSelector).fadeOut(100).fadeIn(100);
	playSound(randomChosenColour);

}

function handler(){
	var userChosenColour= $(this).attr("id");
	userClickedPattern.push(userChosenColour);
	$(this).fadeOut(100).fadeIn(100);
	playSound(userChosenColour);
	animatePress(userChosenColour);
	checkAnswer(userClickedPattern.length);
}

function playSound(name){
	var audioColorSelector="sounds/"+name+".mp3";
	var audio = new Audio(audioColorSelector);
	audio.play();
}

function animatePress(currentColor){
	var color = "#"+currentColor;
	$(color).addClass("pressed");
	setTimeout(() => {  $(color).removeClass("pressed") }, 200);
}

function checkAnswer(currentLevel){
	if(gamePattern[currentLevel-1]===userClickedPattern[currentLevel-1]){
		console.log("success")
		if (currentLevel==gamePattern.length) {
    	setTimeout(() => { nextSequence() }, 1000);
    	}
	}
	else{
		gameOver();
		startOver();
	}    
}

function gameOver(){
	playSound("wrong");
	$("body").addClass("game-over");
	setTimeout(() => {  $("body").removeClass("game-over") }, 200);
	$("h1").html("Game Over, Press Any Key to Restart");
}

function startOver(){
	gamePattern= [];
	level=0;
	started = false;
}