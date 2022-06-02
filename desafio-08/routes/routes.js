const express = require('express');
const { Router } = express
const contenedor = require('../classes/containerProds.js');
const prods = new Router();

prods.get("/", contenedor.getProd);
prods.get("/:id", contenedor.getProdById);
prods.post("/", contenedor.saveProduct);
prods.put("/:id", contenedor.updateProduct);
prods.delete("/:id", contenedor.deleteById);

module.exports = prods;