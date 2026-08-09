import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from '../src/models/Product.js';
import Category from '../src/models/Category.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });
const MONGODB_URI = process.env.MONGODB_URL || "mongodb://localhost:27017/digidecs";

const fetchProductsFromDummyJSON = async (categoryStr) => {
  try {
    const res = await fetch(`https://dummyjson.com/products/category/${categoryStr}`);
    const data = await res.json();
    return data.products;
  } catch (error) {
    console.error(`Failed to fetch ${categoryStr} from dummyjson:`, error);
    return [];
  }
};

const seedDB = async () => {
  try {
    console.log(`Connecting to MongoDB...`);
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB Connected...');

    console.log('Clearing existing products...');
    await Product.deleteMany({});
    
    // Fetch categories or create defaults
    let dbCategories = await Category.find({});
    if (dbCategories.length === 0) {
      console.log('Creating default categories...');
      const defaultCategories = [
        { name: 'Smartphones', slug: 'smartphones', description: 'Mobile phones' },
        { name: 'Laptops', slug: 'laptops', description: 'Portable computers' },
        { name: 'Tablets', slug: 'tablets', description: 'Tablets and iPads' },
        { name: 'Accessories', slug: 'mobile-accessories', description: 'Mobile accessories' }
      ];
      dbCategories = await Category.insertMany(defaultCategories);
    }

    const getDbCategory = (slug) => dbCategories.find(c => c.slug === slug) || dbCategories[0];

    console.log('Fetching real products from DummyJSON...');
    
    const [smartphones, laptops, tablets, accessories] = await Promise.all([
      fetchProductsFromDummyJSON('smartphones'),
      fetchProductsFromDummyJSON('laptops'),
      fetchProductsFromDummyJSON('tablets'),
      fetchProductsFromDummyJSON('mobile-accessories')
    ]);

    const allFetchedProducts = [...smartphones, ...laptops, ...tablets, ...accessories].slice(0, 30);

    const formattedProducts = allFetchedProducts.map((p, index) => {
      // Map dummyjson category to our category slug mapping
      let targetCatSlug = 'accessories';
      if (p.category === 'smartphones') targetCatSlug = 'smartphones';
      if (p.category === 'laptops') targetCatSlug = 'laptops';
      if (p.category === 'tablets') targetCatSlug = 'tablets';

      const category = getDbCategory(targetCatSlug);

      // Convert price from USD (roughly) to LKR for realistic localized pricing
      const basePriceLKR = Math.floor(p.price * 300);
      const labeledPriceLKR = Math.floor(basePriceLKR * (1 + (p.discountPercentage / 100)));

      // If the brand is missing, fallback to generic
      const brand = p.brand || "Premium Brand";

      return {
        productId: `SKU-${brand.toUpperCase().substring(0,3).replace(/[^A-Z]/g, 'X')}-${1000 + index}`,
        name: p.title,
        slug: p.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
        brand: brand,
        description: p.description || "Premium quality product.",
        images: p.images && p.images.length > 0 ? p.images : [p.thumbnail],
        labeledPrice: labeledPriceLKR,
        price: basePriceLKR,
        stock: p.stock || Math.floor(Math.random() * 50) + 5,
        category: category._id,
        ratingsAverage: p.rating || 4.5,
        ratingsCount: p.reviews ? p.reviews.length * 10 : Math.floor(Math.random() * 500) + 10,
        isAvailable: true,
        isActive: true
      };
    });

    console.log(`Inserting ${formattedProducts.length} real products with real images...`);
    await Product.insertMany(formattedProducts);
    
    console.log('Successfully inserted real products!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
