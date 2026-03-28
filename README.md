# SENKUU GAMESS 🎮

Personal game vault — futuristic, hostable on Vercel with persistent storage and admin login.

---

## Stack

- **Frontend**: Vanilla HTML/CSS/JS (zero frameworks, fast)
- **Backend**: Vercel Serverless Functions (Node.js)
- **Storage**: Vercel KV (Redis) — games persist forever
- **Auth**: JWT + bcrypt — secure admin login

---

## Deploy to Vercel (5 minutes)

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial SENKUU GAMESS"
git remote add origin https://github.com/YOUR_USERNAME/senkuu-gamess.git
git push -u origin main
```

### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import your GitHub repo
3. Framework: **Other**
4. Click **Deploy** (will fail first time — that's fine, need env vars next)

### 3. Add Vercel KV Storage

1. In your Vercel project → **Storage** tab → **Create Database**
2. Choose **KV** → name it `senkuu-gamess-kv`
3. Click **Connect to Project** → it auto-adds the env vars

### 4. Set Environment Variables

In Vercel → Settings → Environment Variables, add:

| Key | Value |
|-----|-------|
| `JWT_SECRET` | any long random string (e.g. `senkuu-super-secret-jwt-2025-xyz`) |
| `ADMIN_USER` | `senkuu` (or whatever username you want) |
| `ADMIN_HASH` | bcrypt hash of your password (see below) |

**To generate ADMIN_HASH:**

Option A — Use this site: https://bcrypt-generator.com (rounds: 10)

Option B — Run locally:
```bash
node -e "const b=require('bcryptjs');console.log(b.hashSync('YOUR_PASSWORD',10))"
```

Example hash for password `admin1234`:
```
$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lheO
```

### 5. Redeploy

After setting env vars → Vercel will auto-redeploy. Your site is live! 🚀

---

## Local Development

```bash
npm install -g vercel
npm install
vercel dev
```

Local dev uses Vercel KV — you'll need to run `vercel env pull .env.local` first to get your KV credentials locally.

---

## Default Credentials (dev only)

If env vars aren't set, falls back to:
- **Username**: `senkuu`
- **Password**: `admin1234`

**Change these before going live.**

---

## Adding Games

1. Visit your site
2. Click **Login** in the top right
3. Enter your admin credentials
4. Click **Add Game** — fill in title, download link, cover image, etc.
5. Game appears instantly in the vault for everyone

---

## File Structure

```
senkuu-gamess/
├── index.html          ← Full frontend
├── vercel.json         ← Routing config
├── package.json        ← Dependencies
├── lib/
│   ├── auth.js         ← JWT + bcrypt helpers
│   └── store.js        ← Vercel KV helpers
└── api/
    ├── login.js        ← POST /api/login
    ├── games.js        ← GET/POST /api/games
    └── games/
        └── [id].js     ← PUT/DELETE /api/games/:id
```

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/login` | ❌ | Get JWT token |
| `GET` | `/api/games` | ❌ | List all games |
| `POST` | `/api/games` | ✅ | Add a game |
| `PUT` | `/api/games/:id` | ✅ | Edit a game |
| `DELETE` | `/api/games/:id` | ✅ | Delete a game |

---

Built for Senkuu 🔥
