import mongoose from 'mongoose';

let dbUrl;

if (process.env.NODE_ENV !== 'production') {
  dbUrl = process.env.DB_URL_DEV;
} else {
  dbUrl = process.env.DB_URL_PROD;
}

export const connectDB = () => {
  console.log("dbUrl :: ", dbUrl)
  dbUrl = 'mongodb://localhost:27017/izvlacenje'
  mongoose.connect(dbUrl).then(() => console.log('Database connected'));
};
