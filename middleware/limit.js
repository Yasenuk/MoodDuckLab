const rateLimit = require('express-rate-limit');

const reviewLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 2,
  handler: async (req, res) => {
    res.status(429).json({ success: false, error: 'Ти вже залишив відгук, спробуй пізніше!' });
  }
});

module.exports = reviewLimiter;
