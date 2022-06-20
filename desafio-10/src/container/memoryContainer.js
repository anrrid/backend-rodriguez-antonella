class memoryContainer{
    constructor() {
        this.products = [];
    }

    getAll(){
        return[...this.products];
    }

    save(prods) {
        let newId
        if (this.products.length === 0) {
            newId = 1;
        } else {
            newId = this.products [this.products.length - 1].id +1;
        }

        const newProd = {...prods, id: newId};
        this.products.push(newProd);
        return newProd;
    }
}

export default memoryContainer;