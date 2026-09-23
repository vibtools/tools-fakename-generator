import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateIdentity } from './src/utils/generator.js';
import type { CountryCode, Gender, NameSet } from './src/types.js';

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
    try {
      const nat = (req.query.nat as string) || 'us';
      const gender = (req.query.gender as string) || '';
      const results = (req.query.results as string) || '1';

      let targetUrl = `https://randomuser.me/api/?nat=${encodeURIComponent(nat)}&results=${encodeURIComponent(results)}&noinfo`;
      if (gender && (gender === 'male' || gender === 'female')) {
        targetUrl += `&gender=${encodeURIComponent(gender)}`;
      }

      const response = await fetch(targetUrl, {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'VibTools-FakeNameGenerator/1.0'
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
