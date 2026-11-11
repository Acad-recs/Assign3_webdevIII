/**
 * Validates stock adjustment payload for PATCH /api/products/:id/stock.
 * Ensures 'change' is provided, is a finite number, and is non-zero.
 */
const validateStockAdjustment = (req, res, next) => {
  const { change } = req.body;

  if (change === undefined || change === null) {
    return res.status(400).json({
      success: false,
      message: "The 'change' property is required in request body.",
    });
  }

  if (typeof change !== 'number' || isNaN(change) || !Number.isFinite(change)) {
    return res.status(400).json({
      success: false,
      message: "Invalid 'change' value. Must be a finite number.",
    });
  }

  if (change === 0) {
    return res.status(400).json({
      success: false,
      message: "Stock change must be non-zero (positive to increment, negative to decrement).",
    });
  }

  next();
};

module.exports = {
  validateStockAdjustment,
};
