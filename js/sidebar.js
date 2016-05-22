/*
Implementation of the sidebar UI for our game on a separate canvas
I believe separating it provides a cleaner approach
*/
console.log("Wee");

//Initiate the second canvas
var sidevas = document.getElementById('sidebar');

//ctx var
var sidectx =sidevas.getContext('2d');

//Variables for day
var day = 1;

//Import the image
var basicUI = new Image();
basicUI.src = "art/sidebar.png";

//update function()
function side_update(){

}

//draw function()
function side_draw(){

  //only draw side bar if game starting
  if (menu == false){

      //draw the UI image
      sidectx.drawImage(basicUI,0,0, sidevas.width,sidevas.height);

      //Day Number
      sidectx.font="50px Georgia";
      sidectx.fillStyle="black";
      sidectx.fillText("Day " + day, 135, 75);
  }
}

//main function
function side_main(){
  side_update();
  side_draw();
}

setInterval(side_main, 50);
