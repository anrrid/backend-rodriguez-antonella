const express = require("express");
const { Router } = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

const routerProducts = new Router();

let products = []

function setId(req, res, next) {
    if (products.length === 0) {
        req.id = 1;
    } else {
        req.id = products.length + 1;
    }
    next();
}

routerProducts.get("/", (req, res) => {
    res.json({
        products,
    });
});
routerProducts.get("/:id", (req, res) => {
    const { id } = req.params;
    const product = products.find((item) => item.id == id);
    res.json({
        product,
    });
});

routerProducts.post("/", setId, (req, res) => {
    let data = req.body;
    let id = req.id;
    data = { ...data, id };
    console.log(data);
    products.push(data);
    res.json(products);
});

routerProducts.put("/:id", (req, res) => {
    const { id } = req.params;
    let product = products.find((item) => item.id == id);
    let data = req.body;
    if (product) {
        const productIndex = products.findIndex((item) => item.id == id);
        products[productIndex] = data;
        res.json({
            products,
        });
    } else {
        res.json({ error: "Product not found" });
    }
});


routerProducts.delete("/:id", (req, res) => {
    const { id } = req.params;
    let product = products.find((item) => item.id == id);
    if (product) {
        products = products.filter((item) => item.id != id);
        res.json({
            products,
        });
    } else {
        res.json({ error: "Product not found" });
    }
});



app.use("/api/products", routerProducts);


const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Server express has been started on ${PORT}`);
});
server.on("error", (error) => {
    console.log(error);
});




