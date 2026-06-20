// User Subscription Tiers
export const SUBSCRIPTION_TIERS = {
  FREE: 'free',
  ENTHUSIAST: 'enthusiast',
  FANTASY_PRO: 'fantasy_pro',
  ANALYST_BETTOR: 'analyst_bettor',
} as const;

// Subscription Pricing (in cents)
export const SUBSCRIPTION_PRICING = {
  [SUBSCRIPTION_TIERS.FREE]: 0,
  [SUBSCRIPTION_TIERS.ENTHUSIAST]: 499, // $4.99/month
  [SUBSCRIPTION_TIERS.FANTASY_PRO]: 999, // $9.99/month
  [SUBSCRIPTION_TIERS.ANALYST_BETTOR]: 2499, // $24.99/month
};

// Feature Access by Tier
export const TIER_FEATURES = {
  [SUBSCRIPTION_TIERS.FREE]: {
    realTimeMatches: false,
    historicalData: false,
    advancedStats: false,
    fantasyTools: false,
    predictions: false,
    bettingInsights: false,
    apiAccess: false,
    customDashboards: 1,
    maxSavedPlayers: 1,
    monthlyApiCalls: 5,
    adFree: false,
    notifications: 1,
  },
  [SUBSCRIPTION_TIERS.ENTHUSIAST]: {
    realTimeMatches: true,
    historicalData: true,
    advancedStats: true,
    fantasyTools: false,
    predictions: false,
    bettingInsights: false,
    apiAccess: false,
    customDashboards: 10,
    maxSavedPlayers: 10,
    monthlyApiCalls: 100,
    adFree: true,
    notifications: 5,
  },
  [SUBSCRIPTION_TIERS.FANTASY_PRO]: {
    realTimeMatches: true,
    historicalData: true,
    advancedStats: true,
    fantasyTools: true,
    predictions: true,
    bettingInsights: false,
    apiAccess: false,
    customDashboards: 20,
    maxSavedPlayers: 50,
    monthlyApiCalls: 1000,
    adFree: true,
    notifications: 20,
  },
  [SUBSCRIPTION_TIERS.ANALYST_BETTOR]: {
    realTimeMatches: true,
    historicalData: true,
    advancedStats: true,
    fantasyTools: true,
    predictions: true,
    bettingInsights: true,
    apiAccess: true,
    customDashboards: 50,
    maxSavedPlayers: 100,
    monthlyApiCalls: 10000,
    adFree: true,
    notifications: 50,
  },
};

// Match Status
export const MATCH_STATUS = {
  SCHEDULED: 'scheduled',
  LIVE: 'live',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  POSTPONED: 'postponed',
};

// Cricket Format
export const CRICKET_FORMAT = {
  TEST: 'test',
  ODI: 'odi',
  T20: 't20',
  T20_LEAGUE: 't20_league',
};

// API Response Status
export const API_STATUS = {
  SUCCESS: 'success',
  ERROR: 'error',
  PENDING: 'pending',
};

// Error Codes
export const ERROR_CODES = {
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  SUBSCRIPTION_EXPIRED: 'SUBSCRIPTION_EXPIRED',
  FEATURE_NOT_AVAILABLE: 'FEATURE_NOT_AVAILABLE',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  UNAUTHORIZED: 'UNAUTHORIZED',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
};

// Cache Keys
export const CACHE_KEYS = {
  USER: (userId: string) => `user:${userId}`,
  MATCH: (matchId: string) => `match:${matchId}`,
  PLAYER: (playerId: string) => `player:${playerId}`,
  PREDICTIONS: (matchId: string) => `predictions:${matchId}`,
  LIVE_SCORES: 'live_scores:all',
};

// Notification Types
export const NOTIFICATION_TYPES = {
  MATCH_START: 'match_start',
  WICKET: 'wicket',
  BOUNDARY: 'boundary',
  MILESTONE: 'milestone',
  PRICE_CHANGE: 'price_change',
  PREDICTION_UPDATE: 'prediction_update',
};
