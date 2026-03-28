// lib/auth.js  — shared helpers for all API routes
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET  = process.env.JWT_SECRET  || 'senkuu-dev-secret-change-in-prod';
const ADMIN_USER  = process.env.ADMIN_USER   || 'senkuu';
const ADMIN_HASH  = process.env.ADMIN_HASH   || bcrypt.hashSync('admin1234', 10);

export function checkCredentials(username, password) {
  if (username !== ADMIN_USER) return false;
  return bcrypt.compareSync(password, ADMIN_HASH);
}

export function signToken(username) {
  return jwt.sign({ username, role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(req) {
  const auth = req.headers['authorization'] || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}
