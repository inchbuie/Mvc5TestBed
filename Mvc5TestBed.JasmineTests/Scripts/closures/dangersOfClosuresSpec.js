/// <reference path="../jasmine/jasmine.js" />
/// <reference path="dangersOfClosures.js" />



describe("closures dangers: ", function () {

    describe("assignTorpedo()", function () {
        var subPassengers = [];
        beforeEach(function () {
            subPassengers = ["Luke", "Leia", "Han", "Chewie", "Yoda", "R2-D2", "C-3P0", "Boba"];
        });

        describe("fail", function () {
            it("iterates entire array & returns 9 for any", function () {
                var giveAssignment = assignTorpedoFail("Chewie", subPassengers);
                // the closure binds the value at last moment
                //will go through entire array & return 9, not 1 as you might expect
                expect(giveAssignment())
                    .toEqual("Ahoy, Chewie!\nMan your post at Torpedo #9!");
            });
        });
        describe("withLoopBreak", function () {
            it("breaks loop & returns 4 for Chewie", function () {
                var giveAssignment = assignTorpedoWithLoopBreak("Chewie", subPassengers);
                expect(giveAssignment())
                    .toEqual("Ahoy, Chewie!\nMan your post at Torpedo #4!");
            });
        });
        describe("makeTorpedoAssigner", function () {
            it("returns 4 for Chewie", function () {
                var getTorpedoFor = makeTorpedoAssigner(subPassengers);
                expect(getTorpedoFor("Chewie"))
                    .toEqual("Ahoy, Chewie!\nMan your post at Torpedo #4!");
            });
            it("returns 6 for R2-D2", function () {
                var getTorpedoFor = makeTorpedoAssigner(subPassengers);
                expect(getTorpedoFor("R2-D2"))
                    .toEqual("Ahoy, R2-D2!\nMan your post at Torpedo #6!");
            });
        });
    });
    
    describe("assignLaser()", function () {
        var sharkList = [];
        beforeEach(function () {
            sharkList = ["Sea Pain", "Great Wheezy", "DJ Chewie",
                "Lil' Bitey", "Finmaster Flex", "Swim Khalifa",
                "Ice Teeth", "The Notorious J.A.W."];
        });
        
        describe("fail version", function () {
            it("iterates entire array & returns 9", function () {
                var station = assignLaserFail("Lil' Bitey", sharkList);
                expect(station())
                    .toEqual("Yo, Lil' Bitey!\n" +
                  "Visit underwater strapping station 8 for your sweet laser.\n" +
                  "'Bout to get real up in here.");
            });
        });

        describe("good version", function () {
            it("returns 3 for Lil' Bitey", function () {
                var station = assignLaser("Lil' Bitey", sharkList);
                expect(station)
                    .toEqual("Yo, Lil' Bitey!\n" +
                  "Visit underwater strapping station 3 for your sweet laser.\n" +
                  "'Bout to get real up in here.");
            });
        });
    });

    describe("makeTargetAssigner()", function () {

        var listOfSharks = [];
        var listOfTargets = [];
        beforeEach(function () {
            listOfSharks = ["Sea Pain", "Great Wheezy", "DJ Chewie", "Lil' Bitey",
                       "Finmaster Flex", "Swim Khalifa", "Ice Teeth", "The Notorious J.A.W."];
            listOfTargets = ["icicle bat", "snow yeti", "killer penguin", "frost tiger",
                                 "polar bear", "iceberg", "blue witch", "wooly mammoth"];
        });

        it("returns blue witch for Ice Teeth", function () {
            var getTargetFor = makeTargetAssigner(listOfSharks, listOfTargets);
            var result = getTargetFor("Ice Teeth");
            var expected = "What up, Ice Teeth!\n" +
                        "There've been blue witch sightings in our 'hood!\n" +
                        "Time for a swim-by lasering, homie!";
            expect(getTargetFor("Ice Teeth")).toEqual(expected);
        });
        it("returns polar bear for Finmaster Flex", function () {
            var getTargetFor = makeTargetAssigner(listOfSharks, listOfTargets);
            var expected = "What up, Finmaster Flex!\n" +
                        "There've been polar bear sightings in our 'hood!\n" +
                        "Time for a swim-by lasering, homie!";
            expect(getTargetFor("Finmaster Flex")).toEqual(expected);
        });
        it("returns wooly mammoth for The Notorious J.A.W.", function () {
            var getTargetFor = makeTargetAssigner(listOfSharks, listOfTargets);
            var expected = "What up, The Notorious J.A.W.!\n" +
                        "There've been wooly mammoth sightings in our 'hood!\n" +
                        "Time for a swim-by lasering, homie!";
            expect(getTargetFor("The Notorious J.A.W.")).toEqual(expected);
        });
        it("returns icicle bat for Sea Pain", function () {
            var getTargetFor = makeTargetAssigner(listOfSharks, listOfTargets);
            var expected = "What up, Sea Pain!\n" +
                        "There've been icicle bat sightings in our 'hood!\n" +
                        "Time for a swim-by lasering, homie!";
            expect(getTargetFor("Sea Pain")).toEqual(expected);
        });
    });
   
});