
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/env.js'




export const requireAuth = (req, res, next) => {
  try {
    // console.log('HEADERS:', req.headers);

    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('AUTH HEADER ERROR:', authHeader)
      return res.status(401).json({ error: 'Authorization header missing or invalid' })
    }

    const token = authHeader.split(' ')[1]
    // console.log('TOKEN:', token);

   
    // console.log('JWT_SECRET in middleware:', JWT_SECRET);

    const decoded = jwt.verify(token, JWT_SECRET)

    req.user = decoded
    next()
  } catch (err) {
    console.error('JWT ERROR:', err.message)
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
};

