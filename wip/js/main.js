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
canvas.addEventListener("mousemove", handleHover); //for hero selection neatness
canvas.addEventListener("mouseup", choose); //for getting into the game

var mouseXpos;
var mouseYpos;
var hoverX;
var hoverY;

/*
game state variables
*/
var menu = true;
var uiActive = false;
var atkUi = 1;
var defUi = 1;
var spdUi = 1;
var tierUi = 1;
var nextTier = 50;
var nextAtk = 10;
var nextDef = 10;
var nextSpd = 10;

//is hero selected
var hero = false;

//selected hero
var selectHero = "nothing";

//will hold win
var state = null;

/*
Menu raining stuff
*/

var particles = [];

function Particle(x, y, speed, lifetime){
	this.x = x;
  this.y = y;
  this.speed = Math.random()*speed+2;
  this.lifetime = lifetime;
  this.radius = Math.random()*10+2;
}

function particle_system(numParticles){
	for(var i =0; i < numParticles; i++){
  	particles.push(new Particle(Math.random() * canvas.width, -40, 15, canvas.height));
  }
}

particle_system(100);


/*
Input Music
*/
var backgroundbattle = document.getElementById('backgroundbattle');

backgroundbattle.play(); //plays music

//button is the object we specificy
function handleClick(eventParams){

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
			      if(bRanged.count > 0){
			        bRanged.count-=1;
			      }
			  }
			  //open ui
			  if (checkBounds(uiIcon, eventParams.clientX, eventParams.clientY)){
			    if(uiActive == false){
			      uiActive = true;
			    }else{
			      uiActive = false;
			    }

			  }
			  //upgrade attack
			  if (checkBounds(uiButtonOne, eventParams.clientX, eventParams.clientY)){
			    if(uiActive){
			      atkUi+=1;
			    }
			  }
			  //upgrade defense
			  if (checkBounds(uiButtonTwo, eventParams.clientX, eventParams.clientY)){
			    if(uiActive){
			      defUi+=1;
			    }
			  }
			//upgrade speed
			if (checkBounds(uiButtonThree, eventParams.clientX, eventParams.clientY)){
			  if(uiActive){
			    spdUi+=1;
			  }
			}

			  /*
			  Playbutton stuff
			  */
			  if (checkBounds(playBut, eventParams.clientX, eventParams.clientY)){
			    menu = false;
			    hero=false;
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

//Added something to help make menu look sick
function handleHover(e){
			/* x-y coord I recorded for self reference
			left
			90 - 49
			405 - 689

			mid
			488 - 100
			832 - 670

			right
			876 - 56
			1217 - 680
			*/
			if (menu == false){
					//Hovering over melee hero
					if ( (e.clientX >= 90 && e.clientX <= 405) && (e.clientY>=49 && e.clientY<=689) ){
						selectBG.src = "art/heroscreenM.png";
					}

					//Hovering over gatherer hero
					else if ( (e.clientX >= 488 && e.clientX <= 832) && (e.clientY>=100 && e.clientY<=670) ){
						selectBG.src = "art/heroscreenG.png";
					}

					//Hovering over ranged hero
					else if ( (e.clientX >= 876 && e.clientX <= 1217) && (e.clientY>=56 && e.clientY<=680) ){
						selectBG.src = "art/heroscreenR.png";
					}

					else{
						selectBG.src = "art/heroscreen.png";
					}
			}
}

function choose(e){
	/*
	hero selection
	hero false means it hasn't been selected
	*/
	if (menu==false && hero==false){
			//select melee
			if ( (e.clientX >= 90 && e.clientX <= 405) && (e.clientY>=49 && e.clientY<=689) ){
				selectHero = "melee";
				hero=true;
			}
			//select gatherer
			else if ( (e.clientX >= 488 && e.clientX <= 832) && (e.clientY>=100 && e.clientY<=670) ){
				selectHero = "gatherer";
				hero = true;
			}

			//Hovering over ranged hero
			else if ( (e.clientX >= 876 && e.clientX <= 1217) && (e.clientY>=56 && e.clientY<=680) ){
				selectHero = "ranged";
				hero = true;
			}

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

//uiIcon
var uiIcon = new Image();
uiIcon.X = 200;
uiIcon.Y = 100;
uiIcon.width = 110;
uiIcon.height = 35;

//uiBackground
var uiBackground = new Image();
uiBackground.X = 450;
uiBackground.Y = 25;
uiBackground.width = 400;
uiBackground.height = 500;
uiBackground.src = "art/uiMenu.png";

//uiButtonOne
var uiButtonOne = new Image();
uiButtonOne.X = 675;
uiButtonOne.Y = 235;
uiButtonOne.width = 140;
uiButtonOne.height = 40;
uiButtonOne.src = "art/levelOne.png";

var uiButtonTwo = new Image();
uiButtonTwo.X = 675;
uiButtonTwo.Y = 340;
uiButtonTwo.width = 140;
uiButtonTwo.height = 40;
uiButtonTwo.src = "art/levelTwo.png";

var uiButtonThree = new Image();
uiButtonThree.X = 675;
uiButtonThree.Y = 460;
uiButtonThree.width = 140;
uiButtonThree.height = 40;
uiButtonThree.src = "art/levelThree.png";

var uiButtonFour = new Image();
uiButtonFour.X = 500;
uiButtonFour.Y = 550;
uiButtonFour.width = 210;
uiButtonFour.height = 70;
uiButtonFour.src = "art/levelFour.png";

//playerPortrait
var playerPortrait = new Image();
playerPortrait.X = 50;
playerPortrait.Y = 20;
playerPortrait.width = 300;
playerPortrait.height = 150;

//teardropbloop
var teardropbloop = new Image();
teardropbloop.src = "art/teardropbloop.png";
teardropbloop.width = 30;

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
bMelee.dead = false;

var bRanged = new Image();
bRanged.src = "art/bowicon.png";
bRanged.width = 100;
bRanged.height = 100;
bRanged.X = 1110
bRanged.Y = 10;
bRanged.dead = false;

var bGatherer = new Image();
bGatherer.X = 890;
bGatherer.Y = 10;
bGatherer.width = 100;
bGatherer.height = 100;
bGatherer.name = "bGatherer";
bGatherer.src = "art/gatherericon.png";

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
eRanged.dmg = 30;
eRanged.width = 90;
eRanged.height = 160;
eRanged.X = 0;
eRanged.Y = canvas.height-waterCont.height-50;
eRanged.act = true;
eRanged.dead = false;
eRanged.advance = true;
//eRanged.createArrow = function() {
//    return new Arrow(eRanged, pMelee, pRanged, 80, 20, -7);
//}

/*
Menu button parameters
*/
var playBut = new Image();
playBut.width = 200;
playBut.height = 100;
playBut.X = 538;
playBut.Y = 460;

//Game state background stuff
var titleBG = new Image();
titleBG.src = "art/title.png";

var selectBG = new Image();
selectBG.src = "art/heroscreen.png";

var selectBut = new Image();

var winImg = new Image();
winImg.src = "art/winscreen.png"

var loseImg = new Image();
loseImg.src = "art/gameover.png";


//bullet
function Arrow(from, enemy, enemy2, width, height, xSpeed) {

    this.x = from.X + from.width/2;
    this.y = from.Y + from.height/2;
    this.width = width;
    this.height = height;
    this.xSpeed = xSpeed;

    var bulletImg = new Image();
    bulletImg.src = "art/arrow.png";


/*
    if (from == eRanged){
      var bulletImg = new Image();
      bulletImg.src = "art/fliprow.png";
    }
*/

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
        if (this.x < 0 || this.x < enemy.X + enemy.width ||
            this.x < enemy2.X + enemy2.width) {
            this.x = from.X + from.width / 2;
            this.y = from.Y + from.height / 2;
            //this.x -= this.xSpeed;

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

//var eArrow = eRanged.createArrow();

function update(){

//water particles?
for(var i = 0; i < particles.length; i++){
  var particle = particles[i];
  particle.y = particle.y+particle.speed;

  if(particle.y > canvas.height){
    particle.y = 0;
    particle.x = Math.random()*canvas.width;
  }
  particle.y += particle.radius*0.3;
}

//water stuck lowest as 0
if (water < 0){
  water = 0;
}

//filler
if (menu == true){
}

//game state disabled from messing with menu
if (menu == false){

        //timer thing
        countDownValue = currentCountDown();

        //get time in ms and convert to seconds
        //floor it too
        nowtime = Math.floor( ((countDownValue/1000) % 60) );

        //Spawn the first wave!
        //Once timer reaches 0
        if (nowtime <= 0){
            nowtime = 0;
            eMelee.act = true;
            eRanged.act = true;
        }

        //update player playerPortrait
        if (selectHero == "melee"){
            playerPortrait.src = "art/meleePortrait.png";
        }
        if (selectHero == "gatherer"){
            playerPortrait.src = "art/gathererPortrait.png";
        }
        if (selectHero == "ranged"){
            playerPortrait.src = "art/rangedPortrait.png";
        }


        //Update for melee units
        for (var i = 0; i < playerMelees.length; i++){
            if (playerMelees[i].dead == false && playerMelees[i].act){
                playerMelees[i].X -= 5;
            }
        }

        //Update for ranged units
        for (var j = 0; j < playerRanged.length; j++){

              pArrow = new Arrow(playerRanged[j], eMelee, eRanged, 80, 20, 12);
              playerProjs.push(pArrow);

              if (playerRanged[j].dead == false && playerRanged[j].act){

                playerRanged[j].X -= 5;
                //update arrow
                playerProjs[j].y = canvas.height-waterCont.height-50 + 80;
                playerProjs[j].update();
                playerProjs[j].draw();
                //arrows
                //hitProj(pArrow, eMelee);
                //hitProj(pArrow, eRanged);
              }
        }

        //Update for projectiles

        //Update for gatherers
        for (var k=0; k<playerGathers.length; k++){

            //movement
            if (playerGathers[k].act){
                if (playerGathers[k].state == "go"){
                    playerGathers[k].X -= 5;
                    //call this to get water with gatherer
                    gatherWater(playerGathers[k]);
                    //forward
                    if (playerGathers[k].X < -20){
                        playerGathers[k].state = "back";
                    }
                }
                else if (playerGathers[k].state == "back"){
                    playerGathers[k].X += 5;
                    //state management
                    if (playerGathers[k].X > canvas.width + 20){
                        playerGathers[k].state = "go";
                    }
                }
            }
        }

        //enemy unit movement
        if (eMelee.act && eMelee.dead == false){
          eMelee.X+=5;
        }

        if (eRanged.act && eRanged.dead == false){
          //checkEnemyRange(eRanged,pMelee);
          //checkEnemyRange(eRanged,pRanged);
          if (eRanged.advance){
            eRanged.X+=5;
          }
        }

        /*


                //combat
                //call these to check if arrows are hitting
                //hitProj(bullet, target dood)
                hitProj(eArrow, pRanged);
                hitProj(eArrow, pMelee);

                if (pRanged.dead == false && pRanged.act){
                  pArrow.y = pRanged.Y + pRanged.height/2;
                  pArrow.update();
                }

                if (eRanged.dead == false && eRanged.act){
                  eArrow.update();
                }

        */


          }

        backgroundbattle.play(); //repeats song

}

//Show the player what they need to see
function draw(){

        //clear the canvas
        canvas.width = canvas.width;

        if (menu == true && hero==false){
          canvas.width = canvas.width;
          //draw menu background
          //current placeholder a rectangle
          ctx.drawImage(titleBG, 0,0,canvas.width,canvas.height);

        	//water drop
        	for(var i = 0; i < particles.length; i++){
          	var particle = particles[i];
            ctx.drawImage(teardropbloop, particle.x, particle.y, 25, 50);
          }

          //Play
          ctx.font="50px Georgia";
          ctx.fillStyle = "white";
          ctx.fillText("Play", canvas.width/2-80, canvas.height/2+180);
          ctx.fillText("Options", canvas.width/2-80, canvas.height/2+250);
          ctx.fillText("Exit", canvas.width/2-80, canvas.height/2+320);
        }

        if (menu == false && hero==false){
        	ctx.drawImage(selectBG, 0,0,canvas.width,canvas.height);
        }

/*
Updates are in progress at the moment
*/
else if (menu == false && hero==true && state == null){
			canvas.width = canvas.width;

      //main background
      ctx.drawImage(bg,0,0, canvas.width, canvas.height);

      //Draw the amount of water the player has and playerPortrait
      ctx.drawImage(waterIcon, waterIcon.X, waterIcon.Y+10, waterIcon.width, waterIcon.height);
      ctx.drawImage(playerPortrait, playerPortrait.X, playerPortrait.Y, playerPortrait.width, playerPortrait.height);

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

      //upgrade UI button
      ctx.font="18px Georgia";
      ctx.fillStyle="black";

			//Timer display
			ctx.fillText("Wave 1 in " + nowtime + "s", uiIcon.X+12, uiIcon.Y-15 );

      if(uiActive == false){
        ctx.fillText("Upgrade", uiIcon.X+15, uiIcon.Y+22);
      }else{
        ctx.fillText("Close", uiIcon.X+15, uiIcon.Y+22);

        ctx.drawImage(uiBackground, uiBackground.X, uiBackground.Y, uiBackground.width, uiBackground.height);
        //drawing the current attack skill level
        if(atkUi == 1){
        ctx.drawImage(uiButtonOne, 575, 235, uiButtonOne.width, uiButtonOne.height);
        }else if(atkUi == 2){
        ctx.drawImage(uiButtonTwo, 575, 235, uiButtonOne.width, uiButtonOne.height);
        }else if(atkUi == 3){
        ctx.drawImage(uiButtonThree, 575, 235, uiButtonOne.width, uiButtonOne.height);
        }else{
        ctx.drawImage(uiButtonFour, 575, 235, uiButtonOne.width, uiButtonOne.height);
        }
        //drawing the current def skill level
        if(defUi == 1){
        ctx.drawImage(uiButtonOne, 575, 345, uiButtonOne.width, uiButtonOne.height);
        }else if(defUi == 2){
        ctx.drawImage(uiButtonTwo, 575, 345, uiButtonOne.width, uiButtonOne.height);
        }else if(defUi == 3){
        ctx.drawImage(uiButtonThree, 575, 345, uiButtonOne.width, uiButtonOne.height);
        }else{
        ctx.drawImage(uiButtonFour, 575, 345, uiButtonOne.width, uiButtonOne.height);
        }
        //drawing the current spd skill level
        if(spdUi == 1){
        	ctx.drawImage(uiButtonOne, 575, 460, uiButtonOne.width, uiButtonOne.height);
        }
				else if(spdUi == 2){
        	ctx.drawImage(uiButtonTwo, 575, 460, uiButtonOne.width, uiButtonOne.height);
        }
				else if(spdUi == 3){
        	ctx.drawImage(uiButtonThree, 575, 460, uiButtonOne.width, uiButtonOne.height);
        }
				else{
        	ctx.drawImage(uiButtonFour, 575, 460, uiButtonOne.width, uiButtonOne.height);
        }
        //draw in tier
        ctx.font="72px Georgia";
        ctx.fillStyle="black";
        ctx.fillText(" "+tierUi, 510, 125);
      }

      //water container
      ctx.drawImage(waterCont, waterCont.X, waterCont.Y, waterCont.width, waterCont.height);

}

}

function main(){
  update();
  draw();
}

setInterval(main, 50); //(function to repeat, milliseconds)
