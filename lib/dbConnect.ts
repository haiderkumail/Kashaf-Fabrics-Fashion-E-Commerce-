import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log('Already connected to database');
    return;
  }

  try {
    // Connect to MongoDB without the deprecated options
    await mongoose.connect(process.env.MONGO_URI!, {
      connectTimeoutMS: 30000, // 30 seconds timeout
      serverSelectionTimeoutMS: 30000, // 30 seconds timeout
    });
    console.log('Database connected successfully!');
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Connection Failed!');
  }
};

export default dbConnect;
