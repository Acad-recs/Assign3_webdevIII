/**
 * Builds MongoDB filter query from request query parameters.
 * Validates and sanitizes category, supplier, search keyword, and min/max price bounds.
 */
const buildProductFilter = (queryParams = {}) => {
  const { category, supplier, search, minPrice, maxPrice } = queryParams;
  const filter = {};

  if (category && typeof category === 'string' && category.trim() !== '') {
    // Escape regex special characters
    const safeCategory = category.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    filter.category = { $regex: new RegExp(`^${safeCategory}$`, 'i') };
  }

  if (supplier && typeof supplier === 'string' && supplier.trim() !== '') {
    const safeSupplier = supplier.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    filter.supplier = { $regex: new RegExp(`^${safeSupplier}$`, 'i') };
  }

  if (search && typeof search === 'string' && search.trim() !== '') {
    const safeSearch = search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    filter.name = { $regex: safeSearch, $options: 'i' };
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.price = {};
    if (minPrice !== undefined && minPrice !== '' && !isNaN(Number(minPrice))) {
      filter.price.$gte = Number(minPrice);
    }
    if (maxPrice !== undefined && maxPrice !== '' && !isNaN(Number(maxPrice))) {
      filter.price.$lte = Number(maxPrice);
    }
    // Clean up empty price object if neither condition was met
    if (Object.keys(filter.price).length === 0) {
      delete filter.price;
    }
  }

  return filter;
};

module.exports = {
  buildProductFilter,
};
