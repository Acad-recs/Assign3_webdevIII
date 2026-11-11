/**
 * Lightweight request logger middleware.
 * Outputs HTTP method, requested URL, response status code, and execution time in ms.
 */
const requestLogger = (req, res, next) => {
  const start = Date.now();
  const { method, originalUrl } = req;

  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusCode = res.statusCode;
    if (process.env.NODE_ENV !== 'test') {
      console.log(`[HTTP] ${method} ${originalUrl} -> ${statusCode} (${duration}ms)`);
    }
  });

  next();
};

module.exports = requestLogger;
