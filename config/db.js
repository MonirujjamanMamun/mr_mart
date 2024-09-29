const mongoose = require('mongoose');

const connectDB = async (option = {}) => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, option);
    console.log('Database is Connected successfully!');
    mongoose.connection.on('error', (error) => {
      console.error('Error connecting to MongoDB:', error.message);
    });
  } catch (error) {
    console.error('Could not connect DB', error.message);
  }
};

module.exports = connectDB;
