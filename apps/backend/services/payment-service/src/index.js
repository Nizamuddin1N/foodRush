import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import {startOutboxWorker} from './kafka/outboxWorker.js';
startOutboxWorker();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Payment service running on port ${PORT}`);
});