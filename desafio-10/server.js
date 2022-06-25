const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const ContainerMsg = require('./src/controllers/containerMsg.js')
const ContainerProd = require('./src/controllers/containerProd.js')
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const routesProd = require('./src/router/productsRoutes.js')
const faker = require ('./src/controllers/faker.js')

app.use(express.static('./src/public'))
app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
    res.render('index.ejs', {root: __dirname})
})
app.use('/products', routesProd)
app.get('products-test', async (req, res) => {

    for (let index = 0; index < 5; index++) {
       
        const products = faker()
    const add = await ContainerProd.saveProd(products)
    }
    res.redirect('/')
})


//sockets

io.on('connection', async (sockets) => {
    const product = await ContainerProd.getProds()
    sockets.emit('product', await ContainerProd.getProds())
    console.log('Un cliente se ha conectado!: ' + sockets.id)
    console.log('test ' + sockets.id)

    console.log(product, 'product');
 
    sockets.emit('messages', await ContainerMsg.getMsg())
   
    sockets.on('new-product', async data => {
        await ContainerProd.saveProd(data)
        console.log(data, 'new-product')
        
        io.sockets.emit('product', await ContainerProd.getProds())
    })
    sockets.on('new-message', async dato => {

        await ContainerMsg.saveMsj(dato)
        console.log(dato, 'dato')

        io.sockets.emit('messages', await ContainerMsg.getMsg())
    })
})


const PORT = 8080
httpServer.listen(PORT, () => console.log('Iniciando en el puerto: ' + PORT))