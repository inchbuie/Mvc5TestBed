/// <reference path="../jasmine/jasmine.js" />
/// <reference path="overridingPrototypalMethods.js" />




describe("objects prototypes", function () {

    //implicit number
    var x = 4;
    //string
    var y = "4";
    //array
    var a = [3, "blind", "mice"];
    //explicit number
    var b = new Number(6);

    describe("overriding prototypal methods: valueOf()", function () {

        beforeEach(function () {
        });
        
        it("should be optimistic with ==", function () {
            expect(x.valueOf() == y.valueOf()).toEqual(true);
        });

        it("should be picky with ===", function () {
            expect(x.valueOf() === y.valueOf()).toEqual(false);
        });
        it("should return what you'd expect for built-in JS types", function () {
            expect(x.valueOf()).toEqual(4);
            expect(y.valueOf()).toEqual("4");
            expect(a.valueOf()).toEqual([3, "blind", "mice"]);
            expect(b.valueOf()).toEqual(6);
        });
        //it("should return entire object for custom objects", function () {
        //    //object with function expression for constructor
        //    var Tornado = function (category, affectedAreas, windGust) {
        //        this.category = category;
        //        this.affectedAreas = affectedAreas;
        //        this.windGust = windGust;
        //    };
        //    //array of cities/populations
        //    var cities = [["Kansas City", 464310], ["Topeka", 127939], ["Lenexa", 49398]];
        //    var twister = new Tornado("F5", cities, 220);

        //    expect(twister.valueOf()).toEqual(
        //           {
        //               category: "F5", affectedAreas: [["Kansas City", 464310], ["Topeka", 127939], ["Lenexa", 49398]], windGust: 220
        //           }
        //        );
        //});
        it("can be overridden for one object", function () {
            //object with function expression for constructor
            var Tornado = function (category, affectedAreas, windGust) {
                this.category = category;
                this.affectedAreas = affectedAreas;
                this.windGust = windGust;
            };
            //array of cities/populations
            var cities = [["Kansas City", 464310], ["Topeka", 127939], ["Lenexa", 49398]];
            var twister = new Tornado("F5", cities, 220);
            //override valueOf (but only for Tornado object!) to give affected population
            Tornado.prototype.valueOf = function () {
                var sum = 0;
                for (var i = 0; i < this.affectedAreas.length; i++) {
                    sum += this.affectedAreas[i][1];
                }
                return sum;
            };
            expect(twister.valueOf()).toEqual( 464310+127939+49398);
        });
        it("when overridden for one object, updates automatically", function () {
            //object with function expression for constructor
            var Tornado = function (category, affectedAreas, windGust) {
                this.category = category;
                this.affectedAreas = affectedAreas;
                this.windGust = windGust;
            };
            //array of cities/populations
            var cities = [["Kansas City", 464310], ["Topeka", 127939], ["Lenexa", 49398]];
            var twister = new Tornado("F5", cities, 220);
            //override valueOf (but only for Tornado object!) to give affected population
            Tornado.prototype.valueOf = function () {
                var sum = 0;
                for (var i = 0; i < this.affectedAreas.length; i++) {
                    sum += this.affectedAreas[i][1];
                }
                return sum;
            };
            expect(twister.valueOf()).toEqual(464310 + 127939 + 49398);
            twister.affectedAreas[1][1] = 195120;
            expect(twister.valueOf()).toEqual(464310 + 195120 + 49398);
        });
    });
    
    describe("overriding prototypal methods: toString()", function () {

        var twister = {};
        var cities = []
        beforeEach(function () {

            //object with function expression for constructor
            Tornado = function (category, affectedAreas, windGust) {
                this.category = category;
                this.affectedAreas = affectedAreas;
                this.windGust = windGust;
            };
            Tornado.prototype.valueOf = function () {
                var sum = 0;
                for (var i = 0; i < this.affectedAreas.length; i++) {
                    sum += this.affectedAreas[i][1];
                }
                return sum;
            };
            //array of cities/populations
            cities = [["Kansas City", 464310], ["Topeka", 127939], ["Lenexa", 49398]];
            twister = new Tornado("F5", cities, 220);
            cities.push(["Olathe", 130045]);
        });
        
        it("is uninteresting for built-in types", function () {
            //numbers
            expect(x.toString()).toEqual("4");
            //strings...
            expect(y.toString()).toEqual("4");
            //arrays as string commma-separated list
            expect(a.toString()).toEqual("3,blind,mice");
            //function
            var double = function (param) { return param * 2; };
            expect(double.toString()).toEqual("function (param) { return param * 2; }");
        });

        it("can be overridden to produce formatted output", function () {
            Tornado.prototype.toString = function () {
                var list = "";
                for (var i = 0; i < this.affectedAreas.length; i++) {
                    if (i < this.affectedAreas.length - 1) { //not next-to-last one
                        list = list + this.affectedAreas[i][0] + ", ";
                    } else {
                        list = list + "and " + this.affectedAreas[i][0];
                    }
                }
                return longFormattedMsg = "This tornado has been classified as an " + this.category +
                    ", with wind gusts up to " + this.windGust + "mph. Affected areas are: " +
                    list +
                    ", potentially affecting a population of " + this.valueOf() + "."
                return longFormattedMsg;;
            }

            var expectedPopulation = 464310 + 127939 + 49398 + 130045;
            expect(twister.toString()).toEqual("This tornado has been classified as an " + "F5" +
                    ", with wind gusts up to " + "220" + "mph. Affected areas are: " +
                    "Kansas City, Topeka, Lenexa, and Olathe" +
                    ", potentially affecting a population of " + expectedPopulation + "."
                );
        });
        it("can find an object's constructor and prototype", function () {
            var ctor = twister.constructor.toString();
            var expectedCtor = "function (category, affectedAreas, windGust) {\r\n" +
                "                this.category = category;\r\n" +
                "                this.affectedAreas = affectedAreas;\r\n" +
                "                this.windGust = windGust;\r\n" +
                "            }";
            expect(ctor).toEqual(expectedCtor);

            //if a prototype Object is defined for a specific class, 
            // it will always be a property of the class constructor.
            // (constructor is just another function object)
            expect(twister.constructor.prototype)
                .toEqual(Tornado.prototype);
            //could also get twister.__proto__
            expect(twister.__proto__)
                .toEqual(Tornado.prototype);
        });
    });
    describe("overriding prototypal methods: hasOwnProperty()", function () {

        var twister = {};
        var cities = []
        beforeEach(function () {

            //object with function expression for constructor
            Tornado = function (category, affectedAreas, windGust) {
                this.category = category;
                this.affectedAreas = affectedAreas;
                this.windGust = windGust;
            };
            Tornado.prototype.valueOf = function () {
                var sum = 0;
                for (var i = 0; i < this.affectedAreas.length; i++) {
                    sum += this.affectedAreas[i][1];
                }
                return sum;
            };
            Tornado.prototype.toString = function () {
                var list = "";
                for (var i = 0; i < this.affectedAreas.length; i++) {
                    if (i < this.affectedAreas.length - 1) { //not next-to-last one
                        list = list + this.affectedAreas[i][0] + ", ";
                    } else {
                        list = list + "and " + this.affectedAreas[i][0];
                    }
                }
                return longFormattedMsg = "This tornado has been classified as an " + this.category +
                    ", with wind gusts up to " + this.windGust + "mph. Affected areas are: " +
                    list +
                    ", potentially affecting a population of " + this.valueOf() + "."
                return longFormattedMsg;;
            };
            //array of cities/populations
            cities = [["Kansas City", 464310], ["Topeka", 127939], ["Lenexa", 49398]];
            twister = new Tornado("F5", cities, 220);
            cities.push(["Olathe", 130045]);
        });

        
        it("can be used to add function to Object prototype", function () {
            Object.prototype.findOwnerOfProperty = function (propName) {
                var curObj = this;
                //go up chain
                while (curObj !== null) {
                    if (curObj.hasOwnProperty(propName)) {
                        return curObj;
                    } else {
                        curObj = curObj.__proto__;
                    }
                }
                //went up chain & didn't find anything
                return "No property found!";
            };
            //doesn't find valueOf on twister but does on prototype
            expect(twister.findOwnerOfProperty("valueOf"))
                .toEqual(Tornado.prototype);
            //nothing for twister, prototype, or Object
            expect(twister.findOwnerOfProperty("goToOz"))
                .toEqual("No property found!");
        });
    });

    
    describe("overriding prototypal methods challenge", function () {

        function Fencepost(x, y, postNum) {
            this.x = x;
            this.y = y;
            this.postNum = postNum;
            this.connectionsTo = [];
        }
        var post18 = {};
        var post19 = {};
        var post20 = {};

        beforeEach(function () {

            Fencepost.prototype = {
                sendRopeTo: function (connectedPost) {
                    this.connectionsTo.push(connectedPost);
                },
                removeRope: function (removeTo) {
                    var temp = [];
                    for (var i = 0; i < this.connectionsTo.length; i++) {
                        if (this.connectionsTo[i].postNum != removeTo) {
                            temp.push(this.connectionsTo[i]);
                        }
                    }
                    this.connectionsTo = temp;
                },
                movePost: function (x, y) {
                    this.x = x;
                    this.y = y;
                },
                //valueOf: function () {
                //    return Math.sqrt(this.x * this.x + this.y * this.y);
                //},
                //toString: function () {
                //  var connections = "";
                //  for (var i = 0; i < this.connectionsTo.length; i++) {
                //      connections += this.connectionsTo[i].postNum + "\n";
                //  }
                //  return "Fence post #" + this.postNum + ":\n" +
                //      "Connected to posts:\n" +
                //      connections +
                //      "Distance from ranch " + this.valueOf() + " yards";
                //}
            };

            post18 = new Fencepost(-3, 4, 18);
            post19 = new Fencepost(5, -1, 19);
            post20 = new Fencepost(-2, 10, 20);

            post18.sendRopeTo(post20);
            post18.sendRopeTo(post19);
            post19.sendRopeTo(post18);
            post20.sendRopeTo(post18);
        });

        it("can override valueOf() for Fencepost", function () {
            Fencepost.prototype.valueOf = function () {
                return Math.sqrt(this.x * this.x + this.y * this.y);
            };

            expect(post18.valueOf()).toEqual(5);
            expect(post19.valueOf()).toEqual(Math.sqrt(26));
            expect(post20.valueOf()).toEqual(Math.sqrt(104));
        });        

        it("can override toString() for Fencepost", function () {
            Fencepost.prototype.valueOf = function () {
                return Math.sqrt(this.x * this.x + this.y * this.y);
            };
            Fencepost.prototype.toString = function () {
                var connections = "";
                for (var i = 0; i < this.connectionsTo.length; i++) {
                    connections += this.connectionsTo[i].postNum + "\n";
                }
                return "Fence post #" + this.postNum + ":\n" +
                    "Connected to posts:\n" +
                    connections +
                    "Distance from ranch: " + this.valueOf() + " yards";
            };

            expect(post18.toString()).toEqual("Fence post #18:\n" +
                "Connected to posts:\n" +
                "20\n" +
                "19\n" +
                "Distance from ranch: " + "5" + " yards"
            );
            expect(post19.toString()).toEqual("Fence post #19:\n" +
                "Connected to posts:\n" +
                "18\n" +
                "Distance from ranch: " + Math.sqrt(26) + " yards"
            );
            expect(post20.toString()).toEqual("Fence post #20:\n" +
                "Connected to posts:\n" +
                "18\n" +
                "Distance from ranch: " + Math.sqrt(104) + " yards"
            );
        });

    });
});