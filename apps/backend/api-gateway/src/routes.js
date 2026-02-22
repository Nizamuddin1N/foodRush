import {createProxyMiddleware} from 'http-proxy-middleware';

export const setupRoutes = (app)=>{
    app.use('/auth', createProxyMiddleware({
        target:process.env.AUTH_SERVICE,
        changeOrigin: true
    }));
    
    app.use('/users', createProxyMiddleware({
        target:process.env.USER_SERVICE,
        changeOrigin:true
    }));
    
    app.use('/restaurants', createProxyMiddleware({
        target:process.env.RESTAURANT_SERVICE,
        changeOrigin: true
    }))
    app.use('/orders', createProxyMiddleware({
        target: process.env.ORDER_SERVICE,
        changeOrigin: true
    }));
    
    app.use('/payments', createProxyMiddleware({
        target: process.env.PAYMENT_SERVICE,
        changeOrigin: true
    }));
};