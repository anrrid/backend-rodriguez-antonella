import memoryContainer from "../container/memoryContainer.js";
import {prodsGenerator} from "../utils/prodsGenerator.js"

class ApiProdsMock extends memoryContainer {
    constructor () {
        super();
    }

    prodsTest(amount = 5){
        const news = []
        for (let index = 0; index < amount; index++) {
            console.log('prodsGenerator...');
            const newProd = prodsGenerator();
            const saved = this.save(newProd);
            news.push(saved);
        }
        return news;
    }
}

export default ApiProdsMock;