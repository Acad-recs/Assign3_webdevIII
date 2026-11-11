/**
 * Normalizes sorting and pagination parameters with robust validation and defaults.
 */
const getPaginationAndSort = (queryParams = {}) => {
  const { sortBy, order, page, limit } = queryParams;

  // Allowed sort fields
  const allowedSortFields = ['name', 'price', 'quantity', 'reorderLevel', 'createdAt'];
  const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';
  const sortOrder = order && order.toLowerCase() === 'asc' ? 1 : -1;
  const sort = { [sortField]: sortOrder };

  // Pagination bounds
  const parsedPage = parseInt(page, 10);
  const parsedLimit = parseInt(limit, 10);

  const validPage = !isNaN(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const validLimit = !isNaN(parsedLimit) && parsedLimit > 0 && parsedLimit <= 100 ? parsedLimit : 10;
  const skip = (validPage - 1) * validLimit;

  return {
    sort,
    page: validPage,
    limit: validLimit,
    skip,
  };
};

module.exports = {
  getPaginationAndSort,
};
