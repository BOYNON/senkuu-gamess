// lib/store.js — thin wrapper around Vercel KV
import { kv } from '@vercel/kv';

const KEY = 'games';

export async function getGames() {
  try {
    const data = await kv.get(KEY);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function setGames(games) {
  await kv.set(KEY, games);
}
