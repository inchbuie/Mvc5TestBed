function testClosure1() {
    var x = 4; //not available once function's scope is closed
    return x;
}

function testClosure2() {
    var x = 4; //not available once function's scope is closed
    function closeX() {
        // but x is available to inner function because outer function's varis 'feel' global
        // x is not stored anywhere w/in inner function!
        return x;
    }
    return closeX;
}

function buildCoveTicketMaker(transport) {
    return function (name) {
        return "Here is your transportation ticket via the " + transport + ".\n" +
            "Welcome to the Cold Closures Cove, " + name + "!";
    }
}