/*
Behind the Scenes
Contains:
  - combat and health
*/

var level = 1; //current game level NOT PLAYER'S

var water = 100; //resource count

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

//bullet
var Bullet = function(velocity, rectangle) {
    this.vx = velocity;
    this.rect = rectangle;

    this.Update = function() {
        this.rect += this.vx;
    }
};

//character prototypes
function character(name, type){
  //if it's melee
  if (type == 1){
    this.name = "melee"
    this.hp = 100;
    this.dmg = 10;
  }
  //if it's ranged
  if (type ==2){
    this.name = "ranged";
    this.hp = 50;
    this.dmg = 30;
  }
  //if it's gatherer
  /*NOT IN MONDAY PROTOTYPE
  if (type==3){
    this.name = "gatherer";
    this.hp = 0;
    this.dmg =0;
  }
  */
}

//enemy generating
//Not implemented in prototype
function spawnEnemy(){

}

//check collisions to see if people are fighting
function checkCombat(friendly, enemy){
  if(((friendly.X)>=(enemy.X)&&(enemy.X)>=(friendly.X))){
    friendly.X = -500;
    friendly.Y = 2000;
    enemy.Y = 2000;
    enemy.X = -500;
    friendly.dead = true;
    enemy.dead = true;
  }
}

//check arrow collision
function hitProj(projectile, target){
  if(((projectile.X)>=(target.X)&&(target.X)>=(projectile.X))){
    target.X = -500;
    target.Y = 2000;
    target.dead = true;
  }
}

//check if enemies are taking water
//passes in enemy and then checks coordinates
function takeWater(waterCont, enemy){
  if(((waterCont.X)>=(enemy.X)&&(enemy.X)>=(waterCont.X))){
      enemy.X = 2000;
      water -= 123127389;
  }
}
