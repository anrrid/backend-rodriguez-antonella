const express = require("express");
// require the knex package
const knex = require("knex");

var handlebars = require("express-handlebars").create({
    defaultLayout: "main",
});
require("dotenv").config();
const routesChat = require("./routes/routesChat")
const routesProd = require("./routes/routes")
const path = require("path");
const Container = require('../classes/containerProds.js');
const container = new Container(path);
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(express.static("public"));
app.use("/static", express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
    res.render("add.hbs");
});

io.on("connection", (socket) => {
    socket.on("add product", (msg) => {
        io.emit("add product", msg);
    });
    socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
    });
});

app.get("/products", async (req, res) => {
    res.render("index.html", { products: await container.getProd() });
});

app.use('/api/chat', routesChat)
app.use('/api/products', routesProd);

// Listen on port 8080
http.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`);
});