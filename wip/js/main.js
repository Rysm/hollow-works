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

//is hero selected
var hero = false;

//selected hero
var selectHero = "nothing";

//will hold win
var state = null;

var recruitmentActive = false;

//active counter
var activeM = 0;
var activeR = 0;
var activeG = 0;

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
/*
var backgroundbattle = document.getElementById('backgroundbattle');
backgroundbattle.play(); //plays background music
*/

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
								if (friendlyGatherer[activeG] != null){
					      	friendlyGatherer[activeG].act = true;
						      if(bGatherer.count > 0){
						        bGatherer.count-=1;
						      }
									activeG++;
								}
			  }

			  //spawn melee dude
			  if(checkBounds(bMelee, eventParams.clientX, eventParams.clientY)){
								if (friendlyMelees[activeM] != null){
						      	friendlyMelees[activeM].act = true;
							      if(bMelee.count > 0){
							        bMelee.count-=1;
							      }
										activeM++;
								}
			  }

			  //spawn ranged dude
			  if (checkBounds(bRanged, eventParams.clientX, eventParams.clientY)){
								if (friendlyRanged[activeR] != null){
										//arrow stuff
										friendlyRanged[activeR].createArrow = function() {
										    return new Arrow(friendlyRanged[activeR], eMelee, eRanged, 80, 20, 12);
										}
										var pArrow = friendlyRanged[activeR].createArrow();
										friendlyArrows.push(pArrow);
										//spawning
				      			friendlyRanged[activeR].act = true;
							      if(bRanged.count > 0){
							        bRanged.count-=1;
							      }
										activeR++;
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

				//open recruitment
				if (checkBounds(recruitmentButton, eventParams.clientX, eventParams.clientY)){
			    if(recruitmentActive == false){
			      recruitmentActive = true;
			    }else{
			      recruitmentActive = false;
			    }

			  }

			  //upgrade attack
			  if (checkBounds(uiButtonOne, eventParams.clientX, eventParams.clientY)){
			    if(uiActive && water > 11){
						water-=10;
						atkUi+=1;
			    }
			  }
			  //upgrade defense
			  if (checkBounds(uiButtonTwo, eventParams.clientX, eventParams.clientY)){
			    if(uiActive && water > 11){
						water-=10;
			      defUi+=1;
			    }
			  }
			//upgrade speed
			if (checkBounds(uiButtonThree, eventParams.clientX, eventParams.clientY)){
			  if(uiActive && water > 11){
						water-=10;
				    spdUi+=1;
			  }
			}

			  /*
			  Playbutton stuff
			  */
			  if (checkBounds(playBut, eventParams.clientX, eventParams.clientY)){
				    menu = false;
				    hero = false;
			  }

				//recruit gatherer
				if (checkBounds(recruitmentOne, eventParams.clientX, eventParams.clientY)){
					if (water > 6){
							water -= 5;
							bGatherer.count++;
							friendlyGatherer.push( unit(3) );
					}
				}

				//recruit melee
				if (checkBounds(recruitmentTwo, eventParams.clientX, eventParams.clientY)){
					if (water > 6){
							water -= 5;
							bMelee.count++;
							friendlyMelees.push( unit(1) );
					}
				}

				//recruit ranged
				if (checkBounds(recruitmentThree, eventParams.clientX, eventParams.clientY)){
					if (water > 6){
							water -= 5;
							bRanged.count++;
							friendlyRanged.push( unit(2) );
					}
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

//recruitmentButton
var recruitmentButton = new Image();
recruitmentButton.X = 1150;
recruitmentButton.Y = 200;
recruitmentButton.width = 85;
recruitmentButton.height = 70;
recruitmentButton.src = "art/recruitment button.png";

//recruitment
var recruitment = new Image();
recruitment.X = 450;
recruitment.Y = 0;
recruitment.width = 500;
recruitment.height = 300;
recruitment.src = "art/recruitment board.png";

//recruitmentOne
var recruitmentOne = new Image();
recruitmentOne.X = 540;
recruitmentOne.Y = 100;
recruitmentOne.width = 80;
recruitmentOne.height = 80;
recruitmentOne.src = "art/heads_gatherer_f.png";

//recruitmentTwo
var recruitmentTwo = new Image();
recruitmentTwo.X = 665;
recruitmentTwo.Y = 100;
recruitmentTwo.width = 80;
recruitmentTwo.height = 80;
recruitmentTwo.src = "art/heads_melee_f.png";

//recruitmentThree
var recruitmentThree = new Image();
recruitmentThree.X = 790;
recruitmentThree.Y = 100;
recruitmentThree.width = 80;
recruitmentThree.height = 80;
recruitmentThree.src = "art/heads_range_f.png";

// recruitmentbuttons
var recruitGatherer = new Image();
recruitGatherer.X = 530;
recruitGatherer.Y = 200;
recruitGatherer.width = 100;
recruitGatherer.height = 60;

var recruitMelee = new Image();
recruitMelee.X = 655;
recruitMelee.Y = 200;
recruitMelee.width = 100;
recruitMelee.height = 60;

var recruitRange = new Image();
recruitRange.X = 780;
recruitRange.Y = 200;
recruitRange.width = 100;
recruitRange.height = 60;


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
var bGatherer = new Image();
bGatherer.src = "art/gatherericon.png";
bGatherer.X = 890;
bGatherer.Y = 10;
bGatherer.width = 100;
bGatherer.height = 100;
bGatherer.count = friendlyGatherer.length;

var bMelee = new Image();
bMelee.src = "art/swordicon.png";
bMelee.X = 1000;
bMelee.Y = 10;
bMelee.width = 100;
bMelee.height = 100;
bMelee.count = friendlyMelees.length;

var bRanged = new Image();
bRanged.src = "art/bowicon.png";
bRanged.X = 1110
bRanged.Y = 10;
bRanged.width = 100;
bRanged.height = 100;
bRanged.count = friendlyRanged.length;

//UNITS BEGIN HERE
//playerGather
var pGatherer = new Image();
pGatherer.src = "art/allygathererF.png";

//Named as playerMelee
var pMelee = new Image();
pMelee.src = "art/walkTest.png";

//Instantiates and animates sprite sheet
meleeObj = Sprite({
	context: ctx,
	width: 2600,
	height: 1000,
	image: pMelee,
	numFrames: 4,
	ticksPerFrame: 4
});

//player ranged
var pRanged = new Image();
pRanged.src = "art/a_r_f_UpdatedSheet.png";

//Instantiates and animates sprite sheet
rangedObj = Sprite({
	context: ctx,
	width: 2600,
	height: 1000,
	image: pRanged,
	numFrames: 4,
	ticksPerFrame: 4
});

var eMelee = new Image();
eMelee.src = "art/badmeleeF.png";
eMelee.name = "eMelee";
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
    return new Arrow(eRanged, pMelee, pRanged, 20, 5, -7);
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

//Should call stuff from the working.js to grab functions that calculate damage and resource.
var eArrow = eRanged.createArrow();

function update(){

	//menu rain
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

						//update instances for melees
						for (a = 0; a < friendlyMelees.length; a++){
				        if (friendlyMelees[a].act && friendlyMelees[a].dead == false){
				            friendlyMelees[a].X-= (5+spdUi);
										meleeObj.update();
				        }
								hitProj(eArrow, friendlyMelees[a]);
						}

						//update instances for ranged
						for (b = 0; b < friendlyRanged.length; b++){

				        if (friendlyRanged[b].act && friendlyRanged[b].X > 700 && friendlyRanged[b].dead == false){
				          	friendlyRanged[b].X-= (5+spdUi);

										//update arrows
						        if (friendlyRanged[b].dead == false && friendlyRanged[b].act){
						          friendlyArrows[b].y = friendlyRanged[b].Y + friendlyRanged[b].height/2;
						          friendlyArrows[b].update();
						        }

									  rangedObj.update();
				        }
				        hitProj(eArrow, friendlyRanged[b]);
						}

						//update instances for gatherer
						for (c = 0; c < friendlyGatherer.length; c++){
									  //friendly unit movement
										if(friendlyGatherer[c].act){
													if (friendlyGatherer[c].state == "go"){
																friendlyGatherer[c].X -= (5+spdUi);
																//call this to get water with gatherer
																gatherWater(friendlyGatherer[c]);

															//forward
															if (friendlyGatherer[c].X < -20){
																	friendlyGatherer[c].state = "back";
															}
													}
													else if (friendlyGatherer[c].state == "back"){
															friendlyGatherer[c].X += (5+spdUi);
															//state management
															if (friendlyGatherer[c].X > canvas.width + 20){
																	friendlyGatherer[c].state = "go";
															}
													}
										}

						}

		        //call this to check if we're losing water
		        takeWater(waterCont, eMelee);
		        takeWater(waterCont, eRanged);
/*
		        //combat
		        //call these to check if arrows are hitting
		        //hitProj(bullet, target dood)
		        hitProj(pArrow, eMelee);
		        hitProj(pArrow, eRanged);

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
		//backgroundbattle.play(); //repeats song
			}
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

						//update instances for melees
						for (a = 0; a < friendlyMelees.length; a++){
						      //Melee image and health
						      if (friendlyMelees[a]!= null && friendlyMelees[a].dead == false && friendlyMelees[a].act){
								  	meleeObj.draw();
						        ctx.drawImage(pMelee, friendlyMelees[a].X, friendlyMelees[a].Y, friendlyMelees[a].width, friendlyMelees[a].height);
						        ctx.fillStyle = "red";
						        ctx.fillRect(friendlyMelees[a].X, friendlyMelees[a].Y+friendlyMelees[a].height, friendlyMelees[a].health*0.75, 15);
						      }
						}

						//update instances for ranged
						for (b = 0; b < friendlyRanged.length; b++){

						      //Ranged image and health
						      if (friendlyRanged[b]!= null && friendlyRanged[b].dead == false && friendlyRanged[b].act){
												  	rangedObj.draw();
										        ctx.drawImage(pRanged, friendlyRanged[b].X, friendlyRanged[b].Y, friendlyRanged[b].width, friendlyRanged[b].height);
										        friendlyArrows[b].y = friendlyRanged[b].Y + friendlyRanged[b].height/4 + 10;

										        if (friendlyArrows[b].draw()) {
															friendlyRanged[b].src = "art/ally_range_female_attack_spritesheet.png";
															rangedObj.numFrames = 5;
															rangedObj.ticksPerFrame = 8;
														}

										        ctx.fillStyle = "red";
										        ctx.fillRect(friendlyRanged[b].X, friendlyRanged[b].Y+friendlyRanged[b].height, friendlyRanged[b].health*0.75, 15);
						      }

						}

						//update instances for gatherer
						for (c = 0; c < friendlyGatherer.length; c++){

							      if (friendlyRanged[c]!= null && friendlyGatherer[c].act){
							        //Gatherer image
							        ctx.drawImage(pGatherer, friendlyGatherer[c].X, friendlyGatherer[c].Y, friendlyGatherer[c].width, friendlyGatherer[c].height);
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
			//recruitment
						if(recruitmentActive == true){
							ctx.drawImage(recruitment, recruitment.X, recruitment.Y, recruitment.width, recruitment.height);

							ctx.drawImage(recruitmentOne, recruitmentOne.X, recruitmentOne.Y, recruitmentOne.width, recruitmentOne.height);
							ctx.drawImage(recruitmentTwo, recruitmentTwo.X, recruitmentTwo.Y, recruitmentTwo.width, recruitmentTwo.height);
							ctx.drawImage(recruitmentThree, recruitmentThree.X, recruitmentThree.Y, recruitmentThree.width, recruitmentThree.height);

							ctx.fillStyle = "green";
							ctx.fillRect(recruitGatherer.X, recruitGatherer.Y, recruitGatherer.width, recruitGatherer.height);
							ctx.fillRect(recruitMelee.X, recruitMelee.Y, recruitMelee.width, recruitMelee.height);
							ctx.fillRect(recruitRange.X, recruitRange.Y, recruitRange.width, recruitRange.height);
							ctx.font="14px Georgia"
							ctx.fillStyle="black";
							ctx.fillText("New", recruitGatherer.X+10, recruitGatherer.Y+20);
							ctx.fillText("New", recruitMelee.X+10, recruitMelee.Y+20);
							ctx.fillText("New", recruitRange.X+10, recruitRange.Y+20);

							ctx.fillText("Gatherer", recruitGatherer.X+10, recruitGatherer.Y+38);
							ctx.fillText("Melee", recruitMelee.X+10, recruitMelee.Y+38);
							ctx.fillText("Ranged", recruitRange.X+10, recruitRange.Y+38);

							ctx.font = "12px Georgia";
							ctx.fillText("Cost: 20 Water", recruitGatherer.X+10, recruitGatherer.Y+55);
							ctx.fillText("Cost: 10 Water", recruitMelee.X+10, recruitMelee.Y+55);
							ctx.fillText("Cost: 10 Water", recruitRange.X+10, recruitRange.Y+55);

						}

			//open UI
			ctx.drawImage(recruitmentButton, recruitmentButton.X,recruitmentButton.Y,recruitmentButton.width,recruitmentButton.height);

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

function Sprite(opt) {

	var self = {},
		index = 0,
		tickCount = 0,
		ticksPerFrame = opt.ticksPerFrame || 0,
		numFrames = opt.numFrames || 1;

	self.context = opt.context;
	self.width = opt.width;
	self.height = opt.height;
	self.image = opt.image;

	self.update = function() {

		tickCount += 1;

		if (tickCount > ticksPerFrame) {

			tickCount = 0;

			// If the current frame index is in range
			if (index < numFrames - 1) {
				// Go to the next frame
				index += 1;
			} else {
				index = 0;
			}
		}
	};

	self.draw = function() {

		// Draw the animation
		self.context.drawImage(
			self.image,
			index * self.width / numFrames,
			0,
			self.width / numFrames,
			self.height,
			self.image.X,
			self.image.Y,
			self.image.width,
			self.image.height);
	};

	return self;
}

function main(){
	update();
	draw();
}

setInterval(main, 50); //(function to repeat, milliseconds)
