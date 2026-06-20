import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { ERROR_CODES } from '../constants';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    subscriptionTier: string;
  };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        status: 'error',
        code: ERROR_CODES.UNAUTHORIZED,
        message: 'No token provided',
      });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET) as any;
    req.user = {
      id: decoded.userId,
      email: decoded.email,
      subscriptionTier: decoded.subscriptionTier,
    };

    next();
  } catch (error) {
    res.status(401).json({
      status: 'error',
      code: ERROR_CODES.UNAUTHORIZED,
      message: 'Invalid token',
    });
  }
};

export const optionalAuthMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      const decoded = jwt.verify(token, config.JWT_SECRET) as any;
      req.user = {
        id: decoded.userId,
        email: decoded.email,
        subscriptionTier: decoded.subscriptionTier,
      };
    }
  } catch (error) {
    // Continue without authentication
  }

  next();
};

export const tierMiddleware = (allowedTiers: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        code: ERROR_CODES.UNAUTHORIZED,
        message: 'Authentication required',
      });
    }

    if (!allowedTiers.includes(req.user.subscriptionTier)) {
      return res.status(403).json({
        status: 'error',
        code: ERROR_CODES.FEATURE_NOT_AVAILABLE,
        message: 'This feature is not available on your subscription tier',
      });
    }

    next();
  };
};

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 'error',
      code: 'VALIDATION_ERROR',
      message: err.message,
    });
  }

  res.status(err.statusCode || 500).json({
    status: 'error',
    code: err.code || ERROR_CODES.INTERNAL_SERVER_ERROR,
    message: err.message || 'Internal Server Error',
  });
};

export const rateLimitMiddleware = (
  maxRequests: number,
  windowMs: number
) => {
  const requestCounts = new Map<string, { count: number; resetTime: number }>();

  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const key = req.user?.id || req.ip;
    const now = Date.now();

    let userData = requestCounts.get(key);

    if (!userData || userData.resetTime < now) {
      userData = { count: 0, resetTime: now + windowMs };
      requestCounts.set(key, userData);
    }

    userData.count++;

    if (userData.count > maxRequests) {
      return res.status(429).json({
        status: 'error',
        code: ERROR_CODES.RATE_LIMIT_EXCEEDED,
        message: 'Rate limit exceeded',
      });
    }

    next();
  };
};
