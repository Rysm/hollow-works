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
var friendlyArrows = new Array();

//Function for generating player units
function unit(type){

		if (type==1){
				var unit_obj = {
					name : "pMelee",
					health : 100,
					dmg : 15,
					speed : 5,
					width : 80,
					height : 160,
					X : 1000,
					Y : 500,
					act : false,
					dead : false
				}
		}

		else if (type==2){
				var unit_obj = {
					name : "pRanged",
					health : 70,
					dmg : 30,
					speed : 5,
					width : 90,
					height : 160,
					X : 1090,
					Y : 500,
					act : false,
					dead : false
				}
		}

		else if (type==3){
				var unit_obj = {
						name : "pGatherer",
						speed : 5,
						X : 920,
						Y : 200,
						width : 80,
						height : 160,
						act : false,
						state : "go"
				}
		}
		return unit_obj;
}

friendlyMelees.push( unit(1) );
friendlyRanged.push( unit(2) )
friendlyGatherer.push( unit(3) );

/*Function for generating enemy units
Only two types
type 1 = melee
type 2 = range
*/
function enemy(type){
			if (type == 1){

			}

			else if (type==2){

			}

}
