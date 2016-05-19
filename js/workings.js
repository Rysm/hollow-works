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
  if((friendly.X)<=(enemy.X + enemy.width) && friendly.act == true){ //idk wtf
    friendly.act = false;
    enemy.act = false;
    friendly.X = 128937432857362;
    friendly.Y = 2000;
    enemy.X = -500;
    enemy.Y = 2000;
    friendly.dead = true; //wasted
    enemy.dead = true;
  }
}

//check arrow collision
function hitProj(projectile, target){
  //conditions for hitting friendlies
  //enemy projectile left to right
  if (target.name === "pRanged" || target.name === "pMelee"){
    if (projectile.x >= target.X){
      target.act = false;
      target.X = 2000;
      target.Y = 2000;
      target.dead = true;
      projectile.reset();
    }
  }

  //conditions for hitting enemies
  //right to left
  else if (target.name === "eRanged" || target.name === "eMelee"){
    if (projectile.x <= target.X+target.width){
      target.act = false;
      target.X = -500;
      target.Y = 2000;
      target.dead = true;//rekt
      projectile.reset();
    }
  }
}


//check if enemies are taking water
//passes in enemy and then checks coordinates
function takeWater(waterCont, enemy){
  if(((waterCont.X)>=(enemy.X+enemy.width)&&(enemy.X+enemy.width)>=(waterCont.X))){
      enemy.X = 2000;
      water -= 90;
  }
}

//check range option
//pass in unit to check forward range
//(unit attacking, target getting hit)
function checkEnemyRange(unit, target){
  if (unit.x+400 >= target.x && target.act){
     unit.advance = false;
     console.log("enemy spotted");
  }
  else {
    unit.advance = true;
  }

}
