const {faker} = require('@faker-js/faker')
 faker.locale= 'en'
 
 const generateRandomProducts = function createRandom() {
    const products = {
        name: faker.commerce.product(),
        price: faker.commerce.price(),
        stock: faker.random.numeric(),
        description: faker.commerce.productName(),
        thumbnail: faker.image.imageUrl()
    }
    console.log(products, 'random product0');
    return products
}
 
 
module.exports = generateRandomProducts
