import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // Server
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000',

  // Database
  DATABASE: {
    POSTGRES: {
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'password',
      database: process.env.POSTGRES_DB || 'cricket_analytics',
    },
    MONGODB: {
      uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/cricket_analytics',
    },
    REDIS: {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
    },
  },

  // Authentication
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '7d',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'refresh-secret-key',

  // External APIs
  CRICKET_API: {
    KEY: process.env.CRICKET_API_KEY || '',
    BASE_URL: process.env.CRICKET_API_BASE_URL || 'https://api.cricketapi.com',
  },
  WEATHER_API: {
    KEY: process.env.WEATHER_API_KEY || '',
    BASE_URL: process.env.WEATHER_API_BASE_URL || 'https://api.openweathermap.org',
  },
  ODDS_API: {
    KEY: process.env.ODDS_API_KEY || '',
    BASE_URL: process.env.ODDS_API_BASE_URL || 'https://api.odds-api.com',
  },

  // Payment
  STRIPE: {
    SECRET_KEY: process.env.STRIPE_SECRET_KEY || '',
    PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY || '',
  },

  // Email
  EMAIL: {
    SMTP_HOST: process.env.EMAIL_SMTP_HOST || 'smtp.gmail.com',
    SMTP_PORT: parseInt(process.env.EMAIL_SMTP_PORT || '587'),
    USER: process.env.EMAIL_USER || '',
    PASSWORD: process.env.EMAIL_PASSWORD || '',
    FROM: process.env.EMAIL_FROM || 'noreply@cricketanalytics.com',
  },

  // Feature Flags
  FEATURES: {
    ENABLE_PREDICTIONS: process.env.ENABLE_PREDICTIONS === 'true',
    ENABLE_BETTING_INSIGHTS: process.env.ENABLE_BETTING_INSIGHTS === 'true',
    ENABLE_FANTASY_TOOLS: process.env.ENABLE_FANTASY_TOOLS === 'true',
  },

  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN || ['http://localhost:3000', 'http://localhost:3001'],

  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
};
