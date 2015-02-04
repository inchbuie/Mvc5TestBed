/// <reference path="../jasmine/jasmine.js" />
/// <reference path="hoisting.js" />


describe("hoisting", function () {
    describe("sumOfSquares", function () {
        it("should return correct sum (3^2+4^2=25)", function () {
            var expected = 25;
            var actual = sumOfSquares(3, 4);
            expect(actual).toEqual(expected);
        });
        it("should return correct sum (9^2+13^2=250)", function () {
            var expected = 250;
            var actual = sumOfSquares(9, 13);
            expect(actual).toEqual(expected);
        });
    });
    
    describe("functionHoistingExample", function () {
        it("should return last function (7)", function () {
            var expected = 7;
            var actual = functionHoistingExample();
            expect(actual).toEqual(expected);
        });
    });

    describe("functionExpressionHoisting_bad1", function () {
        it("should return before 2nd assignment (12)", function () {
            var expected = 12;
            var actual = functionExpressionHoisting_bad1();
            expect(actual).toEqual(expected);
        });
    });

    describe("functionExpressionHoisting_bad2", function () {
        it("should throw because expression undefined", function () {
            expect(function () {
                functionExpressionHoisting_bad2();
            }).toThrow();
        });
        it("should throw TypeError", function () {
            expect(function () {
                functionExpressionHoisting_bad2();
            }).toThrow(new TypeError("'undefined' is not a function (evaluating 'chooseMystery()')"));
        });
    });
    
    describe("capacityStatus_bad1", function () {
        it("should throw because expression undefined", function () {
            expect(function () {
                capacityStatus_bad1(60, 60);
            }).toThrow();
        });
    });
    describe("capacityStatus_good1", function () {
        it("should return error message when capacity equaled", function () {
            var expected = "No seats left!";
            var actual = capacityStatus_good1(60, 60);
            expect(actual).toEqual(expected);
        });
        it("should return good message when capacity available", function () {
            var expected = "There are 1 seats left!";
            var actual = capacityStatus_good1(59, 60);
            expect(actual).toEqual(expected);
        });
    });
    describe("capacityStatus_good2", function () {
        it("should return error message when capacity equaled", function () {
            var expected = "No seats left!";
            var actual = capacityStatus_good1(60, 60);
            expect(actual).toEqual(expected);
        });
        it("should return good message when capacity available", function () {
            var expected = "There are 40 seats left!";
            var actual = capacityStatus_good1(20, 60);
            expect(actual).toEqual(expected);
        });
    });
});