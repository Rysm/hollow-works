/*
Values correspond to the type of character
1 : Melee (Tanky, okay dmg)
2 : Ranged (High dmg, squishy)
3 : Gatherer (Low dmg, used for gathering resources during daytime)
*/

var type = [1,2,3]; //may be unnecessary

var makeMelee, makeRanged, makeGatherer = false;

var playerProjs = new Array();

/*
PLAYER'S
Empty array that holds three indices also
0 = # of melee
1 = # of ranged
2 = # of gatherer
Initialize with 0 units each
*/

var playerMelees = new Array();
var playerRanged = new Array();
var playerGathers = new Array();

/*
AI'S
Empty array that holds three indices also
0 = # of melee
1 = # of ranged
2 = # of gatherer
Initialize with 0 units each
*/
var badMelees = [];
var badRanged = [];

//count of enemies
var baddies = [0, 0];

//melee unit object
var unitMelee = {
    			name : "pMelee",
          hp : 100,
          dmg : 15,
          speed : 5,
          width : 80,
          height : 160,
          X : 1000,
          Y : 540,
          act : true,
          dead : false
};

//ranged unit object
var unitRanged = {
    			name : "pRanged",
          hp : 100,
          dmg : 15,
          speed : 5,
          width : 80,
          height : 160,
          X : 1000,
          Y : 540,
          act : true,
          dead : false
};

//gatherer unit object
var unitGatherer = {
    			name : "pGatherer",
          hp : 100,
          dmg : 15,
          speed : 5,
          width : 80,
          height : 160,
          X : 920,
          Y : 200,
          act : true,
          dead : false
};
