import dotenv from 'dotenv';
dotenv.config();

import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, // ensure number
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, // MUST be string
  database: process.env.DB_NAME
});
