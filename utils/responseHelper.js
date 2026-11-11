/**
 * Standard API response helper utilities for uniform JSON output structures.
 */
const sendSuccess = (res, statusCode, data = null, message = null, meta = {}) => {
  const payload = {
    success: true,
    ...(message && { message }),
    ...(data !== null && { data }),
    ...meta,
  };
  return res.status(statusCode).json(payload);
};

const sendError = (res, statusCode, message, errors = null) => {
  const payload = {
    success: false,
    message,
    ...(errors && { errors }),
  };
  return res.status(statusCode).json(payload);
};

module.exports = {
  sendSuccess,
  sendError,
};
