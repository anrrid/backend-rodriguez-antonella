import mongoose from 'mongoose';
const DB_URI = 'mongodb://localhost:27017/dbecommerce'

export const initMongoDB = async () => {
    try {
        console.log(' PROCESO DE CONECCION A MI BASE DE DATOS');
        console.log(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateInex: true })
        await mongoose.connect(DB_URI);

        console.log('CONECCION EFECTUADA CORRECTAMENTE');
    } catch (error) {
        console.log(`ERROR => ${error}`);
        return error;
    }
};
