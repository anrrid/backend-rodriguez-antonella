const { promises: fs } = require('fs')
const db = require("../connection/mariaDB")

const list = (params = {}) =>
    db("products").where(params).select("id", "title", "price", "thumbnail");

const create = (obj) => db("products").insert(obj);

const updateItem = (id, obj) => db("products").where({ id }).update(obj);

const remove = (id) => db("products").where({ id }).del();


const getProd = (req, res) =>
    list
        .list()
        .then((products) => res.json(products))
        .catch((err) => res.json(err));

const deleteById = (req, res) => {
    const product = ({ title, price, thumbnail } = req.body);
    return remove
        .remove(req.params.id, product)
        .then((product) => res.json(product))
        .catch((err) => res.json(err));
};

const getProdById = (req, res) =>
    list
        .list({ id: req.params.id })
        .then((products) => res.json(products))
        .catch((err) => res.json(err));

const saveProduct = (req, res) => {
    const product = ({ title, price, thumbnail } = req.body);
    return create
        .create(product)
        .then((product) => res.json(product))
        .catch((err) => res.json(err));
};

const updateProduct = (req, res) => {
    const product = ({ title, price, thumbnail } = req.body);
    return updateItem
        .updateItem(req.params.id, product)
        .then((product) => res.json(product))
        .catch((err) => res.json(err));
};

export { getProd, deleteById, getProdById, saveProduct, updateProduct }
