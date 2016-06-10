//Contains code for wave logic
var content_wave = new Array(); //all wave variations here

//vars to get it working
pMelee="pMelee";
pRanged="pRanged";

var levels = 1; //indexing for wave we spawn by
var enemyNum = 2; //number of bad dudes

//Used in main
var waveNum = 1;
var indexC = 0;
var startWave = false;
var waves = new Array(); //2d array incoming
var realInd = waveNum-1;

//gonna use this to get to next wave
var kills = 0;

var badArrows = new Array();

//Wave generator
while (levels <= 5){
		for (var h = 0; h < enemyNum; h++){
				typeTracker = Math.floor(Math.random() * 2) + 1;
				content_wave.push( enemy( typeTracker ));
		}
		waves.push(content_wave);
		content_wave = [] //clear it
		//increment
		levels++;
		//num of enemies doubles
		enemyNum = enemyNum*2;
}

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
							Y : 500,
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
							Y : 500,
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
