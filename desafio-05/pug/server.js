const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.set("views", "./views");
app.set("view engine", "pug");

const products = [
    {
        title: "Escuadra",
        price: 123.45,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        id: 1
    },]

const PORT = 8082;
const srv = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en http://localhost:${PORT}`);
});
srv.on("error", (error) => console.log(`Error en servidor ${error}`));

app.get("/", (req, res) => {
    res.render("loadProducts", {});
});

app.get("/products", (req, res) => {
    res.render("index", {
        products,
        cargar: false,
    });
});

app.post("/products", (req, res) => {
    const { body } = req;
    products.push(body);
    res.render("viewsProducts", {
        products,
    });
});




