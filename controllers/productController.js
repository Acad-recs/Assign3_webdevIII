const Product = require('../models/Product');
const { buildProductFilter } = require('../utils/queryFilter');
const { getPaginationAndSort } = require('../utils/pagination');
const { sendSuccess } = require('../utils/responseHelper');

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

    return sendSuccess(res, 201, product, 'Product created successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Get all products with filtering, search, sorting, and pagination
// @route   GET /api/products
const getAllProducts = async (req, res, next) => {
  try {
    const filter = buildProductFilter(req.query);
    const { sort, page, limit, skip } = getPaginationAndSort(req.query);

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(total / limit) || 1;

    res.status(200).json({
      success: true,
      total,
      page,
      limit,
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
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product not found with id: ${req.params.id}`,
      });
    }

    return sendSuccess(res, 200, product);
  } catch (error) {
    next(error);
  }
};

// @desc    Update product details
// @route   PUT /api/products/:id
const updateProduct = async (req, res, next) => {
  try {
    const { name, sku, category, price, quantity, reorderLevel, supplier } = req.body;

    // Reject direct client manipulation of stockValue
    if (req.body.stockValue !== undefined) {
      return res.status(400).json({
        success: false,
        message: 'Direct assignment of stockValue is not allowed. It is automatically computed.',
      });
    }

    const updateFields = {};
    if (name !== undefined) updateFields.name = name;
    if (sku !== undefined) updateFields.sku = sku;
    if (category !== undefined) updateFields.category = category;
    if (price !== undefined) updateFields.price = price;
    if (quantity !== undefined) updateFields.quantity = quantity;
    if (reorderLevel !== undefined) updateFields.reorderLevel = reorderLevel;
    if (supplier !== undefined) updateFields.supplier = supplier;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      {
        returnDocument: 'after',
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product not found with id: ${req.params.id}`,
      });
    }

    return sendSuccess(res, 200, product, 'Product updated successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product not found with id: ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      deletedProduct: {
        id: product._id,
        name: product.name,
        sku: product.sku,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Adjust stock quantity (increment / decrement)
// @route   PATCH /api/products/:id/stock
const adjustStock = async (req, res, next) => {
  try {
    const { change } = req.body;

    if (change === undefined || change === null || typeof change !== 'number' || isNaN(change)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid stock change value. A non-zero numeric change is required.',
      });
    }

    if (change === 0) {
      return res.status(400).json({
        success: false,
        message: 'Stock change must be non-zero (positive to increment, negative to decrement).',
      });
    }

    // Atomically find and update product, ensuring stock does not become negative
    // Condition: quantity + change >= 0
    const filter = {
      _id: req.params.id,
      ...(change < 0 ? { quantity: { $gte: Math.abs(change) } } : {}),
    };

    const updatedProduct = await Product.findOneAndUpdate(
      filter,
      { $inc: { quantity: change } },
      { returnDocument: 'after', runValidators: true }
    );

    if (!updatedProduct) {
      // Check if product exists to distinguish between not-found and insufficient-stock
      const existingProduct = await Product.findById(req.params.id);
      if (!existingProduct) {
        return res.status(404).json({
          success: false,
          message: `Product not found with id: ${req.params.id}`,
        });
      }

      return res.status(400).json({
        success: false,
        message: `Insufficient stock. Current quantity is ${existingProduct.quantity}, cannot decrement by ${Math.abs(change)}.`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Stock successfully adjusted by ${change > 0 ? '+' : ''}${change}`,
      data: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get low stock items report
// @route   GET /api/products/low-stock
const getLowStockReport = async (req, res, next) => {
  try {
    // Find products where quantity <= reorderLevel using $expr
    const lowStockItems = await Product.find({
      $expr: { $lte: ['$quantity', '$reorderLevel'] },
    }).sort({ quantity: 1 });

    res.status(200).json({
      success: true,
      count: lowStockItems.length,
      lowStockItems,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get category-wise inventory summary aggregation
// @route   GET /api/products/summary
const getCategorySummary = async (req, res, next) => {
  try {
    const summary = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          totalItems: { $sum: 1 },
          totalQuantity: { $sum: '$quantity' },
          totalStockValue: { $sum: { $multiply: ['$price', '$quantity'] } },
          avgPrice: { $avg: '$price' },
        },
      },
      {
        $project: {
          _id: 0,
          category: '$_id',
          totalItems: 1,
          totalQuantity: 1,
          totalStockValue: { $round: ['$totalStockValue', 2] },
          avgPrice: { $round: ['$avgPrice', 2] },
        },
      },
      {
        $sort: { category: 1 },
      },
    ]);

    res.status(200).json({
      success: true,
      count: summary.length,
      categories: summary,
    });
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
