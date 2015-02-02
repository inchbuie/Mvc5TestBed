/// <reference path="../jasmine/jasmine.js" />
/// <reference path="warningMaker.js" />

describe("warningMaker", function () {

    it("should return msg with expected count (6 penguins at ice cave)", function () {

        var killerPenguinAlert = warningMaker("killer penguin");
        var expected = "Beware! There have been killer penguin sightings in the Cove today!\n" +
              "6 killer penguin(s) spotted at the Ice Caves!"
        expect(killerPenguinAlert(6, "Ice Caves"))
            .toEqual(expected);
    });
    it("should return msg with expected count (1 yeti at Blizzard Beach)", function () {

        var snowYetiAlert = warningMaker("snow yeti");
        var expected = "Beware! There have been snow yeti sightings in the Cove today!\n" +
              "1 snow yeti(s) spotted at the Blizzard Beach!"
        expect(snowYetiAlert(1, "Blizzard Beach"))
            .toEqual(expected);
    });
    it("should return msg with expected count (2 polar bears at Frost Mountain)", function () {

        var polarBearAlert = warningMaker("polar bear");
        var expected = "Beware! There have been polar bear sightings in the Cove today!\n" +
              "2 polar bear(s) spotted at the Frost Mountain!"
        expect(polarBearAlert(2, "Frost Mountain"))
            .toEqual(expected);
    });
    it("should return msg with expected count (45 icebergs at Icicle Bay)", function () {
        var icebergAlert = warningMaker("iceberg");

        var expected = "Beware! There have been iceberg sightings in the Cove today!\n" +
              "45 iceberg(s) spotted at the Icicle Bay!"
        expect(icebergAlert(45, "Icicle Bay"))
            .toEqual(expected);
    });
    it("should return msg with expected count (3 flash blizzards at toilets", function () {

        var flashBlizzardAlert = warningMaker("flash blizzard");
        var expected = "Beware! There have been flash blizzard sightings in the Cove today!\n" +
              "3 flash blizzard(s) spotted at the toilets!"
        expect(flashBlizzardAlert(3, "toilets"))
            .toEqual(expected);
    });
});