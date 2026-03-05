import { createProxyMiddleware } from 'http-proxy-middleware';

const proxyOptions = (target) => ({
  target,
  changeOrigin: true,
  logLevel: "debug",

  pathRewrite: (path) => path.replace(/^\/[^/]+/, ''),

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

  app.use('/auth', createProxyMiddleware(proxyOptions(process.env.AUTH_SERVICE)));

  app.use('/users', createProxyMiddleware(proxyOptions(process.env.USER_SERVICE)));

  app.use('/restaurants', createProxyMiddleware(proxyOptions(process.env.RESTAURANT_SERVICE)));

  app.use('/orders', createProxyMiddleware(proxyOptions(process.env.ORDER_SERVICE)));

  app.use('/payments', createProxyMiddleware(proxyOptions(process.env.PAYMENT_SERVICE)));

};