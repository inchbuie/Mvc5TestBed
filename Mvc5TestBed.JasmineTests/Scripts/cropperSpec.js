/// <reference path="../jasmine/jasmine.js" />
/// <reference path="../../mvc5testbed.mymvcwebapp/scripts/cropper.js" />



describe("cropper", function () {

    describe("calcInitialSelection", function () {

        function isSquare(pointArray) {
            var sq=false;
            if (pointArray && pointArray.length == 4) {
                var w = pointArray[2] - pointArray[0];
                var h = pointArray[3] - pointArray[1];
                sq = (w == h);
            }
            return sq;
        }

        beforeEach(function () {

        });

        it("calculates for square 800x800", function () {
            var width = 800;
            var height = 800;

            var result = calcInternalSquareSize(width, height);
            var expected = [200, 200, 600, 600];
            expect(result).toEqual(expected);
            expect(isSquare(result)).toEqual(true);
        });
        it("calculates for rectangle 800x400", function () {
            var width = 800;
            var height = 400;

            var result = calcInternalSquareSize(width, height);
            var expected = [300, 100, 500, 300];
            expect(result).toEqual(expected);
            expect(isSquare(result)).toEqual(true);
        });
        it("calculates for rectangle 280x200", function () {
            var width = 280;
            var height = 200;

            var result = calcInternalSquareSize(width, height);
            var expected = [90, 50, 190, 150];
            expect(result).toEqual(expected);
            expect(isSquare(result)).toEqual(true);
        });
        it("rounds fractions for rectangle 278x200", function () {
            var width = 277;
            var height = 200;

            var result = calcInternalSquareSize(width, height);
            var expected = [89, 50, 189, 150];
            expect(result).toEqual(expected);
            expect(isSquare(result)).toEqual(true);
        });
        it("calculates for rectangle 400x800", function () {
            var width = 400;
            var height = 800;

            var result = calcInternalSquareSize(width, height);
            var expected = [100, 300, 300, 500];
            expect(result).toEqual(expected);
            expect(isSquare(result)).toEqual(true);
        });
        it("calculates for rectangle 300x600", function () {
            var width = 300;
            var height = 600;

            var result = calcInternalSquareSize(width, height);
            var expected = [75, 225, 225, 375];
            expect(result).toEqual(expected);
            expect(isSquare(result)).toEqual(true);
        });
    });
});