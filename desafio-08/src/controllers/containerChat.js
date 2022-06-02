const knex = require('knex');
const connect = require('../connection/sqlite')

class Contenedor {
    constructor(data) {
        this.knex = knex(data);
    }

    async createTableChat() {
        return this.knex.schema.dropTableIfExists('message')
            .finally(() => {
                return this.knex.schema.createTable('message', table => {
                    table.varchar('author', 100).notNullable()
                    table.varchar('message', 1000).notNullable()
                    table.varchar('fecha', 30).notNullable()
                    table.varchar('hora', 30).notNullable()
                })
            })
    }

    async saveChat(msg) {
        return this.knex('message').insert(msg)
    };

    async getChat() {
        return this.knex('message').select('*')
    }
};


const message = new Contenedor(connect)
module.exports = message;