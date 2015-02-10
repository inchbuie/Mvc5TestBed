/// <reference path="../jasmine/jasmine.js" />
/// <reference path="creationAndManipulation.js" />

describe("objects creationAndManipulation", function () {

    describe("box", function () {
        var booksArray = [];
        var myBox = {};

        beforeEach(function () {
            booksArray = ["Great Expectationis", "The Remains of the Day", "Peter Pan"];
            myBox = {
                height: 6,
                width: 8,
                length: 10,
                volume: 480,
                material: "cardboard",
                contents: booksArray
            };
        });

        it("should have a width property", function () {
            var expected = 8;
            var actual = myBox.width;
            expect(actual).toEqual(expected);
        });
        it("should have a material property", function () {
            var expected = "cardboard";
            var actual = myBox.material;
            expect(actual).toEqual(expected);
        });
        it("should have a contents property", function () {
            var expected = ["Great Expectationis", "The Remains of the Day", "Peter Pan"];
            var actual = myBox.contents;
            expect(actual).toEqual(expected);
        });
        it("can change width", function () {
            var expected = 12;
            myBox.width = 12;
            var actual = myBox.width
            expect(actual).toEqual(expected);
        });
        it("volume not yet automatically updated when width changed", function () {
            var expected = 480;
            myBox.width = 12;
            var actual = myBox.volume
            //this version of box has hard-coded volume
            expect(actual).toEqual(expected);
        });
        it("can add to contents (changes external array)", function () {
            var expected = ["Great Expectationis", "The Remains of the Day", "Peter Pan", "On the Road"];
            myBox.contents.push("On the Road");
            //check the contents property
            var actual = myBox.contents;
            expect(actual).toEqual(expected);
            //check the external array used to create the box object!
            var actual = booksArray;
            expect(actual).toEqual(expected); //has the newly added book
        });
        it("can add wight property", function () {
            var expected = 24;
            myBox.weight = 24;
            var actual = myBox.weight
            expect(actual).toEqual(expected);
        });
        it("can access property using string indexer ", function () {
            var expected = 10;
            var actual = myBox["length"];
            expect(actual).toEqual(expected);
        });
        it("can add property with complex name having spaces", function () {
            var expected = 2;
            myBox["# of stops"] = 2
            var actual = myBox["# of stops"]
            expect(actual).toEqual(expected);
        });
        it("can add property with complex name having spaces", function () {
            var expected = 2;
            myBox["# of stops"] = 2
            var actual = myBox["# of stops"]
            expect(actual).toEqual(expected);
        });
        it("can use dynamic properties", function () {
            myBox["# of stops"] = 2
            myBox.destination1 = "Orlando";
            myBox.destination2 = "Miami";
            var expected = ["Orlando", "Miami"];
            var actual = [];
            for (var i = 1; i <= myBox["# of stops"]; i++) {
                actual.push(myBox["destination" + i]);
            }
            expect(actual).toEqual(expected);
        });
        it("can delete property", function () {
            delete myBox.contents;
            expect(myBox.contents).not.toBeDefined();
        });
        it("can dynamically add sub-object", function () {
            myBox["# of Books"] = 0;
            addBook(myBox, "Great Expectations", "Charles Dickens");
            var expected = { title: "Great Expectations", author: "Charles Dickens" };
            expect(myBox.book1).toEqual(expected);
        });
        it("dynamically adding sub-object increases count", function () {
            myBox["# of Books"] = 0;
            addBook(myBox, "Great Expectations", "Charles Dickens");
            expect(myBox["# of Books"]).toEqual(1);
        });
        it("dynamically adding 4 sub-object increases count to 4", function () {
            myBox["# of Books"] = 0;
            addBook(myBox, "Great Expectations", "Charles Dickens");
            addBook(myBox, "The Remains of the Day", "Kazuo Ishiguro");
            addBook(myBox, "Peter Pan", "J. M. Barrie");
            addBook(myBox, "On the Road", "Jack Kerouac");
            expect(myBox["# of Books"]).toEqual(4);
        });
        it("can access dynamic sub-property", function () {
            myBox["# of Books"] = 0;
            addBook(myBox, "Great Expectations", "Charles Dickens");
            addBook(myBox, "The Remains of the Day", "Kazuo Ishiguro");
            addBook(myBox, "Peter Pan", "J. M. Barrie");
            addBook(myBox, "On the Road", "Jack Kerouac");
            expect(myBox.book3.title).toEqual("Peter Pan");
        });
    });
});
