/*
Behind the Scenes
Contains:
  - combat and health
*/

var water = 0; //resource count

/*
Values correspond to the type of character
1 : Melee (Tanky, okay dmg)
2 : Ranged (High dmg, squishy)
3 : Gatherer (Low dmg, used for gathering resources during daytime)
*/
var type = [1,2,3]; //may be unnecessary

//character prototypes
function character(name, type){
  //if it's melee
  if (type == 1){
    this.name = "melee"
    this.hp = 0;
  }
  //if it's ranged
  if (type ==2){
    this.name = "ranged";
    this.hp = 0;
  }
  //if it's gatherer
  if (type==3){
    this.name = "gatherer";
    this.hp = 0;
  }
}


//check collisions to see if people are fighting
function checkCombat(){
  combat();
}

// calculate combat stuff
// range of attacks depending on character type?
function combat(){

}

//enemy generating
function spawnEnemy(){

}
