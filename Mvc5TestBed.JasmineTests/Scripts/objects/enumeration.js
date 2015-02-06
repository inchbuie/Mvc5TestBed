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

var rockSpearguns = {
    Sharpshooter: { barbs: 2, weight: 10, heft: "overhand" },
    Pokepistol: { barbs: 4, weight: 8, heft: "shoulder" },
    Javelinjet: { barbs: 4, weight: 12, heft: "waist" },
    Firefork: { barbs: 6, weight: 8, heft: "overhand" },
    "The Impaler": { barbs: 1, weight: 30, heft: "chest" }
};