const options = require("knex")({
    client: "mysql",
    connection: {
        host: "localhost",
        user: "root",
        password: "",
        database: "ecommerce",
        port: 3306,
    },
    pool: {
        min: 0,
        max: 7,
    },
});

options.schema.hasTable("products").then((exists) => {
    if (!exists) {
        options.schema
            .createTable("products", (table) => {
                table.increments("id").primary();
                table.string("title");
                table.string("thumbnail");
                table.integer("price");
            })
            .then(() => {
                console.log("Table created");
            })
            .catch((error) => {
                console.error(error);
                throw error;
            })

            .finally(() => {
                options.destroy();
            });
    }
});

module.exports = options;