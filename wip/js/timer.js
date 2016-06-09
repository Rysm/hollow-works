//timer stuff
function makeTimer(amount) {
    var startTime = Date.now();
    return function() {
       return amount - ( Date.now() - startTime );
    }
}

//var currentCountDown =  makeTimer(30000);
var currentCountDown =  makeTimer(3);
