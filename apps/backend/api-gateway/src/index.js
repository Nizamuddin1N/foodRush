import express from 'express';
import dotenv from 'dotenv';
import { setupRoutes } from './routes.js';

dotenv.config();

const app = express();
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'API Gateway running' });
});

setupRoutes(app);

const PORT = Number(process.env.PORT) || 4000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API Gateway running on port ${PORT}`);
});