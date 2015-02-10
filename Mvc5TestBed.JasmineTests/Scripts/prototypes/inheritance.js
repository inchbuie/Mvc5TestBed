var aquarium = {
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
    },
    takeOut: function (name) {
        this[name].name = name;
        var temp = this[name];
        delete this[name];
        return temp;
    }
};

var myArray = ["This", "array", "inherits", "properties", "from", "the", "Array", "prototype!"];
// Array prototype property: length 
// Array prototype methods : shift() join() pop() reverse() reduce() push() sort() slice()

var myString = "I am secretly a child of the String prototype";
// String prototype property: length 
// String prototype methods : concat() toUpperCase() toLowerCase() charAt() indexOf() trim() replace() substring()

var myNumber = 6;
// Number prototype methods : toFixed() toExponential() toPrecision()

function myFunction() {
    return "Functions have secret properties too!"
}
// Function prototype property: name 
// Function prototype methods : call() bind() apply()

//all prototypes inherit from the Object prototype!
// Object prototype methods : toString() valueOf() hasOwnProperty() toLocaleString() isPrototypeOf() constructor() propertyIsEnumerable()
