/** 
 *
 * How to run:
 *   1. npm install
 *   2. npm start   (compiles TypeScript to dist/, then runs node)
 *   3. Open http://localhost:3000/ in the browser
 */

import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import { logger } from './logger';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

interface Stats {
  requests: number;
  errors: number;
}

const stats: Stats = {
  requests: 0,
  errors: 0,
};

app.use((_req: Request, _res: Response, next: NextFunction) => {
  stats.requests += 1;
  next();
});

app.get('/', (_req: Request, res: Response) => {
  logger.info('home page requested');
  res.type('html').send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Tutorial app</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 36rem; margin: 2rem auto; padding: 0 1rem; line-height: 1.5; }
    h1 { font-size: 1.35rem; }
    ul { padding-left: 1.2rem; }
    a { color: #0b57d0; }
    .note { color: #444; font-size: 0.95rem; }
  </style>
</head>
<body>
  <h1>Monitoring, logging &amp; errors — tutorial</h1>
  <p>This server is running. Follow your assignment for each route below.</p>
  <ul>
    <li><a href="/health">Health check</a></li>
    <li><a href="/work">Work</a></li>
    <li><a href="/risky-work">Risky work</a></li>
    <li><a href="/stats">Stats</a> (JSON)</li>
  </ul>
  <p class="note">Tools can call <code>/health</code> without a browser to get JSON.</p>
</body>
</html>`);
});

app.get('/health', (req: Request, res: Response) => {
  logger.info('health check requested');
  if (req.accepts('html')) {
    res.type('html').send(`<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>OK</title>
<style>body{font-family:system-ui,sans-serif;margin:2rem}</style>
</head>
<body>
  <p><strong>All good.</strong> The tutorial API is running.</p>
  <p><a href="/">Back to home</a></p>
</body>
</html>`);
    return;
  }
  res.json({ ok: true, service: 'tutorial-api' });
});

// STEP 1: Example of a route that does some work and logs extra info.
app.get('/work', (_req: Request, res: Response) => {

  const result = { message: 'Task finished', stepsDone: 3 };
    logger.info('work finished', { stepsDone: result.stepsDone });

});

// STEP 2: Example of a route that throws an error. This will crash the server if not handled.
app.get('/risky-work', (_req: Request, res: Response) => {
  const data = JSON.parse('this is not valid json {{{');
  res.json({ ok: true, data });
});

app.get('/stats', (_req: Request, res: Response) => {
  res.json({ ...stats });
});

app.listen(PORT, () => {
  logger.info('server started', { port: PORT });
  console.log(`Open http://localhost:${PORT}/`);
});
