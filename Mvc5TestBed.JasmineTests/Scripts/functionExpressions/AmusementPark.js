
//function AmusementPark(parkRides, fastPassQueue) {
    //parkRides = parkRides || (
    //    [  // ride, line wait time
    //    ["Birch Bumpers", 40]
    //    ["Pines Plunge", 55],
    //    ["Cedar Coaster", 20],
    //    ["Ferris Wheel of FIrst", 90]
    //]);
    //fastPassQueue = fastPassQueue ||
    //    ["Cedar Coaster", "Pines Plunge", "Birch Bumpers", "Pines Plunge"];
//}



//AmusementPark.prototype.getRideTicket =
function getRideTicket(parkRides, fastPassQueue, pick) {
        if (fastPassQueue[0] == pick) {
            var pass = fastPassQueue.shift();
            return function () {
                return ("Quick! You've got a Fast Pass to " + pass + "!");
            };
        } else {
            for (var i = 0; i < parkRides.length; i++) {
                //var ride = this.parkRides[i];
                if (parkRides[i][0] == pick) {
                    //returning function from a function w/ vars from external scope: a closure
                    return function () {
                        return ("A ticket is printing for " + pick + "!\n" +
                            "Your wait time is about " + parkRides[i][1] + " minutes.");
                    };
                }
            }
        }

};
//AmusementPark.prototype.getRideTicket =
//    function getRideTicket(pick) {
//        if (this.fastPassQueue[0] == pick) {
//            var pass = this.fastPassQueue.shift();
//            return function () {
//                return ("Quick! You've got a Fast Pass to " + pass + "!");
//            };
//        } else {
//            for (var i = 0; i < this.parkRides.length; i++) {
//                var ride = this.parkRides[i];
//                if (ride[0] == pick) {
//                    //returning function from a function w/ vars from external scope: a closure
//                    return function () {
//                        return ("A ticket is printing for " + pick + "!\n" +
//                            "Your wait time is about " + ride[1] + " minutes.");
//                    };
//                }
//            }
//        }
//    };

//var wantsRide = "Birch Bumpers";
//var ticket = buildTicket(parkRides, fastPassQueue, wantsRide);
//alert(ticket());