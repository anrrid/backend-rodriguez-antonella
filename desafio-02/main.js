const fs = require("fs");
const path = "./products.json";
const Container = require("./Container");
const Write = require('./writeFile');

try {
    if (!fs.existsSync(path)) {
        fs.open(path, "w", function (err, file) {
            if (err) throw err;
            console.log("File is opened in write mode.");
        });
    }
} catch (error) {
    console.log(error);
}

Write(path);

const container = new Container(path);

container.getAll().then((data) => {
    console.log(data);
}
);

container.Save({
    title: "Libro",
    price: 150,
    thumbnail:
        "https://cdn2.iconfinder.com/data/icons/scenarium-vol-2-1/128/040_rules_book_do_not_pros_cons_handbook-512.png",
})

container.getById(2);

// container.deleteById(2).then(() => {
//     container.getAll().then((data) => {
//         console.log(data);
//     });
// });

// container.deleteAll().then(() => {
//     container.getAll().then((data) => {
//         console.log(data);
//     });
// }); 