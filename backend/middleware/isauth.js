
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

export const isAuth = (req, res, next) => {
  const token = req.cookies.virtualToken

  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
   req.userId = decoded.userID;

    next();
  } catch (error) {
    console.error('JWT verification error:', error.message);
    return res.status(500).json({ message: "Invalid token" });
  }
}