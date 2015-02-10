/// <reference path="../jasmine/jasmine.js" />
/// <reference path="conceptOfClosure.js" />

describe("closures1", function () {
    describe("testClosure1", function () {
        it("should return value from internal variable", function () {
            var expected = 4;
            var result = testClosure1();
            expect(result).toEqual(expected);
        });
        it("does not make internal variable accessible", function () {
            var result = testClosure1();
            expect(result.x).not.toBeDefined();
        });
    });

    describe("testClosure2", function () {
        it("inner function can access outer function scope", function () {
            var expected = 4;
            var result = testClosure1();
            expect(result).toEqual(expected);
        });
    });

    describe("buildCoveTicketMaker", function () {
        it("binds (encloses) parameter to anonymous closure 1", function () {
            //stored function does not reveal its closure but it's there
            var getSubmarineTicket = buildCoveTicketMaker("Submarine");
            //getSubmarineTicket is now a function with the value:
            //function (name) {
            //return "Here is your transportation ticket via the " + transport + ".\n" +
            //    "Welcome to the Cold Closures Cove, " + name + "!";
            //}
            // but transport has already been bound to "Submarine"
            expect(getSubmarineTicket("Mario"))
                .toEqual("Here is your transportation ticket via the Submarine.\n" +
                    "Welcome to the Cold Closures Cove, Mario!");
        });
        it("binds (encloses) parameter to anonymous closure 2", function () {
            //stored function does not reveal its closure but it's there
            var getBattleshipTicket = buildCoveTicketMaker("Battleship");
            //getBattleshipTicket is now a function with the value:
            //function (name) {
            //return "Here is your transportation ticket via the " + transport + ".\n" +
            //    "Welcome to the Cold Closures Cove, " + name + "!";
            //}
            // but transport has already been bound to "Battleship"
            expect(getBattleshipTicket("Luigi"))
                .toEqual("Here is your transportation ticket via the Battleship.\n" +
                    "Welcome to the Cold Closures Cove, Luigi!");
        });
        it("binds (encloses) parameter to anonymous closure 3", function () {
            //stored function does not reveal its closure but it's there
            var getGiantSeagullTicket = buildCoveTicketMaker("Giant Seagull");
            //getGiantSeagullTicket is now a function with the value:
            //function (name) {
            //return "Here is your transportation ticket via the " + transport + ".\n" +
            //    "Welcome to the Cold Closures Cove, " + name + "!";
            //}
            // but transport has already been bound to "Giant Seagull"
            expect(getGiantSeagullTicket("Bowser"))
                .toEqual("Here is your transportation ticket via the Giant Seagull.\n" +
                        "Welcome to the Cold Closures Cove, Bowser!");
        });
    });
});