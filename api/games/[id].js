// api/games/[id].js
import { verifyToken, cors } from '../../lib/auth.js';
import { getGames, setGames } from '../../lib/store.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  const user = verifyToken(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  const { id } = req.query;
  const games = await getGames();
  const idx = games.findIndex(g => g.id === id);

  if (idx === -1) return res.status(404).json({ error: 'Game not found' });

  if (req.method === 'PUT') {
    const updates = req.body || {};
    if (updates.tags && !Array.isArray(updates.tags)) {
      updates.tags = String(updates.tags).split(',').map(t => t.trim()).filter(Boolean);
    }
    games[idx] = { ...games[idx], ...updates, id, createdAt: games[idx].createdAt };
    await setGames(games);
    return res.status(200).json(games[idx]);
  }

  if (req.method === 'DELETE') {
    games.splice(idx, 1);
    await setGames(games);
    return res.status(200).json({ deleted: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
