/// <reference path="../jasmine/jasmine.js" />
/// <reference path="functionality.js" />

describe("objects functionality", function () {
    
    describe("aquarium", function () {
        //var aquarium = {};

        beforeEach(function () {
            aquarium = {
                Nemo: { type: "fish", species: "clownfish", length: 3.7 },
                Marlin: { type: "fish", species: "clownfish", length: 4.1 },
                Dory: { type: "fish", species: "blue tang", length: 6.2 },
                Peach: { type: "echinoderm", species: "clownfish", length: 3.7 },
                "Coral Castle": { type: "environment", material: "coquina", moves: false },
                "Dragon Statue": { type: "environment", material: "plastic", moves: false },

                addCritter: function (name, type, species, length) {
                    this[name] = { type: type, species: species, length: length };
                },
                addToy: function (name, type, material, moves) {
                    this[name] = { type: type, material: material, moves: moves };
                }
            };
        });

        it("should be able to add a critter", function () {
            aquarium.addCritter("Bubbles", "fish", "yellow tang", 5.6);
            expect(aquarium.Bubbles.type).toEqual("fish");
            expect(aquarium.Bubbles.species).toEqual("yellow tang");
            expect(aquarium.Bubbles.length).toEqual(5.6);
        });

        it("should be able to add a toy", function () {
            aquarium.addToy("Treasure Chest", "environment", "plastic", true);
            expect(aquarium["Treasure Chest"].type).toEqual("environment");
            expect(aquarium["Treasure Chest"].material).toEqual("plastic");
            expect(aquarium["Treasure Chest"].moves).toEqual(true);
        });

        it("should be able to add expression to remove a fish", function () {
            aquarium.takeOut = function (name) {
                //copy the property so we can return it
                var temp = this[name];
                //delete property from the object
                delete this[name];
                return temp;
            }
            var fishOutOfWater = aquarium.takeOut("Marlin");
            expect(fishOutOfWater.type).toEqual("fish");
            expect(fishOutOfWater.species).toEqual("clownfish");
            expect(fishOutOfWater.length).toEqual(4.1);
            expect(aquarium["Marlin"]).not.toBeDefined();
        });

        it("should be able to add expression to remove a fish but preserve name", function () {
            aquarium.takeOut = function (name) {
                //add a name property to the sub-object to be removed
                this[name].name = name;
                //copy the property so we can return it
                var temp = this[name];
                //delete property from the object
                delete this[name];
                return temp;
            }
            var fishOutOfWater = aquarium.takeOut("Marlin");
            expect(fishOutOfWater.name).toEqual("Marlin");
        });

        it("should be able to add expression to remove a toy but preserve name", function () {
            aquarium.takeOut = function (name) {
                //add a name property to the sub-object to be removed
                this[name].name = name;
                //copy the property so we can return it
                var temp = this[name];
                //delete property from the object
                delete this[name];
                return temp;
            }
            var toyOutOfWater = aquarium.takeOut("Dragon Statue");
            expect(toyOutOfWater.type).toEqual("environment");
            expect(toyOutOfWater.material).toEqual("plastic");
            expect(toyOutOfWater.moves).toEqual(false);
            expect(toyOutOfWater.name).toEqual("Dragon Statue");
        });
    });

    describe("functionsAsProperties challenges", function () {
        it("should have addRanger function within lighthouseRock object", function () {

            var superBlinders = [["Firestorm", 4000], ["Solar Death Ray", 6000], ["Supernova", 12000]];
            var lighthouseRock = {
                gateClosed: true,
                weaponBulbs: superBlinders,
                capacity: 30,
                secretPassageTo: "Underwater Outpost",
                numRangers: 3,
                ranger1: { name: "Nick Walsh", skillz: "magnification burn", station: 2 },
                ranger2: { name: "Drew Barontini", skillz: "uppercut launch", station: 3 },
                ranger3: { name: "Christine Wong", skillz: "bomb defusing", station: 1 },

                addRanger: function(name, skillz, station) {
                    this.numRangers++;
                    this["ranger" + this.numRangers] = {
                        name: name,
                        skillz: skillz,
                        station: station
                    }
                }
            };

            lighthouseRock.addRanger("Jordan Wade", "dual-wield hand crossbow", 4);
            expect(lighthouseRock.numRangers).toEqual(4);
            expect(lighthouseRock.ranger4.name).toEqual("Jordan Wade");
            expect(lighthouseRock.ranger4.skillz).toEqual("dual-wield hand crossbow");
            expect(lighthouseRock.ranger4.station).toEqual(4);
        });

        it("should have dynamically added addBulb() function which adds bulbs", function () {
            var superBlinders = [["Firestorm", 4000], ["Solar Death Ray", 6000], ["Supernova", 12000]];
            var lighthouseRock = {
                gateClosed: true,
                weaponBulbs: superBlinders,
                capacity: 30,
                secretPassageTo: "Underwater Outpost",
                numRangers: 3,
                ranger1: { name: "Nick Walsh", skillz: "magnification burn", station: 2 },
                ranger2: { name: "Drew Barontini", skillz: "uppercut launch", station: 3 },
                ranger3: { name: "Christine Wong", skillz: "bomb defusing", station: 1 },

                addRanger: function (name, skillz, station) {
                    this.numRangers++;
                    this["ranger" + this.numRangers] = {
                        name: name,
                        skillz: skillz,
                        station: station
                    }
                }
            };

            lighthouseRock.addBulb = function (name, wattage) {
                this.weaponBulbs.push([name,wattage]);
            }
            lighthouseRock.addBulb("Blasterbright", 5000);
            lighthouseRock.addBulb("Sight Slayer", 1800);
            lighthouseRock.addBulb("Burner of Souls", 7500);
            expect(lighthouseRock.weaponBulbs.length).toEqual(6);
            expect(lighthouseRock.weaponBulbs[4][0]).toEqual("Sight Slayer");
            expect(lighthouseRock.weaponBulbs[3][1]).toEqual(5000);
        });

        it("vehicle should have relieveDuty() function", function () {
            var vehicle3 = {
                type: "Submarine", capacity: 8, storedAt: "Underwater Outpost",
                ranger1: { name: "Gregg Pollack", skillz: "Lasering", dayOff: "Friday" },
                ranger2: { name: "Bijan Boustani", skillz: "Roundhouse Kicks", dayOff: "Tuesday" },
                ranger3: { name: "Ashley Smith", skillz: "Torpedoing", dayOff: "Friday" },
                ranger4: { name: "Mark Krupinski", skillz: "Sniping", dayOff: "Wednesday" },
                numRangers: 4,
            };
            
            relieveDuty= function(vehicle, day) {
                var onDuty = [];
                var offDuty = [];
                for (var i = 0; i < vehicle.numRangers; i++) {
                    var curRangerName = "ranger" + (i + 1);
                    var curRanger = vehicle[curRangerName];
                    if (day == curRanger.dayOff) {
                        offDuty.push(curRanger);
                        delete vehicle[curRangerName];
                    } else {
                        onDuty.push(curRanger);
                        delete vehicle[curRangerName];
                    }
                }
                vehicle.numRangers = 0;
                for (var j = 0; j < onDuty.length; j++) {
                    vehicle["ranger" + (j + 1)] = {
                        name: onDuty[j].name,
                        skillz: onDuty[j].skillz,
                        dayOff: onDuty[j].dayOff
                    }
                    vehicle.numRangers++;
                }
                return offDuty;
            }
            var offToday = relieveDuty(vehicle3, "Friday");
            expect(vehicle3.numRangers).toEqual(2);
            expect(offToday.length).toEqual(2);
        });
    });
});