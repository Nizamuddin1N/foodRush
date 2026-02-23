import { kafka } from './client.js';

const producer = kafka.producer();

export const publishPaymentSuccess = async (event) => {
  await producer.connect();

  await producer.send({
    topic: 'payment-success',
    messages: [
      { value: JSON.stringify(event) }
    ]
  });

  await producer.disconnect();
};