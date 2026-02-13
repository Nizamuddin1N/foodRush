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
};