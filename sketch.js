var bgImage, bg2Img;
var compButton, buttonImg;
var gameState=0;
var rock, rockImg, paper, paperImg, scissor, scissorImg;
var singlePlayer, comp;
var compPlayer;
var Pscore=0;
var CompScore= 0;
var button,redButtonImg;
var play;
var database;
var playerCount;
var multiState,multiButton;
var player, game, form;

function preload(){
  bgImage= loadImage("images/bg.png");
  bg2Img= loadImage("images/bg2.jpg")
  buttonImg= loadImage("images/button.png");
  rockImg= loadImage("images/rock.png");
  paperImg= loadImage("images/paper.png")
  scissorImg= loadImage("images/scissors.png")
  redButtonImg= loadImage("images/red button.png")
}
function setup() {
  createCanvas(700,1000);
  
  database= firebase.database();

  compButton= createSprite(120,500, 170, 50);
  compButton.addImage("button", buttonImg);
  compButton.scale=1;

  multiButton= createSprite(520,500, 170, 50);
  multiButton.addImage("button", buttonImg);
  multiButton.scale=1;

  rock= createSprite(100, 870, 50,50);
  rock.addImage("ro", rockImg)
  rock.scale= 0.7;
  rock.visible= false;

  paper= createSprite(350, 870, 50, 50 );
  paper.addImage("pap", paperImg);
  paper.scale=0.7;
  paper.visible= false;

  scissor= createSprite(600, 870, 50, 50);
  scissor.addImage("scis", scissorImg);
  scissor.scale= 0.7;
  scissor.visible= false;


  button= createSprite(630,50, 100, 25);
  button.addImage("ton", buttonImg);
  button.scale= 0.6;
  button.visible= false;

  compPlayer= createSprite(550, 450, 50,50);
  compPlayer.addImage("red", redButtonImg);
  compPlayer.addImage("ro", rockImg);
  compPlayer.addImage("pap", paperImg);
  compPlayer.addImage("scis", scissorImg);
  compPlayer.scale= 1.5;
  compPlayer.visible= false;

  play= createSprite(170, 450, 50, 50);
  play.addImage("red", redButtonImg);
  play.addImage("ro", rockImg);
  play.addImage("pap", paperImg);
  play.addImage("scis", scissorImg);
  play.scale= 1.5;
  play.visible= false;

}

function draw() {
  background(bgImage);  

  if(gameState===0){
  drawSprites();
  textAlign(CENTER);
  stroke("red");
  strokeWeight(7);
  fill("orange");
  textSize(40);
  text("Rock Paper Scissors\nGame", 350, 200);
  textSize(25)
  text("COMPUTER", 120, 510);
  text("MULTIPLAYER", 520, 510);
  }

  if(mousePressedOver(compButton)){
    gameState=1;
    compButton.remove();
    multiButton.remove();
  }

  if(mousePressedOver(multiButton)){
    gameState=3;
    multiState=0;
    compButton.remove();
    multiButton.remove();
  }

  if(gameState===1){
    background(bg2Img);
    drawSprites();
    stroke("red");
    strokeWeight(7);
    fill("orange");
    textAlign(CENTER);
    textSize(35);
    text("Game Starts", 350, 150); 
    text(Pscore, 150, 250 );
    text(CompScore, 550, 250);
    line(350, 250, 350, 700 );
    textSize(17)
    noStroke();
    text("Next Round", 630, 55);
    rock.visible= true;
    paper.visible= true;
    scissor.visible= true;
    button.visible= true;

    game();
    
    if(mousePressedOver(rock)|| mousePressedOver(paper) || mousePressedOver(scissor)){
      //if(play.visible===true){
       var rand= Math.round(random(1,3));
      switch(rand)  {
       case 1: compPlayer.changeImage("ro",rockImg);
       comp= "rock";
        break;
       case 2: compPlayer.changeImage("pap", paperImg);
       comp= "paper";
        break;
       case 3: compPlayer.changeImage("scis", scissorImg);
       comp= "scissor";
        break;
      } 
      compPlayer.visible= true;
    }
   
    if(singlePlayer==="rock"&& comp==="paper"){
      CompScore+=1;
      singlePlayer= null;
      comp= null;
    }
    else if(singlePlayer==="scissor"&& comp==="paper"){
      Pscore+=1;
      singlePlayer= null;
      comp= null;
    }
    else if(singlePlayer==="paper"&& comp==="paper"){
      fill("red");
      textSize(30);
      text("Tie", 350, 220);
      singlePlayer= null;
      comp= null;
    }
    else  if(singlePlayer==="rock"&& comp==="rock"){
      fill("red");
      textSize(30);
      text("Tie", 350, 220);
      singlePlayer= null;
      comp= null;
    }
    else if(singlePlayer==="scissor"&& comp==="rock"){
      CompScore+=1;
      singlePlayer= null;
      comp= null;
    }
    else if(singlePlayer==="paper"&& comp==="rock"){
      Pscore+=1;
      singlePlayer= null;
      comp= null;
    }
    else  if(singlePlayer==="rock"&& comp==="scissor"){
     Pscore+= 1;
     singlePlayer= null;
     comp= null;
    }
    else if(singlePlayer==="scissor"&& comp==="scissor"){
      fill("red");
      textSize(30);
      text("Tie", 350, 220);
      singlePlayer= null;
      comp= null;
    }
    else if(singlePlayer==="paper"&& comp==="scissor"){
      CompScore+=1;
      singlePlayer= null;
      comp= null;
    }

    if(mousePressedOver(button)){
      reset();
    }  
  }

  if(Pscore=== 5||CompScore===5){
    gameState= 2;
    clear();
  }

  if(gameState===2){
    strokeWeight(10);
    stroke("pink");
    fill("purple");
    textAlign(CENTER);
    textSize(40);
    text("Press Ctrl + R to Play Again", 350,500);
    gameState=0;
  }

  if(gameState===3){
    game= new Game();
    game.getState();
    game.start();
  }
}

function reset(){
  rock= createSprite(100, 870, 50,50);
  rock.addImage("ro", rockImg)
  rock.scale= 0.7;
  rock.visible= false;

  paper= createSprite(350, 870, 50, 50 );
  paper.addImage("pap", paperImg);
  paper.scale=0.7;
  paper.visible= false;

  scissor= createSprite(600, 870, 50, 50);
  scissor.addImage("scis", scissorImg);
  scissor.scale= 0.7;
  scissor.visible= false;

  play.visible=false;
  compPlayer.visible= false;
  game();
}

function game(){
  if(mousePressedOver(rock)){
    play.changeImage("ro", rockImg);
    singlePlayer= "rock";
    play.visible=true;
    rock.destroy();
    paper.destroy();
    scissor.destroy();
  }
  if(mousePressedOver(paper)){
    play.changeImage("pap", paperImg);
    singlePlayer= "paper";
    play.visible=true;
    rock.destroy();
    paper.destroy();
    scissor.destroy();
  }
  if(mousePressedOver(scissor)){
    play.changeImage("scis", scissorImg);
    singlePlayer= "scissor";
    play.visible=true;
    rock.destroy();
    paper.destroy();
    scissor.destroy();
  }
}