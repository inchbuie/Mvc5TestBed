/// <reference path="../jasmine/jasmine.js" />
/// <reference path="inheritance.js" />



describe("objects prototypes", function () {

    describe("String", function () {
        var witch;
        var scarecrow;
        var glinda;
        var dorothy;
        var lion;
        var wizard;
        var tinman;

        beforeEach(function () {
            witch = "I'll get you, my pretty...and your little dog, too!";
            scarecrow = "Well, some poeple without brains do an awful lot of talking don't they?";
            glinda = "Be gone! Before someone drops a house on you!";
            dorothy = "There's no place like home.";
            lion = "Come on, get up and fight, you shivering junkyard!";
            wizard = "Do not arouse the wrath of the great and powerful Oz!";
            tinman = "Now I know I have a heart, because it's breaking.";
        });

        //it("should be able to add countAll method to string prototype", function () {
        //    String.prototype.countAll = function (letter) {
        //        var letterCount = 0;
        //        for (var i = 0; i < this.length; i++) {
        //            if (this.charAt(i).toUpperCase() == letter.toUpperCase()) {
        //                letterCount++;
        //            }
        //        }
        //    }
        //});
        it("countAll() should return expected counts for 'a'", function () {
            String.prototype.countAll = function (letter) {
                var letterCount = 0;
                for (var i = 0; i < this.length; i++) {
                    if (this.charAt(i).toUpperCase() == letter.toUpperCase()) {
                        letterCount++;
                    }
                }
                return letterCount;
            }

            var letter = 'a';
            expect(witch.countAll(letter)).toEqual(1);
            expect(scarecrow.countAll(letter)).toEqual(4);
            expect(glinda.countAll(letter)).toEqual(1);
            expect(dorothy.countAll(letter)).toEqual(1);
            expect(lion.countAll(letter)).toEqual(2);
            expect(wizard.countAll(letter)).toEqual(4);
            expect(tinman.countAll(letter)).toEqual(5);
        });
        it("countAll() should return expected counts for 'e'", function () {
            String.prototype.countAll = function (letter) {
                var letterCount = 0;
                for (var i = 0; i < this.length; i++) {
                    if (this.charAt(i).toUpperCase() == letter.toUpperCase()) {
                        letterCount++;
                    }
                }
                return letterCount;
            }

            var letter = 'e';
            expect(witch.countAll(letter)).toEqual(3);
            expect(scarecrow.countAll(letter)).toEqual(5);
            expect(glinda.countAll(letter)).toEqual(7);
            expect(dorothy.countAll(letter)).toEqual(5);
            expect(lion.countAll(letter)).toEqual(3);
            expect(wizard.countAll(letter)).toEqual(5);
            expect(tinman.countAll(letter)).toEqual(5);
        });
        it("countAll() should return expected counts for 'I'", function () {
            String.prototype.countAll = function (letter) {
                var letterCount = 0;
                for (var i = 0; i < this.length; i++) {
                    if (this.charAt(i).toUpperCase() == letter.toUpperCase()) {
                        letterCount++;
                    }
                }
                return letterCount;
            }

            var letter = 'I';
            expect(witch.countAll(letter)).toEqual(2);
        });
        it("countAll() should return expected counts for 'o'", function () {
            String.prototype.countAll = function (letter) {
                var letterCount = 0;
                for (var i = 0; i < this.length; i++) {
                    if (this.charAt(i).toUpperCase() == letter.toUpperCase()) {
                        letterCount++;
                    }
                }
                return letterCount;
            }

            var letter = 'o';
            expect(scarecrow.countAll(letter)).toEqual(7);
        });
    });

    describe("Array.countCattle()", function () {
        var canyonCows = [];
        beforeEach(function () {
            canyonCows = [
                { name: "Bessie", type: "cow", hadCalf: "Burt" },
                { name: "Donald", type: "bull", hadCalf: null },
                { name: "Esther", type: "calf", hadCalf: null },
                { name: "Burt", type: "calf", hadCalf: null },
                { name: "Sarah", type: "cow", hadCalf: "Esther" },
                { name: "Samson", type: "bull", hadCalf: null },
                { name: "Delilah", type: "cow", hadCalf: null }
            ];

            Array.prototype.countCattle = function (type) {
                var numKind = 0;
                for (var i = 0; i < this.length; i++) {
                    if (this[i].type == type) {
                        numKind++;
                    }
                }
                return numKind;
            }
        });

        it("should return bull count", function () {
            expect(canyonCows.countCattle("bull")).toEqual(2);
        });
        it("should return cow count", function () {
            expect(canyonCows.countCattle("cow")).toEqual(3);
        });
        it("should return calf count", function () {
            expect(canyonCows.countCattle("calf")).toEqual(2);
        });
    });

    describe("Object and Array", function () {
        var forestCows = [];
        var canyonCows = [];
        var valleyCows = [];
        var badlandsCows = [];
        beforeEach(function () {
            forestCows = [
              { name: "Legolas", type: "calf", hadCalf: null },
              { name: "Gimli", type: "bull", hadCalf: null },
              { name: "Arwen", type: "cow", hadCalf: null },
              { name: "Galadriel", type: "cow", hadCalf: null },
              { name: "Eowyn", type: "cow", hadCalf: "Legolas" }
            ];
            canyonCows = [
              { name: "Bessie", type: "cow", hadCalf: "Burt" },
              { name: "Donald", type: "bull", hadCalf: null },
              { name: "Esther", type: "calf", hadCalf: null },
              { name: "Burt", type: "calf", hadCalf: null },
              { name: "Sarah", type: "cow", hadCalf: "Esther" },
              { name: "Samson", type: "bull", hadCalf: null },
              { name: "Delilah", type: "cow", hadCalf: null }
            ];
            valleyCows = [
              { name: "Danielle", type: "cow", hadCalf: null },
              { name: "Brittany", type: "cow", hadCalf: "Christina" },
              { name: "Jordan", type: "bull", hadCalf: null },
              { name: "Trevor", type: "bull", hadCalf: null },
              { name: "Christina", type: "calf", hadCalf: null },
              { name: "Lucas", type: "bull", hadCalf: null }
            ];
            badlandsCows = [
              { name: "Voldemort", type: "bull", hadCalf: null },
              { name: "Maleficent", type: "cow", hadCalf: null },
              { name: "Ursula", type: "cow", hadCalf: "Draco" },
              { name: "Draco", type: "calf", hadCalf: null },
              { name: "Joker", type: "bull", hadCalf: null },
              { name: "Chucky", type: "calf", hadCalf: null },
              { name: "Samara", type: "cow", hadCalf: "Chucky" }
            ];

            Object.prototype.noCalvesYet = function () {
                if (this.type == "cow" && this.hadCalf == null) {
                    return true;
                }
                return false;
            };

            Array.prototype.countForBreeding = function () {
                var numToBreed = 0;
                for (var i = 0; i < this.length; i++) {
                    if (this[i].noCalvesYet()) {
                        numToBreed++;
                    }
                }
                return numToBreed;
            };
        });

        it("noCalvesYet() for forestcows should return expected parent status", function () {
            expect(forestCows[0].noCalvesYet()).toEqual(false);
            expect(forestCows[1].noCalvesYet()).toEqual(false);
            expect(forestCows[2].noCalvesYet()).toEqual(true);
            expect(forestCows[3].noCalvesYet()).toEqual(true);
            expect(forestCows[4].noCalvesYet()).toEqual(false);
        });

        it("countForBreeding() for forestcows should return count", function () {
            expect(forestCows.countForBreeding()).toEqual(2);
        });
        it("countForBreeding() for canyonCows should return count", function () {
            expect(canyonCows.countForBreeding()).toEqual(1);
        });
        it("countForBreeding() for valleyCows should return count", function () {
            expect(valleyCows.countForBreeding()).toEqual(1);
        });
        it("countForBreeding() for badlandsCows should return count", function () {
            expect(badlandsCows.countForBreeding()).toEqual(1);
        });
        function getPriorityCows(arrayOfCowArrays) {
            var numPriorityCows = 0;
            for (var i = 0; i < arrayOfCowArrays.length; i++) {
                numPriorityCows += arrayOfCowArrays[i].countForBreeding();
            }
            return numPriorityCows;
        }
        it("getPriorityCows() for all cows should return count", function () {
            var actual = getPriorityCows([
                forestCows, canyonCows, valleyCows, badlandsCows
            ]);
            expect(actual).toEqual(5);
        });
    });
});