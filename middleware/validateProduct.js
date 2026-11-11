const validateProductInput = (req, res, next) => {
  const { name, sku, category, price, quantity, reorderLevel, supplier, stockValue } = req.body;

  // Prevent direct client manipulation of stockValue
  if (stockValue !== undefined) {
    return res.status(400).json({
      success: false,
      message: 'Direct assignment of stockValue is not allowed. It is automatically computed from price and quantity.',
    });
  }

  // If creating (POST) or updating (PUT), validate required presence and format if provided
  if (req.method === 'POST') {
    const missingFields = [];
    if (!name || (typeof name === 'string' && name.trim() === '')) missingFields.push('name');
    if (!sku || (typeof sku === 'string' && sku.trim() === '')) missingFields.push('sku');
    if (!category || (typeof category === 'string' && category.trim() === '')) missingFields.push('category');
    if (price === undefined || price === null || price === '') missingFields.push('price');
    if (quantity === undefined || quantity === null || quantity === '') missingFields.push('quantity');
    if (reorderLevel === undefined || reorderLevel === null || reorderLevel === '') missingFields.push('reorderLevel');
    if (!supplier || (typeof supplier === 'string' && supplier.trim() === '')) missingFields.push('supplier');

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required field(s): ${missingFields.join(', ')}`,
      });
    }
  }

  // Type and value checks for numeric fields if present
  if (price !== undefined) {
    const numPrice = Number(price);
    if (isNaN(numPrice) || numPrice <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Price must be a valid number greater than zero',
      });
    }
  }

  if (quantity !== undefined) {
    const numQty = Number(quantity);
    if (isNaN(numQty) || numQty < 0) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be a non-negative number',
      });
    }
  }

  if (reorderLevel !== undefined) {
    const numReorder = Number(reorderLevel);
    if (isNaN(numReorder) || numReorder < 0) {
      return res.status(400).json({
        success: false,
        message: 'Reorder level must be a non-negative number',
      });
    }
  }

  next();
};

module.exports = {
  validateProductInput,
};
