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

//unit counts
meleeCount = 0;
rangedCount = 0;
gathererCount = 0;

//count of friendlies
var friendlies = [0, 0, 0];

//Instantiate three player unit
playerMelees.push( unit(1) ); //melee
friendlies[0]+=1;
playerMelees.push( unit(1) ); //melee
friendlies[0]+=1;
playerMelees.push( unit(1) ); //melee
friendlies[0]+=1;
playerMelees.push( unit(1) ); //melee
friendlies[0]+=1;


playerRanged.push( unit(2) ); //ranged
friendlies[1]+=1;
playerRanged.push( unit(2) ); //ranged
friendlies[1]+=1;
playerRanged.push( unit(2) ); //ranged
friendlies[1]+=1;
playerRanged.push( unit(2) ); //ranged
friendlies[1]+=1;
playerRanged.push( unit(2) ); //ranged
friendlies[1]+=1;

playerGathers.push( unit(3) ); //gatherer
friendlies[2]+=1;
playerGathers.push( unit(3) ); //gatherer
friendlies[2]+=1;
playerGathers.push( unit(3) ); //gatherer
friendlies[2]+=1;
playerGathers.push( unit(3) ); //gatherer
friendlies[2]+=1;




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

//Coordinate variables for combat
var spawnX = 1000;
var spawnY = 540;

//player's unit object class
//define the basics of an object's parameter
//pass in type to generate unit based on num value
//ex: playerUnit(1) = melee

function unit(type){
    //melee
    if (type == 1){
      return {
  			name : "pMelee",
        hp : 100,
        dmg : 15,
        speed : 5,
        width : 80,
        height : 160,
        X : 0,
        Y : 0,
        act : false,
        dead : false
      };
    }

    //ranged
    else if (type == 2){

      return {
  			name : "pRanged",
        hp : 70,
        dmg : 30,
        speed : 5,
        width : 90,
        height : 160,
        X : 0,
        Y : 0,
        act : false,
        dead : false
      }
    }

    //gatherer
    else{

      return {
  			name : "pGatherer",
        speed : 5,
  			width : 80,
  			height : 160,
        X : 0,
        Y : 0,
        act : false,
        state: "go"
      }
    }

}

//spawn unit class
//pass in a unit's array and we can spawn
function spawnUnit(unitArray){

  //summon melee dude
  if (makeMelee){
    if (playerMelees!=null){
			playerMelees[meleeCount].act = true;
      playerMelees[meleeCount].X = spawnX;
      playerMelees[meleeCount].Y = spawnY;
			makeMelee = false;
      if (meleeCount<playerMelees.length){
        meleeCount+=1;
      }
      if(friendlies[0] > 0){
        friendlies[0]-=1;
      }
    }
  }


  if (makeRanged){
      if (playerRanged!=null){
        playerRanged[rangedCount].act = true;
        playerRanged[rangedCount].X = spawnX;
        playerRanged[rangedCount].Y = spawnY;
				makeRanged = false;
        if (rangedCount<playerRanged.length){
          rangedCount+=1;
        }
        if(friendlies[1] > 0){
           friendlies[1]-=1;
        }
      }
  }

  if (makeGatherer){
      if (playerGathers!=null){
        playerGathers[gathererCount].act = true;
        playerGathers[gathererCount].width = 80;
        playerGathers[gathererCount].height = 160;
        playerGathers[gathererCount].X = 920;
        playerGathers[gathererCount].Y = 200;
				makeGatherer = false;
        if (gathererCount<playerGathers.length){
          gathererCount+=1;
        }
        if(friendlies[2] > 0){
          friendlies[2]-=1;
        }
      }
  }

}
