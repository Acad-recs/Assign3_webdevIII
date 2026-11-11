const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Product = require('./models/Product');
const sampleProducts = require('./data/sampleProducts');

dotenv.config();

const importData = async () => {
  try {
    await connectDB();

    console.log('Clearing existing product records...');
    await Product.deleteMany({});

    console.log(`Inserting ${sampleProducts.length} sample products...`);
    await Product.insertMany(sampleProducts);

    console.log('Sample inventory data successfully imported!');
    process.exit(0);
  } catch (error) {
    console.error(`Error importing sample data: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();

    console.log('Clearing all product records...');
    await Product.deleteMany({});

    console.log('Product data destroyed successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Error destroying data: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d' || process.argv[2] === '--destroy') {
  destroyData();
} else {
  importData();
}
