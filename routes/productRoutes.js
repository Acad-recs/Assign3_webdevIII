const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  adjustStock,
  getLowStockReport,
  getCategorySummary,
} = require('../controllers/productController');
const { validateProductInput } = require('../middleware/validateProduct');

// Fixed paths defined first to prevent collision with parameter routes
router.get('/low-stock', getLowStockReport);
router.get('/summary', getCategorySummary);

// Base resource routes
router.route('/')
  .post(validateProductInput, createProduct)
  .get(getAllProducts);

// Parameterized item routes
router.route('/:id')
  .get(getProductById)
  .put(validateProductInput, updateProduct)
  .delete(deleteProduct);

// Subresource stock adjustment
router.patch('/:id/stock', adjustStock);

module.exports = router;
