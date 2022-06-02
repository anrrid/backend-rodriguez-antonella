const express = require('express');
const { Router } = express
const contenedor = require('../classes/containerChat');
const chats = new Router();

chats.post("/chat", contenedor.saveProduct);
chats.get("/chat", contenedor.getChat);

module.exports = chats;