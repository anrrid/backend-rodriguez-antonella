const {faker} = require('@faker-js/faker')
 faker.locale= 'en'
 
 function generateRandomProducts() {

       
        const product = {
            title: faker.commerce.productName(),
            price: faker.commerce.price(),
            stock: faker.random.numeric(),
            description: faker.commerce.productName(),
            url: faker.image.imageUrl()
        }
           
    return product
}
 
 
module.exports = generateRandomProducts
