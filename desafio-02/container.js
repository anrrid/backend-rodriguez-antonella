const fs = require("fs");
const { json } = require("stream/consumers");

class Container {
    constructor(path) {
        this.path = path
    }
    async getAll() {
        const data = await fs.promises.readFile(this.path, "utf-8", function (err, data) {
            if (err) throw err;
            return JSON.parse(data);
        });
        return JSON.parse(data);

    }

    async Save() {
        const archive = await this.getAll();
        const id = json.length + 1;
        object.id = id;
        archive.push(object);
        fs.writeFileSync(this.path, JSON.stringify(archive), function (err) {
            if (err) throw err;
        });
        console.log(id);
    }

    async getById() {
        fs.readFile(this.path, "utf-8", function (err, data) {
            if (err) throw err;
            const archive = JSON.parse(data);
            const item = archive.find((item) => item.id === id);
            if (typeof item === "undefined") {
                console.log("null");
            } else {
                console.log(item);
            }
        });
    }

    async deleteItemById(id) {
        const archive = await this.getAll();
        const newArray = archive.filter((item) => item.id !== id);
        fs.writeFileSync(this.path, JSON.stringify(newArray), function (err) {
            if (err) throw err;
            console.log("Save");
        })
    }

    async deleteAll() {
        const json = await this.getAll();
        for (let i = archive.length; i > 0; i--) {
            json.pop();
        }
        fs.writeFileSync(this.path, JSON.stringify(archive), function (err) {
            if (err) throw err;
            console.log("Save");
        });
    }
}

module.exports = Container;