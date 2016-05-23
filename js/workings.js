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

  if((friendly.X)<=(enemy.X + enemy.width) && friendly.act == true){

    //check if friendly dead
    if (friendly.health <= 10){
      friendly.dead = true;
    }

    //check if enemy dead
    if (enemy.health <= 10){
      enemy.dead = true;
    }

    friendly.health -= 10;
    enemy.health -= 10;

  }
}

//check arrow collision
function hitProj(projectile, target){

  //conditions for hitting friendlies
  //enemy projectile left to right
  if (target.act){
        if (target.name === "pRanged" || target.name === "pMelee"){
          if (projectile.x >= target.X){
            //check if target dead
            if (target.health <= 10){
              target.dead = true;
              target.X = 1995;
            }

            target.health -= 10;
            projectile.reset();
          }
        }

        //conditions for hitting enemies
        //right to left
        else if (target.name === "eRanged" || target.name === "eMelee"){
          if (projectile.x <= target.X+target.width){
            //check if target dead
            if (target.health <= 10){
              target.dead = true;
              target.X = -1995;
            }
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
      if (water < 0){
        water = 0;
      }
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
