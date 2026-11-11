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
    const { category, supplier, search, minPrice, maxPrice, sortBy, order, page, limit } = req.query;

    // Build filter query object
    const filter = {};

    // 1. Category filtering (exact match, case-insensitive)
    if (category) {
      filter.category = { $regex: new RegExp(`^${category.trim()}$`, 'i') };
    }

    // 2. Supplier filtering (exact match, case-insensitive)
    if (supplier) {
      filter.supplier = { $regex: new RegExp(`^${supplier.trim()}$`, 'i') };
    }

    // 3. Name search (case-insensitive substring match)
    if (search) {
      filter.name = { $regex: search.trim(), $options: 'i' };
    }

    // 4. Price range filtering
    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {};
      if (minPrice !== undefined && !isNaN(Number(minPrice))) {
        filter.price.$gte = Number(minPrice);
      }
      if (maxPrice !== undefined && !isNaN(Number(maxPrice))) {
        filter.price.$lte = Number(maxPrice);
      }
    }

    // 5. Sorting configuration
    const allowedSortFields = ['name', 'price', 'quantity', 'createdAt'];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const sortOrder = order && order.toLowerCase() === 'asc' ? 1 : -1;
    const sortOption = { [sortField]: sortOrder };

    // 6. Pagination configuration
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 10);
    const skip = (pageNum - 1) * limitNum;

    // Execute queries
    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);

    const totalPages = Math.ceil(total / limitNum) || 1;

    res.status(200).json({
      success: true,
      total,
      page: pageNum,
      limit: limitNum,
      totalPages,
      count: products.length,
      products,
    });
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
