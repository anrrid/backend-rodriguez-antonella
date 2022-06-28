const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const ContainerMsg = require('./src/controllers/containerMsg.js')
const ContainerProd = require('./src/controllers/containerProd.js')
const faker = require ('./src/controllers/faker.js')


const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

//Normalizacion de msjs

const { normalize, denormalize, schema } = require('normalizr')
const util = require('util')

const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'id'});
const schemaMessage = new schema.Entity('post', {author: schemaAuthor}, {idAttribute: 'id'});
const schemaMessages = new schema. Entity('post', {author: [schemaMessage]}, {idAttribute: 'id'});

const normalizeMessages = (messagesId) => normalize(messagesId, schemaMessages)
function print(objecto) {
    console.log(util.inspect(objecto, false, 12, true));
}

app.use(express.static('./src/public'))
app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
    res.render('index.ejs', {root: __dirname})
})


app.get('/products-test', async (req, res) => {
    
    for (let i = 0; i < 5; i++) {
        const products = faker()
        const add = await ContainerProd.saveProd(products)
    }
    res.redirect('/')
})

//SOCKET

io.on('connection', async (sockets) => {
    console.log('A client has connected: ' + sockets.id)

    //DESNORMALIZED
    const normalized = await getNormalizedMessage()
    console.log(normalized, 'normalized')
    await denormalizedList(normalized)

    //EMIT
    sockets.emit('product', await ContainerProd.getProds())
    sockets.emit('messages', await ContainerMsg.getMsg())
   
    //ON
    sockets.on('new-product', async data => {
        await ContainerProd.saveProd(data)
        console.log(data, 'new-product')
        
        io.sockets.emit('product', await ContainerProd.getProds())
    })
    sockets.on('new-message', async data => {
        const author = data.author
        const text = data.message
        const date = data.date
        const hour = data.hour
        await ContainerMsg.saveMsj(author, text, date, hour)
        console.log(data, 'data-message')

        io.sockets.emit('messages', await ContainerMsg.getMsg())
    })
})


//NORMALIZACION Y DESNORMALIZACION
async function getNormalizedMessage() {
    const messages = await ContainerMsg.getMsg()
    const normalized = normalizeMessages ({ id: 'mensajes', messages})
    return normalized
}

async function denormalizedList(normMessages) {
    console.log(await normMessages)
    let listLength = JSON.stringify(normMessages).length
    console.log(listLength, 'listLength')

    let getDenormMessages = denormalize(normMessages.result, schemaMessages, normMessages.entities)
    console.log(getDenormMessages, 'getDenormMessages')
    let listDenormalizeSize = JSON.stringify(getDenormMessages).length

    console.log(getDenormMessages, listDenormalizeSize, 'Get&ListDenorma')

    return print(getDenormMessages)
}

const PORT = 8080
httpServer.listen(PORT, () => console.log('Server on: ' + PORT))