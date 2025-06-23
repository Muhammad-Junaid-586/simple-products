// lib/dbConnect.js
import mongoose from 'mongoose';
import { mongoURL } from './db'; // Adjust if your config is elsewhere

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    throw new Error('Database connection error');
  }
};

export default connectDB;
