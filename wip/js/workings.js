/*
Behind the Scenes
Contains:
  - combat and health
*/

var level = 1; //current game level NOT PLAYER'S

var water = 100; //resource count

//win conditions
var winNum = 2;
var rekt = 0; //number killed

//check if unit died
var countM = false;
var countR = false;

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
    if (friendly.health <= 0){
      friendly.dead = true;
    }

    //check if enemy dead
    if (enemy.health <= 0){
            enemy.dead = true;

            //kill melee
            if (countM == false && enemy.name == "eMelee"){
                countM = true;
                rekt += 1;
            }
          //kill ranged
            if (countR == false && enemy.name == "eRanged"){
                countR = true;
                rekt += 1;
            }

    }

    friendly.health -= 15;
    enemy.health -= 15;

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
            if (target.health <= 0){
              target.dead = true;
              target.X = 1995;
            }

            target.health -= 30;
            projectile.reset();
          }
        }

        //conditions for hitting enemies
        //right to left
        else if (target.name === "eRanged" || target.name === "eMelee"){
          if (projectile.x <= target.X+target.width){
            //check if target dead
            if (target.health <= 0){
              target.dead = true;

              //arrow kill melee
              if (countM == false && target.name == "eMelee"){
                  countM = true;
                  rekt += 1;
              }
            //arrow kill ranged
              if (countR == false && target.name == "eRanged"){
                  countR = true;
                  rekt += 1;
              }
              target.X = -1995;
            }
            target.health -= 30;
            projectile.reset();
          }
        }
  }
}

//check if enemies are taking water
//passes in enemy and then checks coordinates
function takeWater(waterCont, enemy){
  if(((waterCont.X)>=(enemy.X+enemy.width)&&(enemy.X+enemy.width)>=(waterCont.X))){
      water -= 50;
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

//Gatherers can now pick up water
function gatherWater(unit){

  if (unit.X < -20 && unit.act){
    console.log("we here");
    water+= Math.floor( (Math.random()*50) +1);
    unit.act = false;
  }
}
