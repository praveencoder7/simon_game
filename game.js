var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level=0;
var started=false;

$(document).on("keypress",function (){
    if(!started){
        nextSequence();
        started=true;
    }
});

$(".btn").on("click",function (){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        playSound("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        startOver();
    }
}

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChoseColour = buttonColours[randomNumber];
    gamePattern.push(randomChoseColour);
    $("#"+randomChoseColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoseColour);
}



function playSound(colour){
    var audio = new Audio("./sounds/"+colour+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function (){
        $("#"+currentColour).removeClass("pressed")
    },100);
}



function startOver()
{
    gamePattern=[];
    level=0;
    started=false;
}