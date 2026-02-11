import express from 'express';
import authRoutes from './routes/auth.routes.js';
import { authenticate } from './middleware/auth.middleware.js';

const app = express();
app.use(express.json());
app.get('/protected', authenticate, (req, res) => {
  res.json({
    message: 'Access granted',
    user: req.user
  });
});
app.use('/auth', authRoutes);

export default app;
