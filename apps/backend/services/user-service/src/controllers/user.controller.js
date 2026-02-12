import { pool } from '../db/index.js';
import { randomUUID } from 'crypto';


export const createProfile = async (req, res) => {
  const { fullName, phone } = req.body;
  console.log(fullName);
  console.log(phone);
  const userId = req.user.userId;

  await pool.query(
    'INSERT INTO users_profile (user_id, full_name, phone) VALUES ($1,$2,$3)',
    [userId, fullName, phone]
  );

  res.status(201).json({ message: 'Profile created' });
};

export const getProfile = async (req, res) => {
  const userId = req.user.userId;

  const result = await pool.query(
    'SELECT * FROM users_profile WHERE user_id=$1',
    [userId]
  );

  if (!result.rows.length)
    return res.status(404).json({ message: 'Profile not found' });

  res.json(result.rows[0]);
};

export const addAddress = async (req, res) => {
  const { addressLine, city, state, zip } = req.body;
  const userId = req.user.userId;

  await pool.query(
    'INSERT INTO addresses (id, user_id, address_line, city, state, zip) VALUES ($1,$2,$3,$4,$5,$6)',
    [randomUUID(), userId, addressLine, city, state, zip]
  );

  res.status(201).json({ message: 'Address added' });
};
