/*
Implementation of the sidebar UI for our game on a separate canvas
I believe separating it provides a cleaner approach
*/
console.log("Wee");
//Initiate the second canvas
var sidevas = document.getElementById('sidebar');
//ctx var
var sidectx =sidevas.getContext('2d');

//Implement the image object
var basicUI = new Image();
basicUI.src = "art/sidebar.png";

//update function()
function side_update(){

}

//draw function()
function side_draw(){
  if (menu == false){
      sidectx.drawImage(basicUI,0,0, sidevas.width,sidevas.height);
  }
}

//main function
function side_main(){
  side_update();
  side_draw();
}

setInterval(side_main, 50);
