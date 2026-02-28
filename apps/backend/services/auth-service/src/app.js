import express from 'express';
import authRoutes from './routes/auth.routes.js';
import { authenticate } from './middleware/auth.middleware.js';

const app = express();
// app.set('trust proxy', 1);
app.set('trust proxy', true);
app.use(express.json());
app.get('/protected', authenticate, (req, res) => {
  res.json({
    message: 'Access granted',
    user: req.user
  });
});
app.use('/', authRoutes);

export default app;
