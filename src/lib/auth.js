import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

export const verifyToken = async (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export const getTokenFromRequest = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.split(' ')[1];
};

export const requireAuth = (handler) => {
  return async (req, res) => {
    const token = getTokenFromRequest(req);
    
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    try {
      const decoded = await verifyToken(token);
      req.user = decoded;
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
};

export const requireAdmin = (handler) => {
  return async (req, res) => {
    const token = getTokenFromRequest(req);
    
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    try {
      const decoded = await verifyToken(token);
      if (decoded.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
      }
      req.user = decoded;
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
}; 