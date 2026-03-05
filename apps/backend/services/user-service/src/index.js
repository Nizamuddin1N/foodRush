import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
const PORT = process.env.PORT || 4002;
app.listen(process.env.PORT, '0.0.0.0', () => {
  console.log(`User Service running on port ${PORT}`);
});
