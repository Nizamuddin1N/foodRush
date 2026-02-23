
import { kafka } from './client.js';
import { pool } from '../db/index.js';

const producer = kafka.producer();

export const startOutboxWorker = async () => {
  await producer.connect();

  setInterval(async () => {
    const result = await pool.query(
      'SELECT * FROM outbox_events WHERE processed=false LIMIT 10'
    );

    for (const row of result.rows) {
      try {
        await producer.send({
          topic: 'payment-success',
          messages: [
            { value: JSON.stringify(row.payload) }
          ]
        });

        await pool.query(
          'UPDATE outbox_events SET processed=true WHERE id=$1',
          [row.id]
        );

        console.log('Event published from outbox:', row.id);

      } catch (err) {
        console.error('Kafka publish failed, retrying...');
      }
    }
  }, 3000);
};