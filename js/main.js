/*
Initiate canvas
*/
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

/*
Input Section
*/

/* Image variables */

//bg image and properties
var bg = new Image();
bg.src = "art/bg.png";

//base image and properties
var floor = new Image();
floor.src = "art/build.png";
floor.width= 400;
floor.height= 250;

/*
Main game loop stuff
*/

//Should call stuff from the working.js to grab functions that calculate damage and resource.
function update(){

}


//Show the player what they need to see
function draw(){
  canvas.width = canvas.width;
  ctx.drawImage(bg,0,0, canvas.width, canvas.width); //main background
  ctx.drawImage(floor, canvas.width-floor.width, canvas.height-floor.height, floor.width, floor.height); //building
}

function main(){
  update();
  draw();
}

setInterval(main, 300); //(function to repeat, milliseconds)
