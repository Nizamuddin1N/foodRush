import { kafka } from './client.js';
import { pool } from '../db/index.js';

export const startPaymentConsumer = async () => {
  const consumer = kafka.consumer({ groupId: 'order-group' });

  await consumer.connect();
  await consumer.subscribe({ topic: 'payment-success' });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const event = JSON.parse(message.value.toString());

      await pool.query(
        'UPDATE orders SET status=$1 WHERE id=$2',
        ['CONFIRMED', event.orderId]
      );

      console.log('Order confirmed via Kafka:', event.orderId);
    }
  });
};