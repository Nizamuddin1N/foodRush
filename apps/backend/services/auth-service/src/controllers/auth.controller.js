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

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  await pool.query(
    'INSERT INTO refresh_tokens (id, user_id, token) VALUES ($1,$2,$3)',
    [randomUUID(), user.id, refreshToken]
  );

  res.json({
    accessToken,
    refreshToken
  });
};


export const refresh = async(req, res) =>{
    const {refreshToken} = req.body;
    
    if(!refreshToken){
        return res.status(401).json({message: 'Refresh token is required'});
    }
    
    try{
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const result = await pool.query(
            'SELECT *FROM refresh_token WHERE token=$1',
            [refreshToken]
        );
        if(!result.rows.length){
            return res.status(401).json({message: 'Invalid refresh token'});
        }
        
        const payload = {
            userId:decoded.userId,
            role:decoded.role
        }
        
        const newAccessToken = generateAccessToken(payload);
        
        res.json({accessToken: newAccessToken});
    } catch(err){
        return res.status(401).json({message:'Invalid refresh token'});
    }
};

export const logout = async(req, res)=>{
    const {refreshToken} = req.body;
    await pool.query(
        'DELETE FROM refresh_token WHERE token=$1',
        [refreshToken]
    );
    res.json({message: 'Logged out successfully'});
}