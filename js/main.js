
/*
Initiate canvas
*/
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

/*
Game Menu
*/


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
waterCont.X = canvas.width-waterCont.width;
waterCont.Y = canvas.height-waterCont.height-20;

//background
var bg = new Image();
bg.src = "art/bg.png";

//water icon
var waterIcon = new Image();
waterIcon.src = "art/water icon.png";
waterIcon.width = 100;
waterIcon.height = 100;
waterIcon.X = 75;
waterIcon.Y = 25;


//Named as playerMelee
var pMelee = new Image();
pMelee.src = "art/allymeleeF.png";
pMelee.name = "pMelee";
pMelee.health = 100;
pMelee.dmg = 30;
pMelee.width = 80;
pMelee.height = 160;
pMelee.X = 1000;
pMelee.Y = 10;
pMelee.act = false;
pMelee.dead = false;

//player ranged
var pRanged = new Image();
pRanged.src = "art/allyrangeM.png";
pRanged.name = "pRanged";
pRanged.width = 90;
pRanged.height = 160;
pRanged.X = 1000 + pRanged.width;
pRanged.Y = pMelee.Y;
pRanged.act = false;
pRanged.dead = false;
pRanged.createBullet = function() {
    return new Bullet(pRanged, eMelee, eRanged, 80, 20, 12);
}

var eMelee = new Image();
eMelee.name = "eMelee";
eMelee.src = "art/badmeleeF.png";
eMelee.width = 80;
eMelee.height = 160;
eMelee.X = 110;
eMelee.Y = canvas.height-waterCont.height-50;
eMelee.act = true;
eMelee.dead = false;

//enemy ranged
var eRanged = new Image();
eRanged.name = "eRanged";
eRanged.src = "art/badrangeF.png";
eRanged.width = 90;
eRanged.height = 160;
eRanged.X = 0;
eRanged.Y = canvas.height-waterCont.height-50;
eRanged.act = true;
eRanged.dead = false;
eRanged.createBullet = function() {
    return new Bullet(eRanged, pMelee, pRanged, 80, 20, -7);
}

//Water bar
var waterbar = new Image();
waterbar.src = "art/bar.png";
waterbar.X = 0;
waterbar.Y = 0;

//bullet
function Bullet(from, enemy, enemy2, width, height, xSpeed) {

    this.x = from.X + from.width/2;
    this.y = from.Y + from.height/2;
    this.width = width;
    this.height = height;
    this.xSpeed = xSpeed;

    if (from == pRanged){
      var bulletImg = new Image();
      bulletImg.src = "art/arrow.png";
    }
    if (from == eRanged){
      var bulletImg = new Image();
      bulletImg.src = "art/fliprow.png";
    }

    this.draw = function() {
        ctx.drawImage(bulletImg, this.x, this.y, this.width, this.height);
    };

    this.reset = function() {
        this.x = from.X + from.width/2;
        this.y = from.Y + from.height/2;
        this.width = width;
        this.height = height;
    };

    this.update = function() {
      //if fired from friendly unit
      if (from == pRanged){
        if (this.x < 0 || this.x < enemy.X + enemy.width ||
            this.x < enemy2.X + enemy2.width) {
            this.x = from.X + from.width / 2;
            this.y = from.Y + from.height / 2;
        }
        else {
            this.x -= this.xSpeed;
        }
      }
      //if fired from hostile enemy
      if (from == eRanged){
        if (this.x > canvas.width || this.x > enemy.X+ enemy.width ||
            this.x > enemy2.X+enemy2.width) {
            this.x = from.X + from.width / 2;
            this.y = from.Y + from.height / 2;
        }
        else {
            this.x -= this.xSpeed;
        }
      }

    };
}

//Should call stuff from the working.js to grab functions that calculate damage and resource.
var pArrow = pRanged.createBullet();
var eArrow = eRanged.createBullet();

function update(){

  //console.log(eRanged.act);
  //console.log(eRanged.dead);

  if (pRanged.act){
    pArrow.y = pRanged.Y + pRanged.height/2;
    pArrow.update();
  }

  if (eRanged.act){
    eArrow.update();
  }

  //call this to check if we're losing water
  takeWater(waterCont, eMelee);

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

  //call these to check if arrows are hitting
  //hitProj(bullet, target dood)
  hitProj(eArrow, pRanged);
  hitProj(eArrow, pMelee);
  hitProj(pArrow, eMelee);
  hitProj(pArrow, eRanged);

  //melee shit
  //checkCombat (friendly, enemy)
  if (pMelee.act && eRanged.act){
    checkCombat(pMelee, eRanged); //melee vs ranged
  }
  if (pMelee.act && eMelee.act){
    checkCombat(pMelee, eMelee); //melee vs melee
  }
  if (pRanged.act && eMelee.act){
    checkCombat(pRanged, eMelee); //ranged vs melee
  }
  if (pRanged.act && eRanged.act){
    checkCombat(pRanged, eRanged); //ranged vs ranged
  }



}

//Show the player what they need to see
function draw(){

  //clear the canvas
  canvas.width = canvas.width;

  //main background
  ctx.drawImage(bg,0,0, canvas.width, canvas.height);

  //Draw the amount of water the player has
  ctx.drawImage(waterIcon, waterIcon.X, waterIcon.Y, waterIcon.width, waterIcon.height);
  ctx.font="20px Georgia";
  ctx.fillStyle="black";

  //waterbar
  ctx.drawImage(waterbar, waterbar.X, waterbar.Y);

  //water
  ctx.fillText("Water: " + water, 100, 200);

  //Summon melee
  ctx.drawImage(pMelee, pMelee.X, pMelee.Y, pMelee.width, pMelee.height);

  //Summon ranged
  ctx.drawImage(pRanged, pRanged.X, pRanged.Y, pRanged.width, pRanged.height);

  //Summon enemy melee
  ctx.drawImage(eMelee, eMelee.X, eMelee.Y, eMelee.width, eMelee.height);

  //summon enemy ranged
  ctx.drawImage(eRanged, eRanged.X, eRanged.Y, eRanged.width, eRanged.height);

  //water container
  ctx.drawImage(waterCont, waterCont.X, waterCont.Y, waterCont.width, waterCont.height);

  //Projectile drawing
  if (pRanged.act){
    pArrow.y = pRanged.Y + pRanged.height/2;
    pArrow.draw();
  }

  if(eRanged.act){
    eArrow.draw();
  }

}

function main(){
  update();
  draw();
}

setInterval(main, 50); //(function to repeat, milliseconds)
