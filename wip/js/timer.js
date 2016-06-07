//timer stuff
function makeTimer(amount) {
    var startTime = Date.now();
    return function() {
       return amount - ( Date.now() - startTime );
    }
}
