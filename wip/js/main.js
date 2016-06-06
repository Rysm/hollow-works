/*
Initiate canvas
*/
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

/*
Input Section
*/
//Using this method while I educate myself on Jquery
canvas.addEventListener("click", handleClick); //when click happens call handleClick
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
var gamestart = false;
var currentCountDown =  makeTimer(30000);

//is hero selected
var hero = false;

//selected hero
var selectHero = "nothing";

//will hold win
var state = null;

//Indexes for the button spawning
var mCount = 0;
var rCount = 0;
var gCount = 0;

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
backgroundbattle.play(); //plays background music

/* (music working and to be implimented)
//melee sword sounds
var swordSound = document.getElementById('swordSound');
    var swordSoundCounter=0;
    var swordSoundPlayed = false;

//menu calm music
var menuMusic = document.getElementById('menuMusic');
    var menuMusicCounter=0;
    var menuMusicPlayed = false;

//mouse click sounds
var clickySounds = document.getElementById('clickySounds');
    var clickySoundsCounter=0;
    var clickySoundsPlayed = false;

//win screen success music I guess
var successMusic = document.getElementById('successMusic');
    var successMusicCounter=0;
    var successMusicPlayed = false;
*/

/* (the plaaayys) Can be Ignored if use the other thing.
swordSound.play(); //sword shing
menuMusic.play(); //menu music (?)
clickySounds.play(); //click click sounds
successMusic.play(); //success music
*/

/* Use this if you plan on having timers I guess
//they can be placed under draw or update func for the thingies

//sword sounds//
        if(!swordSoundPlayed){ //plays it if it isn't played just in case
          swordSound.currentTime = 0;
          swordSound.play();
          swordSoundPlayed = true;
        }

        if (swordSound.ended){
          swordSoundCounter+=0.05;
          if(swordSoundCounter>=4){ //sound effect timer, adjust number to whatever
            swordSound.play();
            swordSoundCounter=0;
          }
        }
//

//menu music//
        if(!menuMusicPlayed){
          menuMusic.currentTime = 0;
          menuMusic.play();
          menuMusicPlayed = true;
        }

        if (menuMusic.ended){
          menuMusicCounter+=0.05;
          if(menuMusicCounter>=4){
            menuMusic.play();
            menuMusicCounter=0;
          }
        }
//

//clicky sounds//
        if(!clickySoundsPlayed){
          clickySounds.currentTime = 0;
          clickySounds.play();
          clickySoundsPlayed = true;
        }

        if (clickySounds.ended){
          clickySoundsCounter+=0.05;
          if(clickySoundsCounter>=4){
            clickySounds.play();
            clickySoundsCounter=0;
          }
        }
//

//successMusic//
        if(!successMusicPlayed){
          successMusic.currentTime = 0;
          successMusic.play();
          successMusic = true;
        }

        if (successMusic.ended){
          successMusicCounter+=0.05;
          if(successMusicCounter>=4){
            successMusic.play();
            successMusicCounter=0;
          }
        }
//
*/

//button is the object we specificy
function handleClick(eventParams){

			  //spawn gatherer dude
			  if(checkBounds(bGatherer, eventParams.clientX, eventParams.clientY)){
							if (playerGatherers[gCount] != null){
									playerGatherers[gCount].act=true;
									gCount++;
							}
			  }

			  //spawn melee dude
			  if(checkBounds(bMelee, eventParams.clientX, eventParams.clientY)){
			      if(bMelee.count > 0){
							if (playerMelees[mCount] != null){
				      		playerMelees[mCount].act=true;
									mCount++;
							}
				      bMelee.count-=1;
			      }
			  }

			  //spawn ranged dude
			  if (checkBounds(bRanged, eventParams.clientX, eventParams.clientY)){
			      if(bRanged.count > 0){
							if (playerRanges[rCount] != null){
									playerRanges[rCount].act=true;
									rCount++;
							}
				      pRanged.act=true;
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

/*
HERO
HERO STUFF
HERO
*/

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
				gamestart = true;
				hero=true;
			}
			//select gatherer
			else if ( (e.clientX >= 488 && e.clientX <= 832) && (e.clientY>=100 && e.clientY<=670) ){
				selectHero = "gatherer";
				gamestart = true;
				hero = true;
			}

			//Hovering over ranged hero
			else if ( (e.clientX >= 876 && e.clientX <= 1217) && (e.clientY>=56 && e.clientY<=680) ){
				selectHero = "ranged";
				gamestart = true;
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
waterIcon.width = 90;
waterIcon.height = 90;
waterIcon.X = 180;
waterIcon.Y = 115;

//TOP RIGHT CHARACTER BUTTONS
var bMelee = new Image();
bMelee.src = "art/swordicon.png";
bMelee.width = 100;
bMelee.height = 100;
bMelee.X = 1000;
bMelee.Y = 10;
bMelee.act = false;
bMelee.dead = false;
bMelee.count = playerMelees.length; //how long the array is

var bRanged = new Image();
bRanged.src = "art/bowicon.png";
bRanged.width = 100;
bRanged.height = 100;
bRanged.X = 1110
bRanged.Y = 10;
bRanged.act = false;
bRanged.dead = false;
bRanged.count = playerRanges.length; //how long the array is

var bGatherer = new Image();
bGatherer.X = 890;
bGatherer.Y = 10;
bGatherer.width = 100;
bGatherer.height = 100;
bGatherer.name = "bGatherer";
bGatherer.src = "art/gatherericon.png";
bGatherer.act = false;
bGatherer.count = playerGatherers.length; //how long the array is.


//UNITS BEGIN HERE

//playerGather
var pGatherer = new Image();
pGatherer.X = 920;
pGatherer.Y = 200;
pGatherer.width = 80;
pGatherer.height = 160;
pGatherer.name = "pGatherer";
pGatherer.src = "art/allygathererF.png";
pGatherer.act = false;
pGatherer.state = "go";

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
eMelee.act = false;
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
eRanged.act = false;
eRanged.dead = false;
eRanged.advance = true;
eRanged.createArrow = function() {
    return new Arrow(eRanged, pMelee, pRanged, 80, 20, -7);
}

// ^^^ UNITS END HERE


/*
Menu STUFF
*/
var playBut = new Image();
playBut.width = 200;
playBut.height = 100;
playBut.X = 538;
playBut.Y = 460;

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

//arrow sound effects
    var arrowpew=document.getElementById('arrowpew'); //input arrow pew sounds
    var arrowcounter=0; //arrow pew pew counter
    var arrowpewPlayed = false;

    if (from == pRanged){
      var bulletImg = new Image();
      bulletImg.src = "art/arrow.png";
    }
    if (from == eRanged){
      var bulletImg = new Image();
      bulletImg.src = "art/fliprow.png";
    }

    this.draw = function() {

//arrow shooting sounds in action//
        if(!arrowpewPlayed){ //plays it if it isn't played just in case
          arrowpew.currentTime = 0;
          arrowpew.play();
          arrowpewPlayed = true;
        }

        if (arrowpew.ended){
          arrowcounter+=0.05;
          if(arrowcounter>=4){ //timer for the arrows to come out
            arrowpew.play();
            arrowcounter=0;
          }
        }
//

        ctx.drawImage(bulletImg, this.x, this.y, this.width, this.height);
    };

    this.reset = function() {
        arrowpewPlayed = false;
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
if (water <= 0){
	state = "lose";
	water = 0;
}

//filler
if (menu == true){
//console.log(mouseYpos);
//console.log(mouseXpos);
}

//game state disabled from messing with menu
if (menu == false){

				if (gamestart == true){
						currentCountDown =  makeTimer(30000);
						gamestart = false;
				}

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


				//loops that manage every single melee unit
				for (a = 0; a < playerMelees.length; a++){
							var meleeImg = new Image();
							meleeImg.src = "art/allymeleeF.png";
							drawMelees.push(meleeImg);
							if (playerMelees[a].act && playerMelees[a].dead == false){
				          playerMelees[a].X-=5; //movement
									hitProj(eArrow, playerMelees[a]); //check if damage from arrow
				      }
				}

				//loops that manage every single ranged unit
				for (b = 0; b < playerRanges.length; b++){
							var rangesImg = new Image();
							rangesImg.src = "art/allyrangeM.png";
							drawRanges.push(rangesImg);
							if (playerRanges[b].act && playerRanges[b].dead == false){
									if (playerRanges[b].X > 700){
				        			playerRanges[b].X-=5; //movement
									}
									hitProj(eArrow, playerRanges[b]); //check if damage from arrow
				      }
				}

				//loops that manage every single gatherer unit
				for (c = 0; c < playerGatherers.length; c++){
							var gathererImg = new Image();
							gathererImg.src = "art/allygathererF.png";
							drawGatherers.push(gathererImg);
							if (playerGatherers[c].act){
    					    if (playerGatherers[c] == "go"){
					            playerGatherers[c].X -= 5;
					            //call this to get water with gatherer
					            gatherWater(pGatherer);
					            //forward
					            if (playerGatherers[c].X < -20){
					                playerGatherers[c].state = "back";
					            }
					        }
					        else if (playerGatherers[c].state == "back"){
					            playerGatherers[c].X += 5;
					            //state management
					            if (playerGatherers[c].X > canvas.width + 20){
					                playerGatherers[c].state = "go";
					            }
					        }
				      }
				}

        //call this to check if we're losing water
        takeWater(waterCont, eMelee);
        takeWater(waterCont, eRanged);

        //combat
        //call these to check if arrows are hitting
        //hitProj(bullet, target dood)
        hitProj(eArrow, pRanged);

        hitProj(pArrow, eMelee);
        hitProj(pArrow, eRanged);

        //call this to get water with gatherer
        //gatherWater(pGatherer);

        if (pRanged.dead == false && pRanged.act){
          pArrow.y = pRanged.Y + pRanged.height/2;
          pArrow.update();
        }

        if (eRanged.dead == false && eRanged.act){
          eArrow.update();
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

/*
        //melee combat
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

				//win condition
				if (rekt == winNum){
						state = "win";
				}
*/

  }

backgroundbattle.play(); //repeats song

}

//Show the player what they need to see
function draw(){

		//clear the canvas
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

					//loops that manage every single melee unit
					for (d = 0; d < playerMelees.length; d++){
					      //Melee image and health
					      if (playerMelees[d].dead == false && playerMelees[d].act){
								  if (drawMelees[d]!= null){
							        ctx.drawImage(drawMelees[d], playerMelees[d].X, playerMelees[d].Y, playerMelees[d].width, playerMelees[d].height);
							        ctx.fillStyle = "red";
							        ctx.fillRect(playerMelees[d].X, playerMelees[d].Y+playerMelees[d].height, playerMelees[d].health*0.75, 15);
									}
					      }
					}

					//loops that manage every single ranged unit
					for (e = 0; e < playerRanges.length; e++){
					      //Ranged image and health
					      if (playerRanges[e].dead == false && playerRanges[e].act){
										if (drawRanges[e]!= null){
							        ctx.drawImage(drawRanges[e], playerRanges[e].X, playerRanges[e].Y, playerRanges[e].width, playerRanges[e].height);
							        pArrow.y = playerRanges[e].Y + playerRanges[e].height/2;
							        pArrow.draw();
							        ctx.fillStyle = "red";
							        ctx.fillRect(playerRanges[e].X, playerRanges[e].Y+playerRanges[e].height, playerRanges[e].health*0.75, 15);
										}
					      }
					}

					//loops that manage every single gatherer unit
					for (f = 0; f < playerGatherers.length; f++){
								if (playerGatherers[f].act){
	    						if (drawGatherers[f]!= null){
					        		ctx.drawImage(drawGatherers[f], playerGatherers[f].X, playerGatherers[f].Y, playerGatherers[f].width, playerGatherers[f].height);
									}
					      }
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

					//draw win screen
					else if (state == "win"){
							ctx.drawImage(winImg, 0,0,canvas.width,canvas.height);
					}

					//draw lose screen
					else if (state == "lose"){
							ctx.drawImage(loseImg, 0,0,canvas.width,canvas.height);
					}

}

function main(){
  update();
  draw();
}

setInterval(main, 50); //(function to repeat, milliseconds)
