/*
Initiate canvas
*/
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

//button is the object we specificy
function handleClick(eventParams){

			  //spawn gatherer dude
			  if(checkBounds(bGatherer, eventParams.clientX, eventParams.clientY)){
								if (friendlyGatherer[activeG] != null){
					      	friendlyGatherer[activeG].act = true;
						      if(bGatherer.count > 0){
						        bGatherer.count-=1;
						      }
									activeG++;
								}
			  }

			  //spawn melee dude
			  if(checkBounds(bMelee, eventParams.clientX, eventParams.clientY)){
								if (friendlyMelees[activeM] != null){
						      	friendlyMelees[activeM].act = true;
							      if(bMelee.count > 0){
							        bMelee.count-=1;
							      }
										activeM++;
								}
			  }

			  //spawn ranged dude
			  if (checkBounds(bRanged, eventParams.clientX, eventParams.clientY)){
								if (friendlyRanged[activeR] != null){
										//arrow stuff
										friendlyRanged[activeR].createArrow = function() {
										    return new Arrow(friendlyRanged[activeR], eMelee, eRanged, 80, 20, 12);
										}
										var pArrow = friendlyRanged[activeR].createArrow();
										friendlyArrows.push(pArrow);
										//spawning
				      			friendlyRanged[activeR].act = true;
							      if(bRanged.count > 0){
							        bRanged.count-=1;
							      }
										activeR++;
								}
			  }
			  //open ui
			  if (checkBounds(uiIcon, eventParams.clientX, eventParams.clientY)){
			    if(uiActive == false){
			      uiActive = true;
			    }else{
			      uiActive = false;
			    }

			  }

				//open recruitment
				if (checkBounds(recruitmentButton, eventParams.clientX, eventParams.clientY)){
			    if(recruitmentActive == false){
			      recruitmentActive = true;
			    }else{
			      recruitmentActive = false;
			    }

			  }

			  //upgrade attack
			  if (checkBounds(uiButtonOne, eventParams.clientX, eventParams.clientY)){
			    if(uiActive && water > 11){
						water-=10;
						atkUi+=1;
			    }
			  }
			  //upgrade defense
			  if (checkBounds(uiButtonTwo, eventParams.clientX, eventParams.clientY)){
			    if(uiActive && water > 11){
						water-=10;
			      defUi+=1;
			    }
			  }
			//upgrade speed
			if (checkBounds(uiButtonThree, eventParams.clientX, eventParams.clientY)){
			  if(uiActive && water > 11){
						water-=10;
				    spdUi+=1;
			  }
			}

			  /*
			  Playbutton stuff
			  */
			  if (checkBounds(playBut, eventParams.clientX, eventParams.clientY)){
				    menu = false;
				    hero = false;
			  }

				//recruit gatherer
				if (checkBounds(recruitmentOne, eventParams.clientX, eventParams.clientY)){
					if (water > 6){
							water -= 5;
							bGatherer.count++;
							friendlyGatherer.push( unit(3) );
					}
				}

				//recruit melee
				if (checkBounds(recruitmentTwo, eventParams.clientX, eventParams.clientY)){
					if (water > 6){
							water -= 5;
							bMelee.count++;
							friendlyMelees.push( unit(1) );
					}
				}

				//recruit ranged
				if (checkBounds(recruitmentThree, eventParams.clientX, eventParams.clientY)){
					if (water > 6){
							water -= 5;
							bRanged.count++;
							friendlyRanged.push( unit(2) );
					}
				}
}

//checkboundsfunction for handleclick
function checkBounds(button, clickX, clickY){
	if(((button.width+button.X)>=(clickX)&&(clickX)>=(button.X))&&((button.height+button.Y)>=(clickY)&&(clickY)>=(button.Y))){
  	return true;
  }else{
  	return false;
  }
}

function choose(e){
	/*
	hero selection
	hero false means it hasn't been selected
	*/
	if (menu==false && hero==false){
			//select melee
			if ( (e.clientX >= 90 && e.clientX <= 405) && (e.clientY>=49 && e.clientY<=689) ){
				selectHero = "melee";
				hero=true;
			}
			//select gatherer
			else if ( (e.clientX >= 488 && e.clientX <= 832) && (e.clientY>=100 && e.clientY<=670) ){
				selectHero = "gatherer";
				hero = true;
			}

			//Hovering over ranged hero
			else if ( (e.clientX >= 876 && e.clientX <= 1217) && (e.clientY>=56 && e.clientY<=680) ){
				selectHero = "ranged";
				hero = true;
			}

	}
}
