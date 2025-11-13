import express from 'express';
import pinoHttp from 'pino-http';
import router from './routes.js';
import { config } from './config.js';
import { logger } from './logger.js';

const app = express();
app.use(express.json({ limit: '1mb' }));
app.use(pinoHttp({ logger }));

app.use(router);

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  logger.error({ err }, 'Unhandled error');
  res.status(500).json({ message: err.message });
});

const server = app.listen(config.port, () => {
  logger.info({ port: config.port }, 'Zeckna sync service started');
});

process.on('SIGINT', () => {
  logger.info('Received SIGINT, shutting down');
  server.close(() => process.exit(0));
});

process.on('SIGTERM', () => {
  logger.info('Received SIGTERM, shutting down');
  server.close(() => process.exit(0));
});

