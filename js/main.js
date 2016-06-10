var FPS = 60;
var cfg = {
	state: {
		initial: 'whereWeStart',
		events: [

		]
	},
	images: [
		{ id: 'background',   url: "art/bg.png"                              		},
		{ id: 'waterCont',    url: "art/waterCont.png"                       		},
		{ id: 'recruitBtn',   url: "art/recruitment button.png"              		},
		{ id: 'recruitBrd',   url: "art/recruitment board.png"               		},
		{ id: 'gRecruit', 	  url: "art/heads_gatherer_f.png"                		},
		{ id: 'mRecruit', 	  url: "art/heads_melee_f.png"               	 		},
		{ id: 'rRecruit', 	  url: "art/heads_range_f.png"                   		},
		{ id: 'gRecruitBtn',  url: ""                						 		},
		{ id: 'mRecruitBtn',  url: ""               						 		},
		{ id: 'rRecruitBtn',  url: ""                   					 		},
		{ id: 'uiIcon', 	  url: ""                   					 		},
		{ id: 'uiBackground', url: "art/uiMenu.png"                   		 		},
		{ id: 'uiBtn1', 	  url: "art/levelOne.png"                   	 		},
		{ id: 'uiBtn2', 	  url: "art/levelTwo.png"                   	 		},
		{ id: 'uiBtn3', 	  url: "art/levelThree.png"                   	 		},
		{ id: 'uiBtn4', 	  url: "art/levelFour.png"                   	 		},
		{ id: 'plyrPtrt', 	  url: ""                   	 				 		},
		{ id: 'tearDrpLp', 	  url: "art/teardropbloop.png"                   		},
		{ id: 'waterIcon', 	  url: "art/watericon2.png"                   	 		},
		{ id: 'charBtnM', 	  url: "art/swordicon.png"                   	 		},
		{ id: 'charBtnR', 	  url: "art/bowicon.png"                   	     		},
		{ id: 'charBtnG', 	  url: "art/gatherericon.png"                    		},
		{ id: 'gWlk',         url: "art/a_g_f_UpdatedSheet.png"                     },
		{ id: 'mWlk',         url: "art/walkTest.png"                        		},
		{ id: 'mAtk', 		  url: "art/ally_melee_female_attack_spritesheet.png"	},
		{ id: 'rWlk', 		  url: "art/a_r_f_UpdatedSheet.png"                  	},
		{ id: 'rAtk', 		  url: "art/a_r_f_UpdatedSheet.png"                  	},
		{ id: 'eMWlk', 		  url: "art/e_m_f_UpdatedSheet.png"                  	},
		{ id: 'eMAtk', 		  url: "art/enemy_melee_female_attack_spritesheet.png" 	},
		{ id: 'eRWlk', 		  url: "art/e_r_f_UpdatedSheet.png"                    	},
		{ id: 'eRAtk', 		  url: "art/enemy_range_female_attack_spritesheet.png" 	}
	],
	sounds: [

	],
	waves: [
		{ id: 'wave one' }
	]
};

ALLY = {
	MELEE:    { img: {}, frames: 4, tpf: FPS/15, health: 100, speed: 200/FPS, damage: 50/FPS, armor: 3, state: 'inactive', weapon: { speed: 600/FPS, reload: 0.40*FPS, damage: 4, active: false }, sex: "female", name: "pMelee"    },
	RANGED:   { img: {}, frames: 4, tpf: FPS/15, health:  70, speed: 220/FPS, damage: 40/FPS, armor: 2, state: 'inactive', weapon: {}, 															   sex: "male",   name: "pRanged"   },
	GATHERER: { img: {}, frames: 4, tpf: FPS/15, health:   0, speed: 260/FPS, damage:      0, armor: 0, state: 'inactive',                                                                         sex: "female", name: "pGatherer" }
};
ENEMY = {
	MELEE:    { img: {}, frames: 4, tpf: FPS/15, health: 100, speed: 200/FPS, damage: 50/FPS, armor: 3, state: 'inactive', weapon: { speed: 600/FPS, reload: 0.40*FPS, damage: 4, active: false }, sex: "female", name: "eMelee"    },
	RANGED:   { img: {}, frames: 4, tpf: FPS/15, health:  70, speed: 220/FPS, damage: 40/FPS, armor: 2, state: 'inactive', weapon: {}, 															   sex: "male",   name: "eRanged"   }
};

/*
function loadContent() {

}
*/
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
			      ALLY.GATHERER.img.dx = 1300;
				  ALLY.GATHERER.img.dy = 275;
				  ALLY.GATHERER.img.width = 40;
				  ALLY.GATHERER.img.height = 80;
				  ALLY.GATHERER.state = 'walking';
			      if(bGatherer.count > 0){
			        bGatherer.count-=1;
			      }

			  }

			  //spawn melee dude
			  if(checkBounds(bMelee, eventParams.clientX, eventParams.clientY)){
			      //character activate location
			      //turns on a switch to enable player object/particle movement
				  ALLY.MELEE.img.dy = canvas.height-waterCont.height-50;
			      ENEMY.MELEE.img.dy = canvas.height-waterCont.height-50;
			      ENEMY.RANGED.img.dy = canvas.height-waterCont.height-50;
				  ALLY.MELEE.state = 'walking';
			      if(bMelee.count > 0){
			        bMelee.count-=1;
			      }
			  }

			  //spawn ranged dude
			  if (checkBounds(bRanged, eventParams.clientX, eventParams.clientY)){
			      //character activate location
			      //turns on a switch to enable player object/particle movement
				  ALLY.RANGED.img.dy = canvas.height-waterCont.height-50;
				  ENEMY.MELEE.img.dy = canvas.height-waterCont.height-50;
				  ENEMY.RANGED.img.dy = canvas.height-waterCont.height-50;
				  ALLY.RANGED.state = 'walking';
			      if(bRanged.count > 0){
			        bRanged.count-=1;
			      }
			  }
			  //open ui
			  if (checkBounds(uiIcon, eventParams.clientX, eventParams.clientY)){
			    if(!uiActive)
			      uiActive = true;
			    else{
			      uiActive = false;
			    }

			  }

				//open recruitment
				if (checkBounds(recruitmentButton, eventParams.clientX, eventParams.clientY)){
			    if(!recruitmentActive){
			      recruitmentActive = true;
			    }else{
			      recruitmentActive = false;
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
			    hero = false;
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
				hero = true;
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
bRanged.X = 1110;
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


//UNITS BEGIN HERE
//playerGather
ALLY.GATHERER.img = Game.createImage(
	cfg.images[Tools.search('gWlk', cfg.images)].url, {
		width: 90,
		height: 160,
		dx: 920,
		dy: 200
	}
);

gathererSprt = Game.createSprite({
	context: ctx,
	width: 2600,
	height: 1000,
	image: ALLY.GATHERER.img,
	numFrames: ALLY.GATHERER.frames,
	ticksPerFrame: ALLY.GATHERER.tpf
});
/*
var pGatherer = new Image();
pGatherer.X = 920;
pGatherer.Y = 200;
pGatherer.width = 80;
pGatherer.height = 160;
pGatherer.name = "pGatherer";
pGatherer.src = "art/ally_gatherer_female.png";
pGatherer.act = false;
pGatherer.state = "go";
*/

//Named as playerMelee
ALLY.MELEE.img = Game.createImage(
	cfg.images[Tools.search('mWlk', cfg.images)].url, {
		width: 90,
		height: 160,
		dx: 1000,
		dy: 1000
	}
);

meleeSprt = Game.createSprite({
	context: ctx,
	width: 2600,
	height: 1000,
	image: ALLY.MELEE.img,
	numFrames: ALLY.MELEE.frames,
	ticksPerFrame: ALLY.MELEE.tpf
});

/*
 var pMelee = new Image();
 pMelee.src = "art/walkTest.png";
 pMelee.name = "pMelee";
 pMelee.health = 100;
 pMelee.dmg = 15;
 pMelee.width = 80;
 pMelee.height = 160;
 pMelee.X = 1000;
 pMelee.Y = 1000;
 pMelee.act = false;
 pMelee.dead = false;
 */

//player ranged
ALLY.RANGED.img = Game.createImage(
	cfg.images[Tools.search('rWlk', cfg.images)].url, {
		width: 90,
		height: 160,
		dx: 1000,
		dy: 1000
	}
);

rangedSprt = Game.createSprite({
	context: ctx,
	width: 2600,
	height: 1000,
	image: ALLY.RANGED.img,
	numFrames: ALLY.RANGED.frames,
	ticksPerFrame: ALLY.RANGED.tpf
});

ALLY.RANGED.weapon = Game.createWeapon({
	type: createArrow(ALLY.RANGED, ENEMY.MELEE, ENEMY.RANGED, 70, 10, 12)
});

/*
var pRanged = new Image();
pRanged.src = "art/a_r_f_UpdatedSheet.png";
pRanged.name = "pRanged";
pRanged.health = 70;
pRanged.dmg = 30;
pRanged.width = 90;
pRanged.height = 160;
pRanged.X = 1000 + pRanged.width;
pRanged.Y = ALLY.MELEE.img.dy;
pRanged.act = false;
pRanged.dead = false;
pRanged.createArrow = function() {
    return new Arrow(pRanged, eMelee, eRanged, 70, 10, 12);
}
*/

// enemy melee
ENEMY.MELEE.img = Game.createImage(
	cfg.images[Tools.search('eMWlk', cfg.images)].url, {
		width: 90,
		height: 160,
		dx: 110,
		dy: canvas.height-waterCont.height-50
	}
);

mEnemySprt = Game.createSprite({
	context: ctx,
	width: 2600,
	height: 1000,
	image: ENEMY.MELEE.img,
	numFrames: ENEMY.MELEE.frames,
	ticksPerFrame: ENEMY.MELEE.tpf
});

// enemy ranged
ENEMY.RANGED.img = Game.createImage(
	cfg.images[Tools.search('eRWlk', cfg.images)].url, {
		width: 90,
		height: 160,
		dx: 0,
		dy: canvas.height-waterCont.height-50
	}
);

rEnemySprt = Game.createSprite({
	context: ctx,
	width: 2600,
	height: 1000,
	image: ENEMY.RANGED.img,
	numFrames: ENEMY.RANGED.frames,
	ticksPerFrame: ENEMY.RANGED.tpf
});

ENEMY.RANGED.weapon = Game.createWeapon({
	type: createArrow(ENEMY.RANGED, ALLY.MELEE, ALLY.RANGED, 70, 10, -7)
});

/*
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
ALLY.RANGED.damage = 30;
eRanged.width = 90;
eRanged.height = 160;
eRanged.X = 0;
eRanged.Y = canvas.height-waterCont.height-50;
eRanged.act = false;
eRanged.dead = false;
eRanged.advance = true;
eRanged.createArrow = function() {
    return new Arrow(eRanged, ALLY.MELEE, ALLY.RANGED, 70, 10, -7);
}
*/
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
winImg.src = "art/winscreen.png";

var loseImg = new Image();
loseImg.src = "art/gameover.png";

//bullet
function Arrow(from, enemy, enemy2, width, height, xSpeed) {

    this.x = from.img.dx - from.img.width;
    this.y = from.img.dy + from.img.height/4 + 13;
    this.width = width;
    this.height = height;
    this.xSpeed = xSpeed;

//arrow sound effects
    var arrowpew=document.getElementById('arrowpew'); //input arrow pew sounds
    var arrowcounter=0; //arrow pew pew counter
    var arrowpewPlayed = false;

    if (from == ALLY.RANGED){
      var bulletImg = new Image();
      bulletImg.src = "art/arrow.png";
    }
    if (from == ENEMY.RANGED){
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
        ctx.drawImage(bulletImg, this.x, this.y, this.width, this.height);
    };

    this.reset = function() {
        arrowpewPlayed = false;
        this.x = from.img.dx + from.img.width/2;
        this.y = from.img.dy + from.img.height/2;
        this.width = width;
        this.height = height;
    };

    this.update = function() {
      //if fired from friendly unit
      if (from == ALLY.RANGED){
        if (this.x < 0 || this.x < enemy.img.dx + enemy.img.width ||
            this.x < enemy2.img.dx + enemy2.img.width) {
            this.x = from.img.dx + from.img.width / 2;
            this.y = from.img.dy + from.img.height / 2;
        }
        else {
            this.x -= this.xSpeed;
        }
      }
      //if fired from hostile enemy
      if (from == ENEMY.RANGED){
        if (this.x > canvas.width || this.x > enemy.img.dx + enemy.img.width ||
            this.x > enemy2.img.dx + enemy2.img.width) {
            this.x = from.img.dx + from.img.width / 2;
            this.y = from.img.dy + from.img.height / 2;
        }
        else {
            this.x -= this.xSpeed;
        }
      }

    };
}

function createArrow(owner, enemy1, enemy2, w, h, vx) {
	return new Arrow(owner, enemy1, enemy2, w, h, vx);
};

//Should call stuff from the working.js to grab functions that calculate damage and resource.
//var pArrow = ALLY.RANGED.createArrow();
//var eArrow = ENEMY.RANGED.createArrow();

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
						//timer thing
						countDownValue = currentCountDown();

						//get time in ms and convert to seconds
						//floor it too
						nowtime = Math.floor( ((countDownValue/1000) % 60) );

						//Spawn the first wave!
						//Once timer reaches 0
						if (nowtime <= 0){
							nowtime = 0;
							ENEMY.MELEE.state = 'walking';
							ENEMY.RANGED.state = 'walking';
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

		        //call this to check if we're losing water
		        takeWater(waterCont, ENEMY.MELEE);
		        takeWater(waterCont, ENEMY.RANGED);

		        //combat
		        //call these to check if arrows are hitting
		        //hitProj(bullet, target dood)
		        hitProj(ENEMY.RANGED.weapon.type, ALLY.RANGED);
		        hitProj(ENEMY.RANGED.weapon.type, ALLY.MELEE);
		        hitProj(ALLY.RANGED.weapon.type,  ENEMY.MELEE);
		        hitProj(ALLY.RANGED.weapon.type,  ENEMY.RANGED);

		        //call this to get water with gatherer
		        //gatherWater(pGatherer);

		        if (ALLY.RANGED.state !== 'dead' && ALLY.RANGED.state !== 'inactive'){
					ALLY.RANGED.weapon.type.update();
		        }

		        if (ENEMY.RANGED.state !== 'dead' && ENEMY.RANGED.state !== 'inactive'){
					ENEMY.RANGED.weapon.type.update();
		        }

		        //friendly unit movement
		        if(ALLY.GATHERER.state !== 'inactive'){
					if (ALLY.GATHERER.state === 'walking'){
						ALLY.GATHERER.img.dx -= 5;
						gathererSprt.update();
						//call this to get water with gatherer
						gatherWater(ALLY.GATHERER);

						//forward
						if (ALLY.GATHERER.img.dx < -20){
							ALLY.GATHERER.state = 'back';
						}
					}
					else if (ALLY.GATHERER.state === 'back'){
						ALLY.GATHERER.img.dx += 5;
						//state management
						if (ALLY.GATHERER.img.dx > canvas.width + 20){
							ALLY.GATHERER.state = 'walking';
						}
					}
		        }

		        if (ALLY.MELEE.state !== 'dead'){
					ALLY.MELEE.img.dx -= 5;
					meleeSprt.update();
		        }

		        if (ALLY.RANGED.state !== 'inactive' && ALLY.RANGED.img.dx > 700 && ALLY.RANGED.state !== 'dead'){
					ALLY.RANGED.img.dx -= 5;
					rangedSprt.update();
		        }

		        //enemy unit movement
		        if (ENEMY.MELEE.state !== 'inactive' && ENEMY.MELEE.state !== 'dead'){
					ENEMY.MELEE.img.dx += 5;
					mEnemySprt.update();
		        }

		        if (ENEMY.RANGED.state !== 'inactive' && ENEMY.RANGED.state !== 'dead'){
		          checkEnemyRange(ENEMY.RANGED, ALLY.MELEE);
		          checkEnemyRange(ENEMY.RANGED, ALLY.RANGED);
		          if (ENEMY.RANGED.state === 'walking'){
					  ENEMY.RANGED.img.dx += 5;
					  rEnemySprt.update();
		          }
		        }

		        //melee combat
		        //checkCombat (friendly, enemy)
		        if (ALLY.MELEE.state !== 'dead' && ENEMY.RANGED.state !== 'inactive'){
		          checkCombat(ALLY.MELEE, ENEMY.RANGED); //melee vs ranged
		        }
		        if (ALLY.MELEE.state !== 'dead' && ENEMY.MELEE.state !== 'inactive'){
		          checkCombat(ALLY.MELEE, ENEMY.MELEE); //melee vs melee
		        }
		        if (ALLY.RANGED.state !== 'inactive' && ENEMY.MELEE.state !== 'inactive'){
		          checkCombat(ALLY.RANGED, ENEMY.MELEE); //ranged vs melee
		        }
		        if (ALLY.RANGED.state !== 'inactive' && ENEMY.RANGED.state !== 'inactive'){
		          checkCombat(ALLY.RANGED, ENEMY.RANGED); //ranged vs ranged
		        }

						//win condition
						if (rekt == winNum){
								state = "win";
						}
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

		      //Melee image and health
		      if (ALLY.MELEE.state !== 'dead'){
			  	meleeSprt.draw();
		        //ctx.drawImage(pMelee, pMelee.X, pMelee.Y, pMelee.width, pMelee.height);
		        ctx.fillStyle = "red";
		        ctx.fillRect(ALLY.MELEE.img.dx, ALLY.MELEE.img.dy + ALLY.MELEE.img.height, ALLY.MELEE.health*0.75, 15);
		      }

		      //Ranged image and health
		      if (ALLY.RANGED.state !== 'dead' && ALLY.RANGED.state !== 'inactive'){
				  rangedSprt.draw();
				  //ctx.drawImage(pRanged, pRanged.X, pRanged.Y, pRanged.width, pRanged.height);
				  ALLY.RANGED.weapon.type.y = ALLY.RANGED.img.dy + ALLY.RANGED.img.height/4 + 14;
				  ALLY.RANGED.weapon.type.draw();
				  ctx.fillStyle = "red";
				  ctx.fillRect(ALLY.RANGED.img.dx, ALLY.RANGED.img.dy + ALLY.RANGED.img.height, ALLY.RANGED.health*0.75, 15);
		      }

		      if (ALLY.GATHERER.state !== 'inactive'){
		          //Gatherer image
				  gathererSprt.draw();
				  //ctx.drawImage(ALLY.GATHERER, ALLY.GATHERER.img.dx, ALLY.GATHERER.img.dy, ALLY.GATHERER.img.width, ALLY.GATHERER.img.height);
		      }

		      //Enemy melee image and health
		      if (ENEMY.MELEE.state !== 'dead' && ENEMY.MELEE.state !== 'inactive'){
				  mEnemySprt.draw();
		          //ctx.drawImage(eMelee, eMelee.X, eMelee.Y, eMelee.width, eMelee.height);
		          ctx.fillStyle = "red";
		          ctx.fillRect(ENEMY.MELEE.img.dx, ENEMY.MELEE.img.dy + ENEMY.MELEE.img.height, ENEMY.MELEE.health*0.75, 15);
		      }

		      //Enemy ranged image and health
		      if (ENEMY.RANGED.state !== 'dead' && ENEMY.RANGED.state !== 'inactive'){
				  rEnemySprt.draw();
				  //ctx.drawImage(eRanged, eRanged.X, eRanged.Y, eRanged.width, eRanged.height);
				  ENEMY.RANGED.weapon.type.draw();
				  ctx.fillStyle = "red";
				  ctx.fillRect(ENEMY.RANGED.img.dx, ENEMY.RANGED.img.dy + ENEMY.RANGED.img.height, ENEMY.RANGED.health*0.75, 15);
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

function main(){
	update();
	draw();
}

setInterval(main, 50); //(function to repeat, milliseconds)
