import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token)
      return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export const authorizeRestaurantOwner = (req, res, next) => {
  if (req.user.role !== 'RESTAURANT') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};
