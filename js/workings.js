/*
Behind the Scenes
Contains:
  - combat and health
*/

var level = 1; //current game level NOT PLAYER'S

var water = 100; //resource count

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
  if (target.act){
        if (target.name === "pRanged" || target.name === "pMelee"){
          if (projectile.x >= target.X){
            target.act = false;
            console.log(target.name + "is" + target.act);
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
            console.log(target.name + " is " + target.act);
            target.X = -500;
            target.Y = 2000;
            target.dead = true;//rekt
            projectile.reset();
          }
        }
  }
}


//check if enemies are taking water
//passes in enemy and then checks coordinates
function takeWater(waterCont, enemy){
  if(((waterCont.X)>=(enemy.X+enemy.width)&&(enemy.X+enemy.width)>=(waterCont.X))){
      water -= 90;
      enemy.X = 2000;
  }
}

//check range option
//pass in unit to check forward range
//(unit attacking, target getting hit)
function checkEnemyRange(unit, target){
  if (unit.x+400 >= target.x && target.act){
     unit.advance = false;
  }
  else {
    unit.advance = true;
  }
}
