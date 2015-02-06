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
    }
};

//function addCritter(container, name, type, species, length) {
//    container[name] = { type: type, species: species, length: length };
//}
//function addToy(type, material, moves) {
//    container[name] = { type: type, material: material, moves: moves };
//}
