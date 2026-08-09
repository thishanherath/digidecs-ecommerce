import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from '../src/models/Product.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });
const MONGODB_URI = process.env.MONGODB_URL || "mongodb://localhost:27017/digidecs";

const clearDB = async () => {
  try {
    console.log(`Connecting to MongoDB...`);
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB Connected...');
    
    console.log('Deleting all products...');
    const result = await Product.deleteMany({});
    console.log(`Successfully deleted ${result.deletedCount} products.`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error clearing database:', error);
    process.exit(1);
  }
};

clearDB();
