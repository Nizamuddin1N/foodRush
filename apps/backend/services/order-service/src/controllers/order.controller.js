import { pool } from '../db/index.js';
import { v4 as uuidv4 } from 'uuid';

export const createOrder = async (req, res) => {
  const { restaurantId, items } = req.body;
  const userId = req.user.userId;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const orderId = uuidv4();

  try {
    await pool.query('BEGIN');

    await pool.query(
      `INSERT INTO orders (id, user_id, restaurant_id, status, total_amount)
       VALUES ($1, $2, $3, $4, $5)`,
      [orderId, userId, restaurantId, 'CREATED', totalAmount]
    );

    for (const item of items) {
      await pool.query(
        `INSERT INTO order_items
         (id, order_id, menu_item_id, name, price, quantity)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [uuidv4(), orderId, item.menuItemId, item.name, item.price, item.quantity]
      );
    }

    await pool.query('COMMIT');

    res.status(201).json({
      id: orderId,
      status: 'CREATED',
      totalAmount
    });

  } catch (err) {
    await pool.query('ROLLBACK');
    console.error('ORDER ERROR 👉', err.message);
    res.status(500).json({ message: 'Order creation failed' });
  }
};


/**
 * GET /orders/user
 * Get logged-in user's orders
 */
export const getMyOrders = async (req, res) => {
  try {
    console.log('JWT USER ID:', req.user.userId);

    const result = await pool.query(
      `SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC`,
      [req.user.userId]
    );

    console.log('ORDERS FOUND:', result.rows.length);

    res.json(result.rows);
  } catch (err) {
    console.error('GET MY ORDERS ERROR:', err.message);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};


/**
 * GET /orders/:id
 * Owner only
 */
export const getOrderById = async (req, res) => {
  const orderRes = await pool.query(
    `SELECT * FROM orders WHERE id = $1`,
    [req.params.id]
  );

  if (!orderRes.rows.length)
    return res.status(404).json({ message: 'Order not found' });

  const order = orderRes.rows[0];

  if (order.user_id !== req.user.id)
    return res.status(403).json({ message: 'Not your order' });

  const itemsRes = await pool.query(
    `SELECT * FROM order_items WHERE order_id = $1`,
    [order.id]
  );

  res.json({ ...order, items: itemsRes.rows });
};

/**
 * PATCH /orders/:id/status
 * Restaurant only
 */
export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  const validStatuses = [
    'CREATED',
    'CONFIRMED',
    'PREPARING',
    'OUT_FOR_DELIVERY',
    'DELIVERED',
    'CANCELLED'
  ];

  if (!validStatuses.includes(status))
    return res.status(400).json({ message: 'Invalid status' });

  const result = await pool.query(
    `UPDATE orders SET status = $1 WHERE id = $2 RETURNING *`,
    [status, req.params.id]
  );

  if (!result.rows.length)
    return res.status(404).json({ message: 'Order not found' });

  res.json(result.rows[0]);
};
