//Contains code for wave logic
var waves = new Array(); //2d array incoming
var content_Wave = new Array();

var curr_wave = 1; //indexing for wave we spawn by

/*Function for generating enemy units
Only two types
type 1 = melee
type 2 = range
*/
function enemy(type){
			if (type == 1){
						var bad_obj = {
							name : "eMelee",
							dmg : 15,
							health : 100,
							width : 80,
							height : 160,
							X : 110,
							Y : canvas.height-waterCont.height-50,
							act : false,
							dead : false
						}
			}

			else if (type==2){
						var bad_obj = {
							name : "eRanged",
							health : 70,
							dmg : 30,
							width : 90,
							height : 160,
							X : 0,
							Y : canvas.height-waterCont.height-50,
							act : false,
							dead : false,
							advance : true
						}
			}
			return bad_obj;
}


/*
//Should call stuff from the working.js to grab functions that calculate damage and resource.
var eArrow = eRanged.createArrow();

eRanged.createArrow = function() {
    return new Arrow(eRanged, pMelee, pRanged, 20, 5, -7);
}
*/
