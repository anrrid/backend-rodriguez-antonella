import {faker} from '@faker-js/faker'
faker.locale = 'es';

function prodsGenerator () {
    return{
        title: faker.commerce.product(),
        price: faker.commerce.price(),
        description: faker.commerce.productName(),
        stock: faker.datatype.number ({ min: 1, max: 50 }),
        thumbnail: faker.image.business() 
    }
}

export {prodsGenerator};