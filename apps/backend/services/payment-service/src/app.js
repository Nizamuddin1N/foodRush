import express from 'express';
import paymentRoutes from './routes/payment.routes.js';

const app = express();
app.use(express.json());

// HEALTH CHECK
app.get('/health', (req, res) => {
  res.send('Payment service is healthy');
});

//MOUNT ROUTES CORRECTLY
app.use('/payments', paymentRoutes);

// FALLBACK
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;