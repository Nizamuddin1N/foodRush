import { createProxyMiddleware } from 'http-proxy-middleware';

const proxyOptions = (target, prefix) => ({
  target,
  changeOrigin: true,
  pathRewrite: { [`^/${prefix}`]: '' },
  onError(err, req, res) {
    console.error(`Proxy error for ${req.originalUrl}:`, err.message);
    res.status(500).json({
      error: 'Proxy Error',
      message: err.message
    });
  },
  onProxyReq(proxyReq, req) {
    console.log(`Proxying ${req.method} ${req.originalUrl} -> ${target}`);
  }
});

export const setupRoutes = (app) => {
  app.use('/auth', createProxyMiddleware(proxyOptions(process.env.AUTH_SERVICE, 'auth')));
  app.use('/users', createProxyMiddleware(proxyOptions(process.env.USER_SERVICE, 'users')));
  app.use('/restaurants', createProxyMiddleware(proxyOptions(process.env.RESTAURANT_SERVICE, 'restaurants')));
  app.use('/orders', createProxyMiddleware(proxyOptions(process.env.ORDER_SERVICE, 'orders')));
  app.use('/payments', createProxyMiddleware(proxyOptions(process.env.PAYMENT_SERVICE, 'payments')));
};