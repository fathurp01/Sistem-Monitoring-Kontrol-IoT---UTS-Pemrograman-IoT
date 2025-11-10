import logger from '../utils/logger.js';

/**
 * Global error handler middleware
 */
export function errorHandler(err, req, res, next) {
  logger.error(`❌ Error: ${err.message}`, { stack: err.stack });
  
  // Don't leak stack traces in production
  const isDevelopment = process.env.NODE_ENV !== 'production';
  
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(isDevelopment && { stack: err.stack })
  });
}

/**
 * 404 handler
 */
export function notFoundHandler(req, res) {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.path
  });
}
