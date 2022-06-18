const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const Contenedor = require('./src/controllers/contenedorMsg.js')
const Container = require('./src/controllers/contenedorProd.js')
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
// const routesProd = require('./src/router/productsRoutes.js')

app.use(express.static('./src/public'))
app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
    res.render('index.ejs', {root: __dirname})
})
// app.use('/products', routesProd)
// app.use('/chat', chatRouter)




io.on('connection', async (sockets) => {
    const product = await Container.getProds()
    sockets.emit('product', await Container.getProds())
    console.log('Un cliente se ha conectado!: ' + sockets.id)
    console.log('test ' + sockets.id)

    console.log(product, 'product');
    // div
    sockets.emit('messages', await Contenedor.getMsg())
   
    sockets.on('new-product', async data => {
        await Container.saveProd(data)
        console.log(data, 'new-product')
        
        io.sockets.emit('product', await Container.getProds())
    })
    sockets.on('new-message', async dato => {

        await Contenedor.saveMsj(dato)
        console.log(dato, 'dato')

        io.sockets.emit('messages', await Contenedor.getMsg())
    })
})


const PORT = 8080
httpServer.listen(PORT, () => console.log('Iniciando en el puerto: ' + PORT))