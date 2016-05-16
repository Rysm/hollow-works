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
      eMelee.Y = canvas.height-waterCont.height-50;
      eRanged.Y = canvas.height-waterCont.height-50;
      pMelee.act=true;
      eMelee.act = true;
      eRanged.act = true;

  }

  if (checkBounds(pRanged, eventParams.clientX, eventParams.clientY)){
      //character activate location
      //turns on a switch to enable player object/particle movement
      pRanged.Y = canvas.height-waterCont.height-50;
      eMelee.Y = canvas.height-waterCont.height-50;
      eRanged.Y = canvas.height-waterCont.height-50;
      pRanged.act=true;
      eMelee.act = true;
      eRanged.act = true;
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
pMelee.dead = false;

//player ranged
var pRanged = new Image();
pRanged.src = "art/ranged.png";
pRanged.width = 100;
pRanged.height = 150;
pRanged.X = 1000 + pRanged.width;
pRanged.Y = pMelee.Y;
pRanged.act = false;
pRanged.dead = false;
pRanged.createBullet = function() {
    return new Bullet(pRanged, eMelee, eRanged, 20, 10, 12);
}

var eMelee = new Image();
eMelee.src = "art/square.png";
eMelee.width = 100;
eMelee.height = 150;
eMelee.X = 110;
eMelee.Y = 10;
eMelee.act = false;
eMelee.dead = false;

//enemy ranged
var eRanged = new Image();
eRanged.src = "art/ranged.png";
eRanged.width = 100;
eRanged.height = 150;
eRanged.X = 0;
eRanged.Y = eMelee.Y;
eRanged.act = false;
eRanged.dead = false;
eRanged.createBullet = function() {
    return new Bullet(eRanged, pMelee, pRanged, 20, 10, 7);
}

//bullet
function Bullet(from, enemy, enemy2, width, height, xSpeed) {
    this.x = from.X + from.width/2;
    this.y = from.Y + from.height/2;
    this.width = width;
    this.height = height;
    this.xSpeed = xSpeed;
    var bulletImg = new Image();
    bulletImg.src = "art/arrow.png";

    this.draw = function() {
        ctx.drawImage(bulletImg, this.x, this.y, this.width, this.height);
    };

    this.reset = function() {
        this.x = from.X + from.width/2;
        this.y = from.Y + from.height/2;
        this.width = 20;
        this.height = 10;
    };

    this.update = function() {
        if (this.x < 0 || this.x < enemy.X + enemy.width ||
            this.x < enemy2.X + enemy2.width) {
            this.x = from.X + from.width / 2;
            this.y = from.Y + from.height / 2;
        } else {
            this.x -= this.xSpeed;
        }
    };
}

//var bullet = new Bullet(pRanged, eRanged, 20, 10, 12, '#ffff99');

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
var pArrow = pRanged.createBullet();
var eArrow = eRanged.createBullet();
function update(){

  if (pRanged.act){
    pArrow.update();
  }
    eArrow.update();

  takeWater();

  //friendly unit movement
  if (pMelee.act && pMelee.dead == false){
    pMelee.X-=5;
  }

  if (pRanged.act && pRanged.X > 700 && pRanged.dead == false){
    pRanged.X-=5;
  }

  //enemy unit movement
  if (eMelee.act && eMelee.dead == false){
    eMelee.X+=5;
  }

  if (eRanged.act && eRanged.X < 400 && eRanged.dead == false){
    eRanged.X+=5;
  }

  //combat
  //checkCombat (friendly, enemy)
  if (pMelee.act && eRanged.act){
    checkCombat(pMelee, eRanged); //melee vs ranged
  }
  if (pMelee.act && eMelee.act){
    checkCombat(pMelee, eMelee); //melee vs melee
  }
  if (pRanged.act && eMelee.act){
    checkCombat(pMelee, eRanged); //ranged vs melee
  }
  if (pRanged.act && eRanged.act){
    checkCombat(pRanged, eRanged); //ranged vs ranged
  }
}

//Show the player what they need to see
function draw(){

  canvas.width = canvas.width;

  //main background
  ctx.drawImage(bg,0,0, canvas.width, canvas.height);

  if (pRanged.act){
    pArrow.draw();
  }
  eArrow.draw();

  //text
  ctx.font="20px Georgia";
  ctx.fillStyle="black";
  ctx.fillText(mouseXpos, 100, 200);
  ctx.fillText(mouseYpos, 400, 200);

  //summon melee
  ctx.drawImage(pMelee, pMelee.X, pMelee.Y, pMelee.width, pMelee.height);

  //summon ranged
  ctx.drawImage(pRanged, pRanged.X, pRanged.Y, pRanged.width, pRanged.height);

  //summon enemy melee
  if (eMelee.act){
    ctx.drawImage(eMelee, eMelee.X, eMelee.Y, eMelee.width, eMelee.height);
  }

  //summon enemy ranged
  if(eRanged.act){
    ctx.drawImage(eRanged, eRanged.X, eRanged.Y, eRanged.width, eRanged.height);
  }

  //water container
  ctx.drawImage(waterCont, canvas.width-waterCont.width, canvas.height-waterCont.height-20, waterCont.width, waterCont.height);

  //player's base
  //ctx.drawImage(base, canvas.width-base.width-waterCont.width, canvas.height-base.height-waterCont.width, base.width, base.height);
}

function main(){
  update();
  draw();
}

setInterval(main, 30); //(function to repeat, milliseconds)
