import express from 'express';
import userRoutes from './routes/user.routes.js';

const app = express();
app.use(express.json());
console.log("CI/CD test deploy v2");
app.use('/', userRoutes);
app.get('/health', (req,res)=>{
  res.json({service:"auth service working"})
})
export default app;
