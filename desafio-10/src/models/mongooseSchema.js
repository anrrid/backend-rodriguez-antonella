const mongoose = require ('mongoose');

const msgCollection = 'messages';

//SCHEMA
const msgSchema = new mongoose.Schema({
        author: {
            id: {type: String, require: true},
            name: {type: String, require: true},
            subname: {type: String, require: true},
            age: {type: Number, require: true},
            nickname: {type: String, require: true},
            avatar: {type: String, require: true},
        },
        text: {type: String, require: true},
        date: {type: String, require: true},
        hour: {type: String, require: true}
    


});


const products = mongoose.model(msgCollection, msgSchema);

module.exports = products;