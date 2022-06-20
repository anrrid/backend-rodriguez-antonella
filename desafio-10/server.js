import express, {json} from "express";
import productsRouter from "./src/router/productsRouter.js"

const app = express();
app.use(json())

app.use('/api/products', new productsRouter())

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Server on ${PORT}`);
})