/*
Initiate canvas
*/
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

/*
Input Section
*/
//Using this method while I educate myself on Jquery
canvas.addEventListener("click", handleClick);//when click happens call handleClick
var mouseXpos;
var mouseYpos;

//button is the object we specificy
function handleClick(eventParams){
  //Mouse coordinates!
  mouseXpos = eventParams.clientX;
  mouseYpos = eventParams.clientY;

  if(checkBounds(pMelee, eventParams.clientX, eventParams.clientY)){
      //character activate location
      //turns on a switch to enable player object/particle movement
      pMelee.Y = canvas.height-waterCont.height-50;
      pMelee.act=true;
  }

  if (checkBounds(pRanged, eventParams.clientX, eventParams.clientY)){
      //character activate location
      //turns on a switch to enable player object/particle movement
      pRanged.Y = canvas.height-waterCont.height-50;
      pRanged.act=true;
  }

}

//checkboundsfunction for handleclick
function checkBounds(button, clickX, clickY){
	if(((button.width+button.X)>=(clickX)&&(clickX)>=(button.X))&&((button.height+button.Y)>=(clickY)&&(clickY)>=(button.Y))){
  	return true;
  }else{
  	return false;
  }
}

/* Image variables */
//bg image and properties
var waterCont = new Image();
waterCont.src = "art/waterCont.png";
waterCont.width = 100;
waterCont.height = 130;

//background
var bg = new Image();
bg.src = "art/bg.png";

//Named as playerMelee
var pMelee = new Image();
pMelee.src = "art/square.png";
pMelee.width = 100;
pMelee.height = 150;
pMelee.X = 1000;
pMelee.Y = 10;
pMelee.act = false;

//player ranged
var pRanged = new Image();
pRanged.src = "art/ranged.png";
pRanged.width = 100;
pRanged.height = 150;
pRanged.X = 1000 + pRanged.width;
pRanged.Y = pMelee.Y;
pRanged.act = false;

//base image and properties
/*
var base = new Image();
base.src = "art/build.png";
base.width= 400;
base.height= 250;
*/

/*
Main game loop stuff
*/

//Should call stuff from the working.js to grab functions that calculate damage and resource.
function update(){
  checkCollision();
  takeWater();

  //unit movement
  if (pMelee.act){
    pMelee.X-=5;
  }

  if (pRanged.act && pRanged.X > 700){
    pRanged.X-=5;
  }
}

//Show the player what they need to see
function draw(){
  canvas.width = canvas.width;

  //main background
  ctx.drawImage(bg,0,0, canvas.width, canvas.height);

  //text
  ctx.font="20px Georgia";
  ctx.fillStyle="black";
  ctx.fillText(mouseXpos, 100, 200);
  ctx.fillText(mouseYpos, 400, 200);

  //summon melee
  ctx.drawImage(pMelee, pMelee.X, pMelee.Y, pMelee.width, pMelee.height);

  //summon ranged
  ctx.drawImage(pRanged, pRanged.X, pRanged.Y, pRanged.width, pRanged.height);

  //water container
  ctx.drawImage(waterCont, canvas.width-waterCont.width, canvas.height-waterCont.height-20, waterCont.width, waterCont.height);

  //player's base
  //ctx.drawImage(base, canvas.width-base.width-waterCont.width, canvas.height-base.height-waterCont.width, base.width, base.height);
}

function main(){
  update();
  draw();
}

setInterval(main, 300); //(function to repeat, milliseconds)
