/*
Values correspond to the type of character
1 : Melee (Tanky, okay dmg)
2 : Ranged (High dmg, squishy)
3 : Gatherer (Low dmg, used for gathering resources during daytime)
*/

var type = [1,2,3]; //may be unnecessary

/*
PLAYER'S
Empty array that holds three indices also
0 = # of melee
1 = # of ranged
2 = # of gatherer
Initialize with 0 units each
*/
var playerMelees = [];
var playerRanged = [];
var playerGathers = [];
var friendlies = [playerMelees, playerRanged, playerGathers];

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
var baddies = [badMelees, badRanged];

//player's unit object class
//define the basics of an object's parameter
//pass in type to generate unit based on num value
//ex: playerUnit(1) = melee

function unit(type){
    //melee
    if (type == 1){
      this.hp = 100;
      this.dmg = 10;
      this.speed = 5;
      this.X = 0;
      this.Y = 0;
      this.src = "art/allymeleeF.png";
      this.act = true;
      this.dead = false;
    }

    //ranged
    else if (type == 2){
      this.hp = 50;
      this.dmg = 30;
      this.speed = 5;
      this.X = 0;
      this.Y = 0;
      this.src = "art/allyrangeM.png"
      this.act = true;
      this.dead = false;
    }

    //gatherer
    else{
      //this.hp = 0;
      //this.dmg = 0;
      this.speed = 5;
      this.X = 0;
      this.Y = 0;
      this.src = "";
    }
}

//spawn unit class
//pass in a unit's array and we can spawn
function spawnUnit(unitArray){

  //summon melee dude
  if (makeMelee){
    if (playerMelees!=null){
      playerMelees.splice(0,1);
    }
  }

  else if (makeRanged){
      playerRanged.splice(0,1);
  }

  else if (makeGatherer){
      playerGathers.splice(0,1);
  }
}
