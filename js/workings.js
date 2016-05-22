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

//check collisions to see if people are fighting
function checkCombat(friendly, enemy){
  if((friendly.X)<=(enemy.X + enemy.width) && friendly.act == true){ //idk wtf
    friendly.act = false;
    enemy.act = false;
    //friendly.X = 128937432857362;
    //friendly.Y = 2000;
    //enemy.X = -500;
    //enemy.Y = 2000;
    //friendly.dead = true; //wasted
    //enemy.dead = true;
    //friendly.health -= 10;
    //enemy.health -= 10;
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
            //target.X = 2000;
            //target.Y = 2000;
            //target.dead = true;
            target.health -= 10;
            projectile.reset();
          }
        }

        //conditions for hitting enemies
        //right to left
        else if (target.name === "eRanged" || target.name === "eMelee"){
          if (projectile.x <= target.X+target.width){
            target.act = false;
            console.log(target.name + " is " + target.act);
            //target.X = -500;
            //target.Y = 2000;
            target.health -= 10;
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
