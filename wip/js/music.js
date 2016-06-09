/*
Input Music
*/
/*
var backgroundbattle = document.getElementById('backgroundbattle');
backgroundbattle.play(); //plays background music
*/

/* (music working and to be implimented)
//melee sword sounds
var swordSound = document.getElementById('swordSound');
    var swordSoundCounter=0;
    var swordSoundPlayed = false;

//menu calm music
var menuMusic = document.getElementById('menuMusic');
    var menuMusicCounter=0;
    var menuMusicPlayed = false;

//mouse click sounds
var clickySounds = document.getElementById('clickySounds');
    var clickySoundsCounter=0;
    var clickySoundsPlayed = false;

//win screen success music I guess
var successMusic = document.getElementById('successMusic');
    var successMusicCounter=0;
    var successMusicPlayed = false;
*/

/* (the plaaayys) Can be Ignored if use the other thing.
swordSound.play(); //sword shing
menuMusic.play(); //menu music (?)
clickySounds.play(); //click click sounds
successMusic.play(); //success music
*/

/* Use this if you plan on having timers I guess
//they can be placed under draw or update func for the thingies

//sword sounds//
        if(!swordSoundPlayed){ //plays it if it isn't played just in case
          swordSound.currentTime = 0;
          swordSound.play();
          swordSoundPlayed = true;
        }

        if (swordSound.ended){
          swordSoundCounter+=0.05;
          if(swordSoundCounter>=4){ //sound effect timer, adjust number to whatever
            swordSound.play();
            swordSoundCounter=0;
          }
        }
//

//menu music//
        if(!menuMusicPlayed){
          menuMusic.currentTime = 0;
          menuMusic.play();
          menuMusicPlayed = true;
        }

        if (menuMusic.ended){
          menuMusicCounter+=0.05;
          if(menuMusicCounter>=4){
            menuMusic.play();
            menuMusicCounter=0;
          }
        }
//

//clicky sounds//
        if(!clickySoundsPlayed){
          clickySounds.currentTime = 0;
          clickySounds.play();
          clickySoundsPlayed = true;
        }

        if (clickySounds.ended){
          clickySoundsCounter+=0.05;
          if(clickySoundsCounter>=4){
            clickySounds.play();
            clickySoundsCounter=0;
          }
        }
//

//successMusic//
        if(!successMusicPlayed){
          successMusic.currentTime = 0;
          successMusic.play();
          successMusic = true;
        }

        if (successMusic.ended){
          successMusicCounter+=0.05;
          if(successMusicCounter>=4){
            successMusic.play();
            successMusicCounter=0;
          }
        }
//
*/``
