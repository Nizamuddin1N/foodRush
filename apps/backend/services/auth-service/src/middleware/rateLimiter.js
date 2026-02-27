import { RateLimiterRedis } from 'rate-limiter-flexible';
import { redis } from '../redis/client.js';

const rateLimiter = new RateLimiterRedis({
  storeClient: redis,
  points: 5,
  duration: 60
});

export const rateLimitMiddleware = async (req, res, next) => {
  try {
    const key =
      req.headers['x-forwarded-for']?.split(',')[0] || req.ip

    console.log("RATE KEY:", key)

    await rateLimiter.consume(key)
    next()
  } catch {
    console.log("BLOCKED:", req.ip)
    res.status(429).json({ message: 'Too many requests' })
  }
}