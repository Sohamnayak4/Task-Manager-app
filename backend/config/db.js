// config/db.js
const mongoose = require('mongoose');
const AppError = require('../utils/AppError');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    throw new AppError('Database connection failed', 500);
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected. Attempting to reconnect...');
  connectDB().catch(err => console.error('Reconnection failed:', err));
});

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
  throw new AppError('Database connection error', 500);
});

module.exports = connectDB;
