import express from 'express';
import userRoutes from './routes/user.routes.js';

const app = express();
app.use(express.json());
console.log("🚀 CI/CD test deploy v2");
app.use('/users', userRoutes);

export default app;
