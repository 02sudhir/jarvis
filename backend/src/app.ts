import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'express-async-errors';
import { config } from './config';
import { authMiddleware, errorHandler } from './middleware/auth';

const app: Express = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: config.CORS_ORIGIN,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: config.NODE_ENV,
  });
});

app.get('/api/v1', (req: Request, res: Response) => {
  res.json({
    message: 'Cricket Analytics Dashboard API v1',
    endpoints: {
      auth: '/api/v1/auth',
      matches: '/api/v1/matches',
      players: '/api/v1/players',
      predictions: '/api/v1/predictions',
      users: '/api/v1/users',
      subscriptions: '/api/v1/subscriptions',
    },
  });
});

// API Routes (to be imported)
app.use('/api/v1/auth', require('./routes/auth.routes').default);
app.use('/api/v1/matches', require('./routes/matches.routes').default);
app.use('/api/v1/players', require('./routes/players.routes').default);
app.use('/api/v1/predictions', require('./routes/predictions.routes').default);
app.use('/api/v1/users', authMiddleware, require('./routes/users.routes').default);

// Error Handler
app.use(errorHandler);

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint not found',
    path: req.path,
  });
});

export default app;
