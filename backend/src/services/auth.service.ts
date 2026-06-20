import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { config } from '../config';
import { SUBSCRIPTION_TIERS } from '../constants';

export class AuthService {
  /**
   * Hash password
   */
  async hashPassword(password: string): Promise<string> {
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(password, salt);
  }

  /**
   * Compare password with hash
   */
  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcryptjs.compare(password, hash);
  }

  /**
   * Generate JWT token
   */
  generateToken(userId: string, email: string, subscriptionTier: string = SUBSCRIPTION_TIERS.FREE): string {
    return jwt.sign(
      {
        userId,
        email,
        subscriptionTier,
      },
      config.JWT_SECRET,
      { expiresIn: config.JWT_EXPIRY }
    );
  }

  /**
   * Generate refresh token
   */
  generateRefreshToken(userId: string): string {
    return jwt.sign(
      { userId },
      config.REFRESH_TOKEN_SECRET,
      { expiresIn: '30d' }
    );
  }

  /**
   * Verify token
   */
  verifyToken(token: string): any {
    try {
      return jwt.verify(token, config.JWT_SECRET);
    } catch (error) {
      return null;
    }
  }

  /**
   * Generate API key
   */
  generateApiKey(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    return `sk_${timestamp}_${random}`;
  }
}

export const authService = new AuthService();
