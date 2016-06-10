/*
Initiate canvas
*/
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

/*
Menu raining stuff
*/

var particles = [];

function Particle(x, y, speed, lifetime){
	this.x = x;
  this.y = y;
  this.speed = Math.random()*speed+2;
  this.lifetime = lifetime;
  this.radius = Math.random()*10+2;
}

function particle_system(numParticles){
	for(var i =0; i < numParticles; i++){
  	particles.push(new Particle(Math.random() * canvas.width, -40, 15, canvas.height));
  }
}

particle_system(100);
