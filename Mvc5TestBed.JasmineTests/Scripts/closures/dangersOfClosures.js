
//Danger! will go through entire passengerArray & return length + 1,
// even the first time this is called
// e.g. with paramaters :
//var subPassengers = ["Luke", "Leia", "Han", "Chewie", "Yoda", "R2-D2", "C-3P0", "Boba"];
//var giveAssignment = assignTorpedo("Chewie", subPassengers);
//  will return: 
//"Ahoy, Chewie!\nMan your post at Torpedo #9!"
function assignTorpedoFail(name, passengerArray) {
    var torpedoAssignment;
    for (var i = 0; i < passengerArray.length; i++) {
        torpedoAssignment = function () {
            return("Ahoy, " + name + "!\n" +
                "Man your post at Torpedo #" + (i + 1) + "!");
        };
    }
    // i loop has already run through entire array by now
    // closure occurs upon return statement
    return torpedoAssignment;
}

//one way to get arround the problem with the fail above
function assignTorpedoWithLoopBreak(name, passengerArray) {
    for (var i = 0; i < passengerArray.length; i++) {
        if (passengerArray[i] == name) {
            //break loop as soon as we find a match (i will have value of match)
            return function () {
                return ("Ahoy, " + name + "!\n" +
                   "Man your post at Torpedo #" + (i + 1) + "!");
            };
        }
    }
}

//better way to do this - name parameter passed to internal function
function makeTorpedoAssigner(passengerArray) {
    //inner function expression will deal with name
    return function (name) {
        //loop within function expression, i will come from local scope.
        // passengerArray is now bound into the closure.
        // the only closed variable from the external scope 
        //    is passengerArray (which never changes).
        for (var i = 0; i < passengerArray.length; i++) {
            if (passengerArray[i] == name) {
                return ("Ahoy, " + name + "!\n" +
                   "Man your post at Torpedo #" + (i + 1) + "!");
            }
        }
    };
}

function assignLaserFail(shark, sharkList) {
    var stationAssignment;
    for (var i = 0; i < sharkList.length; i++) {
        if (shark == sharkList[i]) {
            stationAssignment = function () {
                return("Yo, " +
                      shark +
                      "!\n" +
                      "Visit underwater strapping station " +
                      i +
                      " for your sweet laser.\n" +
                      "'Bout to get real up in here."
                     );
            };
        }
    }
    return stationAssignment;
}

function assignLaser(shark, sharkList) {
    for (var i = 0; i < sharkList.length; i++) {
        if (shark == sharkList[i]) {
            return ("Yo, " +
                      shark +
                      "!\n" +
                      "Visit underwater strapping station " +
                      i +
                      " for your sweet laser.\n" +
                      "'Bout to get real up in here."
                     );
        };
    }
}

function makeTargetAssigner(sharks, targets) {
    return function (shark) {
        for (var i = 0; i < sharks.length; i++) {
            if (shark == sharks[i]) {
                return ("What up, " +
                          sharks[i] +
                          "!\n" +
                          "There've been " +
                          targets[i] +
                          " sightings in our 'hood!\n" +
                          "Time for a swim-by lasering, homie!");
            }
        }
    };
}
