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
var friendlies = [level, level,0];

/*
AI'S
Empty array that holds three indices also
0 = # of melee
1 = # of ranged
2 = # of gatherer
Initialize with 0 units each
*/
var baddies = [level,level,0];

//define the basics of an object's parameter
//pass in type to generate unit based on num value
//ex: playerUnit(1) = melee

function playerUnit(type){
    //melee
    if (type == 1){
      this.hp = 100;
      this.dmg = 10;
      this.speed = 5;
    }
    //ranged
    else if (type == 2){
      this.hp = 50;
      this.dmg = 30;
      this.speed = 5;
    }
    //gatherer
    else{
      //this.hp = 0;
      //this.dmg = 0;
      this.speed = 5;
    }
}
