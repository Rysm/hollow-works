/*
Object oriented unit implementation
Type 1 = Melee
Type 2 = Ranged
Type 3 = Gatherer
*/

//Array to hold friendly units
var friendlyMelees = new Array();
var friendlyRanged = new Array();
var friendlyGatherer = new Array();

//Function for generating player units
function unit(type){

		if (type==1){
				this.name = "pMelee";
				this.health = 100;
				this.dmg = 15;
				this.speed = 5;
				this.width = 80;
				this.height = 160;
				this.X = 1000;
				this.Y = 200;
				this.act = false;
				this.dead = false;
		}

		else (type==2){
				this.name = "pRanged";
				this.health = 70;
				this.dmg = 30;
				this.speed = 5;
				this.width = 90;
				this.height = 160;
				this.X = 1000 + pRanged.width;
				this.Y = pMelee.Y;
				this.act = false;
				this.dead = false;
		}

		else if (type==3){
				this.name = "pGatherer";
				this.speed = 5;
				this.X = 920;
				this.Y = 200;
				this.width = 80;
				this.height = 160;
				this.act = false;
				this.state = "go";
		}
}

friendlyMelees.push( unit(1) );
friendlyRanged.push( unit(2) )
friendlyGatherer.push( unit(3));
