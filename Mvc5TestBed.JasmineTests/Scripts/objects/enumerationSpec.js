/// <reference path="../jasmine/jasmine.js" />
/// <reference path="enumeration.js" />

describe("objects enumeration", function () {
    
    describe("aquarium", function () {

        it("should be able to get fish count by enumerating", function () {
            var numFish = 0;
            for (key in aquarium) {
                //key is the string property name for each property
                if (aquarium[key].type == "fish") {
                    numFish++;
                }
            }
            expect(numFish).toEqual(3);
        });
        it("should be able add countFish() function", function () {
            aquarium.countFish = function () {
                var numFish = 0;
                for (key in this) {
                    //key is the string property name for each property
                    if (aquarium[key].type == "fish") {
                        numFish++;
                    }
                }
                return numFish;
            }
            expect(aquarium.countFish()).toEqual(3);
        });
        it("countFish() should give correct count after taking out", function () {
            var poorDory = aquarium.takeOut("Dory");
            aquarium.countFish = function () {
                var numFish = 0;
                for (key in this) {
                    //key is the string property name for each property
                    if (aquarium[key].type == "fish") {
                        numFish++;
                    }
                }
                return numFish;
            }
            expect(aquarium.countFish()).toEqual(2);
        });
    });

    
    describe("rockSpearguns", function () {

        //var rockSpearguns = {
        //    Sharpshooter: { barbs: 2, weight: 10, heft: "overhand" },
        //    Pokepistol: { barbs: 4, weight: 8, heft: "shoulder" },
        //    Javelinjet: { barbs: 4, weight: 12, heft: "waist" },
        //    Firefork: { barbs: 6, weight: 8, heft: "overhand" },
        //    "The Impaler": { barbs: 1, weight: 30, heft: "chest" }
        //};
        it("should have listGuns() function to list guns", function () {
             function listGuns(guns) {
                var result = [];
                for (speargun in guns) {
                    //console.log(speargun);
                    result.push(speargun);
                }
                return result;
            };
            var list = listGuns(rockSpearguns);
            listGuns(rockSpearguns);
            expect(list).toEqual(["Sharpshooter", "Pokepistol", "Javelinjet", "Firefork", "The Impaler"]);
        });
        it("listGuns() should log gun heft", function () {
            function listGuns(guns) {
                var result = [];
                for (speargun in guns) {
                    //console.log("Behold! "+ speargun + ", with " + guns[speargun].heft + " heft!")
                    result.push("Behold! " + speargun + ", with " + guns[speargun].heft + " heft!");
                }
                return result;
            };
            var list = listGuns(rockSpearguns);
            expect(list).toEqual(["Behold! Sharpshooter, with overhand heft!",
                "Behold! Pokepistol, with shoulder heft!",
                "Behold! Javelinjet, with waist heft!",
                "Behold! Firefork, with overhand heft!",
                "Behold! The Impaler, with chest heft!"]);
        });
        it("listGuns() should be part of object", function () {
            rockSpearguns = {
                Sharpshooter: { barbs: 2, weight: 10, heft: "overhand" },
                Pokepistol: { barbs: 4, weight: 8, heft: "shoulder" },
                Javelinjet: { barbs: 4, weight: 12, heft: "waist" },
                Firefork: { barbs: 6, weight: 8, heft: "overhand" },
                "The Impaler": { barbs: 1, weight: 30, heft: "chest" },
                listGuns: function () {
                    var result = [];
                    for (property in this) {
                        if (this[property]["heft"]) {
                            //console.log("Behold! " + property + ", with " + this[property]["heft"] + " heft!");
                            result.push("Behold! " + property + ", with " + this[property]["heft"] + " heft!");
                        }
                    }
                    return result;
                }
            };
            var list = rockSpearguns["listGuns"]();
            expect(list).toEqual([
                "Behold! Sharpshooter, with overhand heft!",
                "Behold! Pokepistol, with shoulder heft!",
                "Behold! Javelinjet, with waist heft!",
                "Behold! Firefork, with overhand heft!",
                "Behold! The Impaler, with chest heft!"
            ]);
        });
    });

});