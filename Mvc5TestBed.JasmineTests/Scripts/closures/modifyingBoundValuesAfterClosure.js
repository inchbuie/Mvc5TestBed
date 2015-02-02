
function buildCoveTicketMaker(transport) {
    var passengerTrackingNumber = 0;
    return function (name) {
        passengerTrackingNumber++;
        return "Here is your transportation ticket via the " + transport + ".\n" +
            "Welcome to the Cold Closures Cove, " + name + "! " +
            "You are passenger #" + passengerTrackingNumber + ".";
    }
}

function warningMakerWithCount(obstacle) {
    var count = 0;
    return function (number, location) {
        count++;
        return ("Beware! There have been " +
              obstacle +
              " sightings in the Cove today!\n" +
              number +
              " " +
              obstacle +
              "(s) spotted at the " +
              location +
              "!\n" +
              "This is Alert #" + count + " today for " +
                obstacle + " danger."
            );
    };
}

function warningMakerWithCountAndDangerZones(obstacle) {
    var count = 0;
    var zones = [];
    return function (number, location) {
        count++;
        if (zones.indexOf(location) == -1) {
            zones.push(location);
        }
        return ("Beware! There have been " +
              obstacle +
              " sightings in the Cove today!\n" +
              number +
              " " +
              obstacle +
              "(s) spotted at the " +
              location +
              "!\n" +
              "This is Alert #" + count + " today for " +
                obstacle + " danger.\n" +
              "Current danger zones are:\n" +
              zones.join( "\n")
            );
    };
}

function warningMakerKeepTrackOfItAll(obstacle) {
    var count = 0;
    var zones = {};
    return function (number, location) {
        count++;
        zones[location] = number;
        var list = "";
        for (var key in zones) {
            if (zones.hasOwnProperty(key)) {
                list = list + "\n" + key + " (" + zones[key] + ")";

            }
        }
        return ("Beware! There have been " +
              obstacle +
              " sightings in the Cove today!\n" +
              number +
              " " +
              obstacle +
              "(s) spotted at the " +
              location +
              "!\n" +
              "This is Alert #" + count + " today for " +
                obstacle + " danger.\n" +
              "Current danger zones are:" +
              list
            );
    };
}