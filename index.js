const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const requestLogger = require('./middleware/requestLogger');
const { errorHandler, notFound } = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Connect to MongoDB Database
connectDB();

const app = express();

// Security headers middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Body Parser Middleware for JSON payloads
app.use(express.json());

// Request logging middleware
app.use(requestLogger);

// Base API health route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Inventory API is operating normally',
    timestamp: new Date().toISOString(),
  });
});

// Mount Product Routes
app.use('/api/products', productRoutes);

// Fallback 404 Handler
app.use(notFound);

// Centralized Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Inventory API server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});

// Graceful process shutdown
const gracefulShutdown = () => {
  console.log('\nReceived shutdown signal, terminating server gracefully...');
  server.close(async () => {
    try {
      await mongoose.connection.close();
      console.log('MongoDB connection closed.');
      process.exit(0);
    } catch (err) {
      console.error('Error during database teardown:', err);
      process.exit(1);
    }
  });
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

module.exports = { app, server };
