
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

/*
game state variables
*/
var menu = true;

//button is the object we specificy
function handleClick(eventParams){
  //Mouse coordinates!
  mouseXpos = eventParams.clientX;
  mouseYpos = eventParams.clientY;

  //spawn gatherer dude
  if(checkBounds(bGatherer, eventParams.clientX, eventParams.clientY)){
      pGatherer.X = 1300;
      pGatherer.Y = 275;
      pGatherer.width = 40;
      pGatherer.height = 80;
      pGatherer.act = true;
      if(bGatherer.count > 0){
        bGatherer.count-=1;
      }

  }

  //spawn melee dude
  if(checkBounds(bMelee, eventParams.clientX, eventParams.clientY)){
      //character activate location
      //turns on a switch to enable player object/particle movement
      pMelee.Y = canvas.height-waterCont.height-50;
      eMelee.Y = canvas.height-waterCont.height-50;
      eRanged.Y = canvas.height-waterCont.height-50;
      pMelee.act=true;
      eMelee.act = true;
      eRanged.act = true;
      if(bMelee.count > 0){
        bMelee.count-=1;
      }
  }

  //spawn ranged dude
  if (checkBounds(bRanged, eventParams.clientX, eventParams.clientY)){
      //character activate location
      //turns on a switch to enable player object/particle movement
      pRanged.Y = canvas.height-waterCont.height-50;
      eMelee.Y = canvas.height-waterCont.height-50;
      eRanged.Y = canvas.height-waterCont.height-50;
      pRanged.act=true;
      eMelee.act = true;
      eRanged.act = true;
      if(bRanged.count > 0){
        bRanged.count-=1;
      }
  }

  /*
  Menu navigation
  */
  if (checkBounds(playBut, eventParams.clientX, eventParams.clientY)){
    menu = false;
  }

  /*
  Spawn player new checked
  */
  if (null){

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
waterCont.X = canvas.width-waterCont.width-50;
waterCont.Y = canvas.height-waterCont.height-20;

//background
var bg = new Image();
bg.src = "art/bg.png";

//water icon
var waterIcon = new Image();
waterIcon.src = "art/watericon2.png";
waterIcon.width = 100;
waterIcon.height = 100;
waterIcon.X = 75;
waterIcon.Y = 25;

//TOP RIGHT CHARACTER BUTTONS
var bMelee = new Image();
bMelee.src = "art/swordicon.png";
bMelee.width = 100;
bMelee.height = 100;
bMelee.X = 1000;
bMelee.Y = 10;
bMelee.act = false;
bMelee.dead = false;
bMelee.count = 1;

var bRanged = new Image();
bRanged.src = "art/bowicon.png";
bRanged.width = 100;
bRanged.height = 100;
bRanged.X = 1110
bRanged.Y = 10;
bRanged.act = false;
bRanged.dead = false;
bRanged.count = 1;

var bGatherer = new Image();
bGatherer.X = 890;
bGatherer.Y = 10;
bGatherer.width = 100;
bGatherer.height = 100;
bGatherer.name = "bGatherer";
bGatherer.src = "art/gatherericon.png";
bGatherer.act = false;
bGatherer.count = 1;

//playerGather
var pGatherer = new Image();
pGatherer.X = 920;
pGatherer.Y = 200;
pGatherer.width = 80;
pGatherer.height = 160;
pGatherer.name = "pGatherer";
pGatherer.src = "art/ally_gatherer_female.png";
pGatherer.act = false;

//Named as playerMelee
var pMelee = new Image();
pMelee.src = "art/allymeleeF.png";
pMelee.name = "pMelee";
pMelee.health = 100;
pMelee.dmg = 15;
pMelee.width = 80;
pMelee.height = 160;
pMelee.X = 1000;
pMelee.Y = 200;
pMelee.act = false;
pMelee.dead = false;

//player ranged
var pRanged = new Image();
pRanged.src = "art/allyrangeM.png";
pRanged.name = "pRanged";
pRanged.health = 70;
pRanged.dmg = 30;
pRanged.width = 90;
pRanged.height = 160;
pRanged.X = 1000 + pRanged.width;
pRanged.Y = pMelee.Y;
pRanged.act = false;
pRanged.dead = false;
pRanged.createArrow = function() {
    return new Arrow(pRanged, eMelee, eRanged, 80, 20, 12);
}

var eMelee = new Image();
eMelee.name = "eMelee";
eMelee.src = "art/badmeleeF.png";
eMelee.dmg = 15;
eMelee.health = 100;
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
eRanged.health = 70;
pRanged.dmg = 30;
eRanged.width = 90;
eRanged.height = 160;
eRanged.X = 0;
eRanged.Y = canvas.height-waterCont.height-50;
eRanged.act = true;
eRanged.dead = false;
eRanged.advance = true;
eRanged.createArrow = function() {
    return new Arrow(eRanged, pMelee, pRanged, 80, 20, -7);
}

/*
Menu button parameters
*/
var playBut = new Image();
playBut.width = 164;
playBut.height = 69;
playBut.X = 565;
playBut.Y = 360;

//bullet
function Arrow(from, enemy, enemy2, width, height, xSpeed) {

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
var pArrow = pRanged.createArrow();
var eArrow = eRanged.createArrow();

function update(){

//water stuck lowest as 0
if (water < 0){
  water = 0;
}

//filler
if (menu == true){
}

//game state disabled from messing with menu
if (menu == false){

        //call this to check if we're losing water
        takeWater(waterCont, eMelee);
        takeWater(waterCont, eRanged);

        //combat
        //call these to check if arrows are hitting
        //hitProj(bullet, target dood)
        hitProj(eArrow, pRanged);
        hitProj(eArrow, pMelee);
        hitProj(pArrow, eMelee);
        hitProj(pArrow, eRanged);

        //call this to get water with gatherer
        gatherWater(pGatherer);

        if (pRanged.dead == false && pRanged.act){
          pArrow.y = pRanged.Y + pRanged.height/2;
          pArrow.update();
        }

        if (eRanged.dead == false && eRanged.act){
          eArrow.update();
        }

        //friendly unit movement
        if(pGatherer.act){
          pGatherer.X-=3;
        }

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

        if (eRanged.act && eRanged.dead == false){
          checkEnemyRange(eRanged,pMelee);
          checkEnemyRange(eRanged,pRanged);
          if (eRanged.advance){
            eRanged.X+=5;
          }
        }

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

}

//Show the player what they need to see
function draw(){

  //clear the canvas
  canvas.width = canvas.width;

if (menu == true){

  //draw menu background
  //current placeholder a rectangle
  ctx.fillStyle = "#33ccff";
  ctx.fillRect(0,0, canvas.width, canvas.height);

  //Title
  ctx.font="200px Georgia";
  ctx.fillStyle="white";
  ctx.fillText("Last Drop", canvas.width/2-420, canvas.height/2-100);

  //Play
  ctx.font="80px Georgia";
  ctx.fillText("Play", canvas.width/2-80, canvas.height/2+50);
  ctx.fillText("Options", canvas.width/2-80, canvas.height/2+140);
  ctx.fillText("Exit", canvas.width/2-80, canvas.height/2+230);
}

/*
Updates are in progress at the moment
*/
else if (menu == false){
      //main background
      ctx.drawImage(bg,0,0, canvas.width, canvas.height);

      //Draw the amount of water the player has
      ctx.drawImage(waterIcon, waterIcon.X, waterIcon.Y+10, waterIcon.width, waterIcon.height);

      //amount of water rectangle
      ctx.fillStyle = "#33ccff";
      ctx.fillRect(waterIcon.X+waterIcon.width, waterIcon.Y+(waterIcon.height/2), water*2, 25);

      //white text
      ctx.font="20px Georgia";
      ctx.fillStyle="white";
      ctx.fillText(water, waterIcon.X+170, waterIcon.Y+(waterIcon.height-30));


      //character icons
      ctx.drawImage(bGatherer, bGatherer.X, bGatherer.Y, bGatherer.width, bGatherer.height);
      ctx.drawImage(bMelee, bMelee.X, bMelee.Y, bMelee.width, bMelee.height);
      ctx.drawImage(bRanged, bRanged.X, bRanged.Y, bMelee.width, bMelee.height);
      ctx.font="32px Georgia";
      ctx.fillStyle="black";
      ctx.fillText(bGatherer.count, bGatherer.X+73, bGatherer.Y+91);
      ctx.fillText(bMelee.count, bMelee.X+73, bMelee.Y+91);
      ctx.fillText(bRanged.count, bRanged.X+73, bRanged.Y+91);

      //Melee image and health
      if (pMelee.dead == false && pMelee.act){
        ctx.drawImage(pMelee, pMelee.X, pMelee.Y, pMelee.width, pMelee.height);
        ctx.fillStyle = "red";
        ctx.fillRect(pMelee.X, pMelee.Y+pMelee.height, pMelee.health*0.75, 15);
      }

      //Ranged image and health
      if (pRanged.dead == false && pRanged.act){
        ctx.drawImage(pRanged, pRanged.X, pRanged.Y, pRanged.width, pRanged.height);
        pArrow.y = pRanged.Y + pRanged.height/2;
        pArrow.draw();
        ctx.fillStyle = "red";
        ctx.fillRect(pRanged.X, pRanged.Y+pRanged.height, pRanged.health*0.75, 15);
      }

      if (pGatherer.act){
        //Gatherer image
        ctx.drawImage(pGatherer, pGatherer.X, pGatherer.Y, pGatherer.width, pGatherer.height);
      }

      //Enemy melee image and health
      if (eMelee.dead == false && eMelee.act){
        ctx.drawImage(eMelee, eMelee.X, eMelee.Y, eMelee.width, eMelee.height);
        ctx.fillStyle = "red";
        ctx.fillRect(eMelee.X, eMelee.Y+eMelee.height, eMelee.health*0.75, 15);
      }

      //Enemy ranged image and health
      if (eRanged.dead == false && eRanged.act){
        ctx.drawImage(eRanged, eRanged.X, eRanged.Y, eRanged.width, eRanged.height);
        eArrow.draw();
        ctx.fillStyle = "red";
        ctx.fillRect(eRanged.X, eRanged.Y+eRanged.height, eRanged.health*0.75, 15);
      }

      //water container
      ctx.drawImage(waterCont, waterCont.X, waterCont.Y, waterCont.width, waterCont.height);

      //Projectile drawing
      //Friendly
      if (pRanged.act){
      }

      //Enemy
      if(eRanged.act){

      }
  }

}

function main(){
  update();
  draw();
}

setInterval(main, 50); //(function to repeat, milliseconds)
