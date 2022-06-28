const mongoose = require('mongoose');
const models = require('../models/mongooseSchema.js')

mongoose.connect('mongodb+srv://coderhouse:coderhouse@cluster0.ijjaz.mongodb.net/?retryWrites=true&w=majority')



class Container {
    constructor( ){
        this.collection = models;
    }

    async saveMsg(author, message, date, hour){
        
        const newMessage = {
            author: author,
            text: message,
            date: date,
            hour: hour
        }

        const saved = await this.collection.insertMany(newMessage)
        return saved
    };

    async getMsg(){
        const msg = await this.collection.find()
        return msg
    }
};


const message = new Container()
module.exports = message;
