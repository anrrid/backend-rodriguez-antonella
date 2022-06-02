const knex = require('knex');
const { options } = require('../connection/mariaDB')

class Container {
    constructor(options) {
        this.knex = knex(options);
    }
    async createTable() {
        return this.knex.schema.dropTableIfExists('client')
            .finally(() => {
                return this.knex.schema.createTable('client', table => {
                    table.increments('id').primary()
                    table.varchar('name', 50).notNullable()
                    table.float('price', 7.2).notNullable()
                    table.varchar('description', 100).notNullable()
                    table.integer('stock', 50).notNullable()
                    table.varchar('thumbnail', 3000).notNullable()
                })
            })
    }


    async saveProd(prods) {
        return this.knex('client').insert(prods)
    }


    async getProds() {
        return this.knex('client').select('*')
    }
}

const productTable = new Container(options)
module.exports = productTable;