const Product = require('../models/Product');

// @desc    Create a new product
// @route   POST /api/products
const createProduct = async (req, res, next) => {
  try {
    const { name, sku, category, price, quantity, reorderLevel, supplier } = req.body;

    const product = await Product.create({
      name,
      sku,
      category,
      price,
      quantity,
      reorderLevel,
      supplier,
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all products with filtering, search, sorting, and pagination
// @route   GET /api/products
const getAllProducts = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: 'getAllProducts endpoint initialized' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
const getProductById = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: 'getProductById endpoint initialized' });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product details
// @route   PUT /api/products/:id
const updateProduct = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: 'updateProduct endpoint initialized' });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
const deleteProduct = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: 'deleteProduct endpoint initialized' });
  } catch (error) {
    next(error);
  }
};

// @desc    Adjust stock quantity (increment / decrement)
// @route   PATCH /api/products/:id/stock
const adjustStock = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: 'adjustStock endpoint initialized' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get low stock items report
// @route   GET /api/products/low-stock
const getLowStockReport = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: 'getLowStockReport endpoint initialized' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get category-wise inventory summary aggregation
// @route   GET /api/products/summary
const getCategorySummary = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: 'getCategorySummary endpoint initialized' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  adjustStock,
  getLowStockReport,
  getCategorySummary,
};
