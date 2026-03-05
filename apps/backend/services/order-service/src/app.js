import express from 'express';
import orderRoutes from './routes/order.routes.js';

const app = express();
app.use(express.json());
app.use('/', orderRoutes);
app.get('/health', (req,res)=>{
  res.json({service:"auth service working"})
})
export default app;