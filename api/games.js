// api/games.js
import { verifyToken, cors } from '../lib/auth.js';
import { getGames, setGames } from '../lib/store.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  // GET — public
  if (req.method === 'GET') {
    const games = await getGames();
    return res.status(200).json(games);
  }

  // POST — admin only
  if (req.method === 'POST') {
    const user = verifyToken(req);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    const { title, downloadLink, description, category, platform, size, version, image, tags, featured, isNew } = req.body || {};
    if (!title || !downloadLink)
      return res.status(400).json({ error: 'Title and download link are required' });

    const games = await getGames();

    const game = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      title,
      description: description || '',
      category: category || '',
      platform: platform || '',
      size: size || '',
      version: version || '',
      image: image || '',
      downloadLink,
      tags: Array.isArray(tags) ? tags : (tags ? String(tags).split(',').map(t => t.trim()).filter(Boolean) : []),
      featured: !!featured,
      isNew: !!isNew,
      createdAt: Date.now(),
    };

    games.unshift(game);
    await setGames(games);
    return res.status(201).json(game);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
