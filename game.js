var array=["red","blue","green","yellow"];
var gamepattern=[];
var userClickedPattern = [];
var started = false;
var level = 0;
$(document).keypress(function(){
    if(!started){
        $("h1").text("Level"+ level);
        nextsequence();
        started=true;
    }
})





$(".btn").click(function(){
    var userchosencolor = $(this).attr("id");
    userClickedPattern.push(userchosencolor);
    playsound(userchosencolor);
    animatepress(userchosencolor);
    checkanswer(userClickedPattern.length-1);
    
    
})




function nextsequence(){
    level++;
    $("h1").text("Level"+" "+level);

var rdn = Math.random();
rdn*=4;

rdn=Math.floor(rdn);
var randomchosencolor= array[rdn];
gamepattern.push(randomchosencolor);
$("#"+randomchosencolor).fadeOut(100).fadeIn(100);
playsound(randomchosencolor);

}

function playsound(name){

    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatepress(currentcolour){
   $("#"+currentcolour).addClass("pressed");
   setTimeout(function(){
    $("#"+currentcolour).removeClass("pressed");
   },100);
}
function checkanswer(currentlevel){
if(gamepattern[currentlevel]==userClickedPattern[currentlevel]){
    console.log("success");
    if(userClickedPattern.length==gamepattern.length){
    setTimeout(function(){
        nextsequence();
    },1000);
    userClickedPattern=[];
    }
}
else{
    console.log("wrong");
    playsound("./sounds/wrong.mp3");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game-Over, Press Any Key to Restart");
    startover();
}

}

function startover(){
    started = false;
    level = 0;
    gamepattern=[];
    userClickedPattern=[];

}