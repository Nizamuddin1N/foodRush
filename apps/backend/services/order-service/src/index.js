import dotev from 'dotenv';
dotev.config();
import { startPaymentConsumer } from './kafka/consumer.js';
startPaymentConsumer();
import app from './app.js';
const PORT = 4004;
app.listen(PORT, '0.0.0.0', ()=>{
    console.log(`Order service running on port ${PORT}`);
});