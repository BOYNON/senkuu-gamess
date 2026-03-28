// api/login.js
import { checkCredentials, signToken, cors } from '../lib/auth.js';

export default function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { username, password } = req.body || {};
  if (!username || !password)
    return res.status(400).json({ error: 'Username and password required' });

  if (!checkCredentials(username, password))
    return res.status(401).json({ error: 'Invalid credentials' });

  const token = signToken(username);
  return res.status(200).json({ token, username });
}
