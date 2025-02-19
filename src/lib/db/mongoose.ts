import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env file');
}

let dbConnected = false;

export async function connectDB() {
  try {
    if (dbConnected) {
      return;
    }

    const conn = await mongoose.connect(MONGODB_URI as string);
    dbConnected = true;
    console.log(`MongoDB connected: ${conn.connection.host}`);
    console.log(`Using database: ${conn.connection.name}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('MongoDB connection error:', error.message);
    } else {
      console.error('MongoDB connection error:', error);
    }
    throw error;
  }
}

