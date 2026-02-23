import { Kafka } from 'kafkajs';

export const kafka = new Kafka({
  clientId: 'food-app',
  brokers: ['localhost:9092']
});