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

function handleClick(eventParams){
  //Mouse coordinates!
  mouseXpos = eventParams.clientX;
  mouseYpos = eventParams.clientY;

  if(checkBounds(button, eventParams.clientX, eventParams.clientY)){
      //character activate location
      //turns on a switch to enable player object/particle movement
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

var bg = new Image();
bg.src = "art/bg.png";
bg.width = 1280;
bg.height = 720;

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
}

//Show the player what they need to see
function draw(){
  canvas.width = canvas.width;
  //main background
  ctx.drawImage(bg,0,0, canvas.width, canvas.width);
  //water container
  ctx.drawImage(waterCont, canvas.width-waterCont.width, canvas.height-waterCont.height, waterCont.width, waterCont.height);
  //player's base
  //ctx.drawImage(base, canvas.width-base.width-waterCont.width, canvas.height-base.height-waterCont.width, base.width, base.height);
}

function main(){
  update();
  draw();
}

setInterval(main, 300); //(function to repeat, milliseconds)
