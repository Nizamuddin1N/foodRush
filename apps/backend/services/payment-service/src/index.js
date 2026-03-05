import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import {startOutboxWorker} from './kafka/outboxWorker.js';
startOutboxWorker();

const PORT = process.env.PORT || 4005;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Payment service running on port ${PORT}`);
});