import rateLimit from 'express-rate-limit';

const authRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 2, // Limit each IP to 2 requests per minute
  skipSuccessfulRequests: false, // Count both successful and failed requests
  message: 'Too many requests, please try again after a minute.',
  standardHeaders: true, // Include RateLimit headers
  legacyHeaders: false, // Disable legacy headers
});

export { authRateLimiter };
  