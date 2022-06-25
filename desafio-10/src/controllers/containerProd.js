const knex = require('knex');
const { options } = require('../connection/mariaDB')

class Container {
    constructor(options) {
        this.knex = knex(options);
    }

    async createTable() {
        return this.knex.schema.dropTableIfExists('customer')
            .finally(() => {
              
                return this.knex.schema.createTable('customer', table => {
                    table.increments('id').primary()
                    table.varchar('title', 50).notNullable()
                    table.float('price', 10.2).notNullable()
                    table.varchar('description', 100).notNullable()
                    table.integer('stock', 50).notNullable()
                    table.varchar('thumbnail', 3000).notNullable()
                })
            })
    }


    async saveProd(articulos) {

        return this.knex('client').insert(articulos)
        
    }
    

    async getProds() {
        return this.knex('client').select('*')
    }
};



const containerProducts = new Container(options)
module.exports = containerProducts;