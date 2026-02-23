import { Kafka } from 'kafkajs';

export const kafka = new Kafka({
  clientId: 'food-app',
  brokers: ['kafka:9092']
});