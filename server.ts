import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateIdentity } from './src/utils/generator';
import type { CountryCode, Gender, NameSet } from './src/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'healthy',
      platform: 'AI Studio Node.js Express & Vite Server',
      timestamp: new Date().toISOString()
    });
  });

  // GET /api/generate
  app.get('/api/generate', (req: Request, res: Response) => {
    try {
      const country = ((req.query.country as string) || 'US') as CountryCode;
      const gender = ((req.query.gender as string) || 'random') as Gender;
      const nameSet = ((req.query.nameset as string) || (req.query.nameSet as string) || 'american') as NameSet;
      const count = Math.min(Math.max(parseInt((req.query.count as string) || '1', 10), 1), 100);

      const identities = [];
      for (let i = 0; i < count; i++) {
        identities.push(
          generateIdentity({
            gender,
            nameSet,
            country,
            minAge: 20,
            maxAge: 65,
            middleInitial: true,
            emailDomainType: 'realistic'
          })
        );
      }

      if (count === 1) {
        return res.json(identities[0]);
      }
      return res.json({ count, results: identities });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Internal Server Error';
      return res.status(500).json({ error: message });
    }
  });

  // POST /api/generate
  app.post('/api/generate', (req: Request, res: Response) => {
    try {
      const body = req.body || {};
      const country = (body.country || 'US') as CountryCode;
      const gender = (body.gender || 'random') as Gender;
      const nameSet = (body.nameset || body.nameSet || 'american') as NameSet;
      const count = Math.min(Math.max(parseInt(body.count || '1', 10), 1), 100);

      const identities = [];
      for (let i = 0; i < count; i++) {
        identities.push(
          generateIdentity({
            gender,
            nameSet,
            country,
            minAge: body.minAge || 20,
            maxAge: body.maxAge || 65,
            middleInitial: body.middleInitial !== false,
            emailDomainType: body.emailDomainType || 'realistic'
          })
        );
      }

      if (count === 1) {
        return res.json(identities[0]);
      }
      return res.json({ count, results: identities });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Invalid Request';
      return res.status(400).json({ error: message });
    }
  });

  // GET /api/random-user proxy
  app.get('/api/random-user', async (req: Request, res: Response) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    try {
      const nat = (req.query.nat as string) || 'us';
      const gender = (req.query.gender as string) || '';
      const results = (req.query.results as string) || '1';

      let targetUrl = `https://randomuser.me/api/?nat=${encodeURIComponent(nat)}&results=${encodeURIComponent(results)}&noinfo&_cb=${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      if (gender && (gender === 'male' || gender === 'female')) {
        targetUrl += `&gender=${encodeURIComponent(gender)}`;
      }

      const response = await fetch(targetUrl, {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'VibTools-FakeNameGenerator/1.0',
          'Cache-Control': 'no-cache'
        }
      });

      if (!response.ok) {
        return res.status(response.status).json({ error: `RandomUser API returned ${response.status}` });
      }

      const data = await response.json();
      return res.json(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Random user proxy error';
      return res.status(500).json({ error: message });
    }
  });

  // GET /api/download-photo proxy for clean browser file downloading
  app.get('/api/download-photo', async (req: Request, res: Response) => {
    try {
      const url = req.query.url as string;
      const name = (req.query.name as string) || 'profile';

      if (!url || !/^https?:\/\//i.test(url)) {
        return res.status(400).json({ error: 'Valid url query param required' });
      }

      const cleanName = (name || 'profile')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '_')
        .replace(/_+/g, '_')
        .slice(0, 45);
      const filename = `${cleanName || 'profile'}_photo.jpg`;

      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });

      if (!response.ok) {
        return res.status(response.status).json({ error: 'Failed to fetch image from source' });
      }

      const contentType = response.headers.get('content-type') || 'image/jpeg';
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.setHeader('Content-Length', buffer.length);
      res.setHeader('Cache-Control', 'public, max-age=86400');
      res.setHeader('Access-Control-Allow-Origin', '*');

      return res.send(buffer);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error proxying photo';
      return res.status(500).json({ error: message });
    }
  });

  // Vite middleware in dev or static in prod
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
