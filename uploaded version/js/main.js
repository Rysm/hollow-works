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
HERO
HERO STUFF
HERO
*/

//Added something to help make menu look sick
function handleHover(e){

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
pMelee.src = "art/allymeleeF.png";

//player ranged
var pRanged = new Image();
pRanged.src = "art/allyrangeM.png";

/*
//Instantiates and animates sprite sheet
meleeObj = Sprite({
	context: ctx,
	width: 2600,
	height: 1000,
	image: pMelee,
	numFrames: 4,
	ticksPerFrame: 4
});


//Instantiates and animates sprite sheet
rangedObj = Sprite({
	context: ctx,
	width: 2600,
	height: 1000,
	image: pRanged,
	numFrames: 4,
	ticksPerFrame: 4
});

*/


var eMelee = new Image();
eMelee.src = "art/badmeleeF.png";

//enemy ranged
var eRanged = new Image();
eRanged.src = "art/badrangeF.png";

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

//arrow FUNCTION
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

    if (from.name == "pRanged"){
      var bulletImg = new Image();
      bulletImg.src = "art/arrow.png";
    }
    if (from.name == "eRanged"){
      var bulletImg = new Image();
      bulletImg.src = "art/fliprow.png";
    }

    this.draw = function() {

/*
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

*/

    ctx.drawImage(bulletImg, this.x, this.y, this.width, this.height);

		return true;
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
      if (from.name == "pRanged"){
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
      if (from.name == "eRanged"){
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
		}

		//game state disabled from messing with menu
		if (menu == false){
						//timer thing
						countDownValue = currentCountDown();

						//get time in ms and convert to seconds
						//floor it too
						nowtime = Math.floor( ((countDownValue/1000) % 60) );

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

						//Wave spawner
						//Once timer reaches 0
						if (nowtime <= 0){
								nowtime = 0;
								thisWave = waves[waveNum];
								realInd = waveNum-1;
								for (q=0; q < thisWave.length; q++){
											 if (waves[realInd][q] !=null){
															waves[realInd][q].act = true;
															//enemy melee updater
															if (waves[realInd][q].name == "eMelee" && waves[realInd][q].act && waves[realInd][q].dead == false){
																		waves[realInd][q].X+= (5+spdUi);
															}
															//enemy ranged updater
															if (waves[realInd][q].name == "eRanged" && waves[realInd][q].act && waves[realInd][q].dead == false){
												          		waves[realInd][q].X+= (5+spdUi);
															}
															if (waves[realInd][q].X == waterCont.X){
															      water -= 20;
																		waves[realInd][q].X = 2000;
															}
															if (friendlyArrows[w]!=null){
															for (var w = 0; w<friendlyArrows.length; w++) {
																		hitProj(friendlyArrows[w], waves[realInd][q]);
																	}
															}

												}
								}
						}

						//update instances for melees
						for (a = 0; a < friendlyMelees.length; a++){
				        if (friendlyMelees[a].act && friendlyMelees[a].dead == false){
				            friendlyMelees[a].X-= (5+spdUi);
										//meleeObj.update();
		          			checkCombat(friendlyMelees[a], waves[realInd][a]);
				        }
							//	hitProj(eArrow, friendlyMelees[a]);
						}

						//update instances for ranged
						for (b = 0; b < friendlyRanged.length; b++){
				        if (friendlyRanged[b].act && friendlyRanged[b].dead == false){
										if (friendlyRanged[b].X > 700){
				          		friendlyRanged[b].X-= (5+spdUi);
										}
		          			checkCombat(friendlyRanged[b], waves[realInd][b]);
						      	friendlyArrows[b].update();
									  //rangedObj.update();
										//update arrows
						        friendlyArrows[b].y = friendlyRanged[b].Y + friendlyRanged[b].height/2;
				        }
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

/*
		        if (eRanged.dead == false && eRanged.act){
		          eArrow.update();
		        }

*/
		//backgroundbattle.play(); //repeats song

						//Check if a new wave is beginning
						if (kills == waves[waveNum-1].length){
									//win condition
									if (waveNum == 5){
											state = "win";
									}
									//start a new wave condition
									else {
											//give 30 seconds for next wave.
											currentCountDown =  makeTimer(30000);
											realInd++;
											waveNum++; //go on to next wave
									}
						}

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
						for (d = 0; d < friendlyMelees.length; d++){
						      //Melee image and health
						      if (friendlyMelees[d]!= null && friendlyMelees[d].dead == false && friendlyMelees[d].act){
								  	//meleeObj.draw();
						        ctx.drawImage(pMelee, friendlyMelees[d].X, friendlyMelees[d].Y, friendlyMelees[d].width, friendlyMelees[d].height);
						        ctx.fillStyle = "red";
						        ctx.fillRect(friendlyMelees[d].X, friendlyMelees[d].Y+friendlyMelees[d].height, friendlyMelees[d].health*0.75, 15);
						      }
						}

						//update instances for ranged
						for (e = 0; e < friendlyRanged.length; e++){

						      //Ranged image and health
						      if (friendlyRanged[e]!= null && friendlyRanged[e].dead == false && friendlyRanged[e].act){
												  	//rangedObj.draw();
										        ctx.drawImage(pRanged, friendlyRanged[e].X, friendlyRanged[e].Y, friendlyRanged[e].width, friendlyRanged[e].height);
										        friendlyArrows[e].y = friendlyRanged[e].Y + friendlyRanged[e].height/4 + 10;

										        if (friendlyArrows[e].draw()) {
															friendlyRanged[e].src = "art/ally_range_female_attack_spritesheet.png";
															//rangedObj.numFrames = 5;
															//rangedObj.ticksPerFrame = 8;
														}

										        ctx.fillStyle = "red";
										        ctx.fillRect(friendlyRanged[e].X, friendlyRanged[e].Y+friendlyRanged[e].height, friendlyRanged[e].health*0.75, 15);
						      }

						}

						//update instances for gatherer
						for (f = 0; f < friendlyGatherer.length; f++){

							      if (friendlyRanged[f]!= null && friendlyGatherer[f].act){
							        //Gatherer image
							        ctx.drawImage(pGatherer, friendlyGatherer[f].X, friendlyGatherer[f].Y, friendlyGatherer[f].width, friendlyGatherer[f].height);
							      }

						}

			if (nowtime <= 0){
					nowtime = 0;
					thisWave = waves[waveNum];
					truInd = waveNum-1;
					for (r=0; r < thisWave.length; r++){
									if (waves[truInd][r]!= null){
												if (waves[truInd][r].name == "eMelee" && waves[truInd][r].act && waves[truInd][r].dead == false){
												        ctx.drawImage(eMelee, waves[truInd][r].X, waves[truInd][r].Y, waves[truInd][r].width, waves[truInd][r].height);
												        ctx.fillStyle = "red";
												        ctx.fillRect(waves[truInd][r].X, waves[truInd][r].Y+waves[truInd][r].height, waves[truInd][r].health*0.75, 15);
												}
												else if (waves[truInd][r].name == "eRanged" && waves[truInd][r].act && waves[truInd][r].dead == false){
												        ctx.drawImage(eRanged, waves[truInd][r].X, waves[truInd][r].Y, waves[truInd][r].width, waves[truInd][r].height);
												        //eArrow.draw();
												        ctx.fillStyle = "red";
												        ctx.fillRect(waves[truInd][r].X, waves[truInd][r].Y+waves[truInd][r].height, waves[truInd][r].health*0.75, 15);
												}
									}
					}
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
			ctx.fillText("Wave " + waveNum + " in " + nowtime + "s", uiIcon.X+12, uiIcon.Y-15 );

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
