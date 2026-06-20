import { Router, Request, Response } from 'express';
import { authService } from '../services/auth.service';

const router = Router();

/**
 * POST /register
 * Register new user
 */
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, country } = req.body;

    // Validation
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        status: 'error',
        message: 'Missing required fields',
      });
    }

    // Hash password
    const hashedPassword = await authService.hashPassword(password);

    // In production, save to database
    const userId = `user_${Date.now()}`;
    const token = authService.generateToken(userId, email, 'free');
    const refreshToken = authService.generateRefreshToken(userId);

    res.json({
      status: 'success',
      data: {
        userId,
        email,
        firstName,
        lastName,
        token,
        refreshToken,
        subscriptionTier: 'free',
      },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});

/**
 * POST /login
 * User login
 */
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Email and password required',
      });
    }

    // In production, fetch user from database and compare passwords
    const userId = `user_${Math.random().toString(36).substring(7)}`;
    const token = authService.generateToken(userId, email, 'free');
    const refreshToken = authService.generateRefreshToken(userId);

    res.json({
      status: 'success',
      data: {
        userId,
        email,
        token,
        refreshToken,
        subscriptionTier: 'free',
      },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});

/**
 * POST /refresh-token
 * Refresh access token
 */
router.post('/refresh-token', (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        status: 'error',
        message: 'Refresh token required',
      });
    }

    // In production, verify refresh token
    const decoded = authService.verifyToken(refreshToken);

    if (!decoded) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid refresh token',
      });
    }

    const newToken = authService.generateToken(decoded.userId, decoded.email, 'free');

    res.json({
      status: 'success',
      data: {
        token: newToken,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});

/**
 * POST /logout
 * User logout
 */
router.post('/logout', (req: Request, res: Response) => {
  // In production, invalidate token in database
  res.json({
    status: 'success',
    message: 'Logged out successfully',
  });
});

export default router;
