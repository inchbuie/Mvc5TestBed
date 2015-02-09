/// <reference path="../jasmine/jasmine.js" />
/// <reference path="prototypes.js" />



describe("prototypes", function () {

    describe("String.prototype.countAll", function () {
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

    describe("countCattle() Array prototype", function () {
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
    describe("cattle breeding prototypes", function () {
        var forestCows=[];
        beforeEach(function () {
            forestCows = [
              { name: "Legolas", type: "calf", hadCalf: null },
              { name: "Gimli", type: "bull", hadCalf: null },
              { name: "Arwen", type: "cow", hadCalf: null },
              { name: "Galadriel", type: "cow", hadCalf: null },
              { name: "Eowyn", type: "cow", hadCalf: "Legolas" }
            ];

            Object.prototype.noCalvesYet = function () {
                for (var i = 0; i < this.length; i++) {
                    if (this[i].hadCalf != null) {
                        return false;
                    }
                }
                return true;
            }

            Array.prototype.countForBreeding = function () {
                var notMotherCount = 0;
                for (var i = 0; i < this.length; i++) {
                    if (this[i].noCalvesYet) {
                        notMotherCount++;
                    }
                }
                return notMotherCount;
            }
        });
    });
});