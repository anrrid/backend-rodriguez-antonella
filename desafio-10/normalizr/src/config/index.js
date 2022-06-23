import dotenv from 'dotenv';
dotenv.config();

const venvs = {
  MONGO_CONNECTION_STRING: 'mongodb://localhost:27017/dbecommerce',
  PORT: process.env.PORT || 8080,
};

export default venvs;
