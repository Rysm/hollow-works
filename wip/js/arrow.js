//arrow
function Arrow(from, enemy, enemy2, width, height, xSpeed) {

    this.x = from.X + from.width/2;
    this.y = from.Y + from.height/2;
    this.width = width;
    this.height = height;
    this.xSpeed = xSpeed;

//arrow sound effects
    var arrowpew=document.getElementById('arrowpew'); //input arrow pew sounds
    var arrowcounter=0; //arrow pew pew counter
    var arrowpewPlayed = false;

    if (from == pRanged){
      var bulletImg = new Image();
      bulletImg.src = "art/arrow.png";
    }
    if (from == eRanged){
      var bulletImg = new Image();
      bulletImg.src = "art/fliprow.png";
    }

    this.draw = function() {

//arrow shooting sounds in action//
        if(!arrowpewPlayed){ //plays it if it isn't played just in case
          arrowpew.currentTime = 0;
          arrowpew.play();
          arrowpewPlayed = true;
        }

        if (arrowpew.ended){
          arrowcounter+=0.05;
          if(arrowcounter>=4){ //timer for the arrows to come out
            arrowpew.play();
            arrowcounter=0;
          }
        }
//

        ctx.drawImage(bulletImg, this.x, this.y, this.width, this.height);

		return true;
    };

    this.reset = function() {
        arrowpewPlayed = false;
        this.x = from.X + from.width/2;
        this.y = from.Y + from.height/2;
        this.width = width;
        this.height = height;
    };

    this.update = function() {
      //if fired from friendly unit
      if (from == pRanged){
        if (this.x < 0 || this.x < enemy.X + enemy.width ||
            this.x < enemy2.X + enemy2.width) {
            this.x = from.X + from.width / 2;
            this.y = from.Y + from.height / 2;
        }
        else {
            this.x -= this.xSpeed;
        }
      }
      //if fired from hostile enemy
      if (from == eRanged){
        if (this.x > canvas.width || this.x > enemy.X+ enemy.width ||
            this.x > enemy2.X+enemy2.width) {
            this.x = from.X + from.width / 2;
            this.y = from.Y + from.height / 2;
        }
        else {
            this.x -= this.xSpeed;
        }
      }

    };
}
