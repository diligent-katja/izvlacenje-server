import mongoose from 'mongoose';
import users from './users.js';
import User from '../models/user.js';

mongoose.connect('mongodb://localhost:27017/izvlacenje', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const seedDB = async () => {
  await User.deleteMany({});
  for (let i = 0; i < users.length; i++) {
    const user = new User(users[i]);
    await user.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
