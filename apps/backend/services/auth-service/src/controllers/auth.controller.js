import { pool } from '../db/index.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';
import { randomUUID } from 'crypto';

export const signup = async (req, res) => {
  const { email, password, role } = req.body;

  const passwordHash = await hashPassword(password);
  const userId = randomUUID();

  await pool.query(
    'INSERT INTO users_auth (id, email, password_hash, role) VALUES ($1,$2,$3,$4)',
    [userId, email, passwordHash, role || 'USER']
  );

  res.status(201).json({ message: 'User created' });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query(
    'SELECT * FROM users_auth WHERE email=$1',
    [email]
  );

  if (!result.rows.length)
    return res.status(401).json({ message: 'Invalid credentials' });

  const user = result.rows[0];
  const valid = await comparePassword(password, user.password_hash);

  if (!valid)
    return res.status(401).json({ message: 'Invalid credentials' });

  const payload = { userId: user.id, role: user.role };

  res.json({
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload)
  });
};
