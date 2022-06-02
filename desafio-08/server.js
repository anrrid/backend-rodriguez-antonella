const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const containerChat = require('./src/controllers/containerChat')
const containerProd = require('./src/controllers/containerProd')
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.static('./src/public'))

io.on('connection', async (sockets) => {
    const product = await containerProd.getProds()
    sockets.emit('product', await containerProd.getProds())
    console.log('Un cliente se ha conectado!: ' + sockets.id)
    // div
    sockets.emit('messages', await containerChat.getChat())

    sockets.on('new-product', async data => {
        await containerProd.saveProd(data)
        console.log(data)

        io.sockets.emit('product', await containerProd.getProds())
    })
    sockets.on('new-message', async dato => {

        await containerChat.saveMsj(dato)
        console.log(dato)

        io.sockets.emit('messages', await containerChat.getChat())
    })
})





const PORT = 8080
httpServer.listen(PORT, () => console.log('Iniciando en el puerto: ' + PORT))