/// <reference path="../jasmine/jasmine.js" />
/// <reference path="AmusementPark.js" />

describe("AmusementPark", function () {
    describe("getRideTicket()", function () {
        //var park;
        var parkRides;
        var fastPassQueue;
        var wantsRide

        beforeEach(function() {

            parkRides = [  
                ["Birch Bumpers", 40]
                ,["Pines Plunge", 55]
                ,["Cedar Coaster", 20]
                ,["Ferris Wheel of FIrst", 90]
            ];
            fastPassQueue = ["Cedar Coaster", "Pines Plunge", "Birch Bumpers", "Pines Plunge"];
            //park = new AmusementPark(parkRides, fastPassQueue);
        });

        it("should return normal wait time if no fast pass", function () {
            wantsRide = "Birch Bumpers";
            var expected = "A ticket is printing for " + wantsRide +  "!\n" +
                            "Your wait time is about " + 40 + " minutes.";
            //var result = park.getRideTicket( wantsRide);
            var result = getRideTicket(parkRides, fastPassQueue, wantsRide);
            expect(result()).toEqual(expected);
        });

        it("should return fast pass if available", function () {
            wantsRide = "Cedar Coaster";
            var expected =  "Quick! You've got a Fast Pass to " + wantsRide + "!";
            //var result = park.getRideTicket(wantsRide);
            var result = getRideTicket(parkRides, fastPassQueue, wantsRide);
            expect(result()).toEqual(expected);
        });
    });
});