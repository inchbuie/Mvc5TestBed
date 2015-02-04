

function sumOfSquares(a, b) {
    var x = add(a * a, b * b);
    return x;

    function add(c, d) {
        var a = c + d;
        return a;
    }
}

function sumOfSquares_asInternallyHoisted(a, b) {
    // how the sumOfSquares function above gets hoisted
    var x = undefined;
    function add(c, d) {
        var a = c + d;
        return a;
    }
    var x = add(a * a, b * b);
    return x;
}

function functionHoistingExample() {
    // this function will get hoisted (first) before the return (then overwritten)
    function chooseMystery() {
        return 12;
    }
    return chooseMystery(); //will return 7 not 12
    // this function will get hoisted (second) before the return
    function chooseMystery() {
        return 7;
    }
}

function functionExpressionHoisting_bad1() {
    // function expressions are never hoisted!
    //   they are treated as assignments
    var chooseMystery = function() {
        return 12;
    }
    return chooseMystery();
    //will not run:
    var chooseMystery = function () {
        return 7;
    }
}

function functionExpressionHoisting_bad1_asInternallyHoisted() {
    var chooseMystery = undefined; //var declaration
    var chooseMystery = undefined; //2nd declaration overwrites first
    chooseMystery = function () { //executable statement
        return 12;
    }
    return chooseMystery(); //executable statement
    //WILL EXECUTE & RETURN HERE!

    //unreachable code below!
    chooseMystery = function () {
        return 7;
    }
}

function functionExpressionHoisting_bad2() {
    return chooseMystery();
    //will not run:
    var chooseMystery = function () {
        return 12;
    }
    var chooseMystery = function () {
        return 7;
    }
}

function capacityStatus_bad1(numPassengers, capacity) {
    //if train is full
    if (numPassengers == capacity) {
        //    alert msg that full, return false
        noSeats();
    } else {
        //if train not full
        seatsAvail();
        //    alert msg w/ num seats remaining, return true
    }

    var noSeats = function () {
        alert("No seats left!");
        return false;
    }
    var seatsAvail = function () {
        alert("There are " + (capacity - numPassengers) + " seats left!");
        return true;
    }
}

function capacityStatus_bad1_asInternallyHoisted(numPassengers, capacity) {
    var noSeats = undefined;
    var seatsAvail = undefined;
    if (numPassengers == capacity) {        
        noSeats(); //HAS NOT BEEN DEFINED YET!
    } else {
        seatsAvail(); 
    }
    noSeats =function () {
        alert("No seats left!");
        return false;
    }
    seatsAvail =function () {
        alert("There are " + (capacity - numPassengers) + " seats left!");
        return true;
    }
}

function capacityStatus_good1(numPassengers, capacity) {
    //good way 1: use function expressions in correct order
    var noSeats = function () {
        return ("No seats left!");
    }
    var seatsAvail = function () {
        return "There are " + (capacity - numPassengers) + " seats left!";
    }
    if (numPassengers == capacity) {
        return noSeats();
    } else {
        return seatsAvail();
    }
}

function capacityStatus_good2(numPassengers, capacity) {
    //good way 2: do not use function expressions
    if (numPassengers == capacity) {
        return noSeats();
    } else {
        return seatsAvail();
    }
    function noSeats() {
        return ("No seats left!");
    }
    function seatsAvail() {
        return "There are " + (capacity - numPassengers) + " seats left!";
    }
}
function capacityStatus_good2_asInternallyHoisted(numPassengers, capacity) {
    function noSeats() {
        return ("No seats left!");
    }
    function seatsAvail() {
        return "There are " + (capacity - numPassengers) + " seats left!";
    }
    if (numPassengers == capacity) {
        return noSeats();
    } else {
        return seatsAvail();
    }
}