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

//count of friendlies
var friendlies = [0, 0, 0];

//Instantiate three player unit
playerMelees.push( unit(1) ); //melee
friendlies[0]+=1;

playerRanged.push( unit(2) ); //ranged
friendlies[1]+=1;

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
			playerMelees[0].act = true;
      console.log();
      playerMelees[0].X = spawnX;
      playerMelees[0].Y = spawnY;
			makeMelee = false;
    }
  }


  else if (makeRanged){
      if (playerRanged!=null){
        playerRanged[0].X = spawnX;
        playerRanged[0].Y = spawnY;
        playerRanged[0].act = true;
				makeRanged = false;
      }
  }

  else if (makeGatherer){
      if (playerGathers!=null){
        //delete the unit from the array
        playerGathers[0].width = 80;
        playerGathers[0].height = 160;
        playerGathers[0].X = 920;
        playerGathers[0].Y = 200;
        playerGathers[0].act = true;
				makeGatherer = false;
      }
  }

}
