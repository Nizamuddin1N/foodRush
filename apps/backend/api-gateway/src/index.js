import express from 'express';
import dotenv from 'dotenv';
import { setupRoutes } from './routes.js';

dotenv.config();

const app = express();
app.use(express.json());

setupRoutes(app);

// ✅ bullet-proof
const PORT = Number(process.env.PORT) || 4000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API Gateway running on port ${PORT}`);
});