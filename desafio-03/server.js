const express = require('express')
const Container = require("./container")

const PORT = 8080

const app = express()
const path = "./products.json"
const container = new Container(path);

const data = container.getAll();

const getRandomProdutc = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};


const server = app.listen(PORT, () => {
    console.log("Servidor Http escuchando en el puerto " + PORT)
});


//GET products.json
app.get("/productos", async (req, res) => {
    res.json(await data);
});

app.get("/productoRandom", async (req, res) => {
    res.json(getRandomProdutc(await data))
});
