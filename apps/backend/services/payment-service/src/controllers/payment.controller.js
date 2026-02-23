import { pool } from '../db/index.js';
import { randomUUID } from 'crypto';
import axios from 'axios';
import { publishPaymentSuccess } from '../kafka/producer.js';

export const processPayment = async (req, res) => {
  const client = await pool.connect();

  try {
    const { orderId } = req.body;
    const userId = req.user.userId;

    await client.query('BEGIN');

    const existing = await client.query(
      'SELECT * FROM payments WHERE order_id=$1',
      [orderId]
    );

    if (existing.rows.length) {
      await client.query('ROLLBACK');
      return res.status(400).json({ message: 'Payment already processed' });
    }

    const orderResponse = await axios.get(
      `${process.env.ORDER_SERVICE}/${orderId}`,
      {
        headers: {
          Authorization: req.headers.authorization
        }
      }
    );

    const order = orderResponse.data;

    if (order.status !== 'CREATED') {
      await client.query('ROLLBACK');
      return res.status(400).json({ message: 'Order not payable' });
    }

    const paymentId = randomUUID();

    await client.query(
      'INSERT INTO payments (id, order_id, user_id, amount, status) VALUES ($1,$2,$3,$4,$5)',
      [paymentId, orderId, userId, order.total_amount, 'SUCCESS']
    );

    await publishPaymentSuccess({
      orderId,
      userId,
      amount: order.total_amount
    });

    await client.query('COMMIT');

    res.json({
      message: 'Payment successful',
      paymentId
    });

  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err.message);
    res.status(500).json({ message: 'Payment failed' });
  } finally {
    client.release();
  }
};