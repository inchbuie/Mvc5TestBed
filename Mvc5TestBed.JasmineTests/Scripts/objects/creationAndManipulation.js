var booksArray1 = ["Great Expectationis", "The Remains of the Day", "Peter Pan"];
var myBox1 = {
    height: 6,
    width: 8,
    length: 10,
    volume: 480,
    material: "cardboard",
    contents: booksArray1
};

function addBook(box, name, writer) {
    box["# of Books"]++;
    box["book" + box["# of Books"]] = { title: name, author: writer };
}

