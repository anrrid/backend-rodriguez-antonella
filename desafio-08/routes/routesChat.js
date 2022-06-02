const db = require("../connection/sqlite");
const express = require('express');
const { Router } = express
const chats = new Router();

const list = () => db("chat").select("email", "message", "time");

const create = (obj) => db("chat").insert(obj);

const getChat = (req, res) =>
    list
        .list()
        .then((messages) => res.json(messages))
        .catch((err) => res.json(err));

const saveProduct = (req, res) => {

    const msg = ({ email, message, time } = req.body);
    return create
        .create(msg)
        .then((product) => res.json(product))
        .catch((err) => res.json(err));
};



chats.post("/chat", saveProduct);
chats.get("/chat", getChat);

module.exports = chats;