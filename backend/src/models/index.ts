// User Model
export interface IUser {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  country: string;
  subscriptionTier: string;
  subscriptionStartDate: Date;
  subscriptionEndDate?: Date;
  apiKey?: string;
  preferences: {
    favoriteTeams: string[];
    favoriteFormats: string[];
    notifications: boolean;
    emailUpdates: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

// Match Model
export interface IMatch {
  id: string;
  externalId: string;
  title: string;
  description?: string;
  format: string;
  status: string;
  startDate: Date;
  endDate?: Date;
  team1: {
    id: string;
    name: string;
    score?: number;
    wickets?: number;
    overs?: number;
  };
  team2: {
    id: string;
    name: string;
    score?: number;
    wickets?: number;
    overs?: number;
  };
  venue: {
    id: string;
    name: string;
    city: string;
    country: string;
  };
  tossInfo?: {
    winner: string;
    decision: string;
  };
  weather?: {
    temperature: number;
    condition: string;
    humidity: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Player Model
export interface IPlayer {
  id: string;
  externalId: string;
  name: string;
  country: string;
  role: string; // batsman, bowler, all-rounder
  jerseyNumber?: number;
  dateOfBirth?: Date;
  stats: {
    matches: number;
    runs: number;
    wickets: number;
    average: number;
    strikeRate: number;
  };
  currentTeam?: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Subscription Model
export interface ISubscription {
  id: string;
  userId: string;
  tier: string;
  startDate: Date;
  endDate: Date;
  status: string; // active, expired, cancelled
  paymentMethod?: string;
  transactionId?: string;
  amount: number;
  currency: string;
  autoRenew: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Prediction Model
export interface IPrediction {
  id: string;
  matchId: string;
  predictionType: string; // match_winner, top_scorer, etc.
  team?: string;
  player?: string;
  probability: number;
  confidence: number;
  reasoning: string;
  modelVersion: string;
  accuracy?: number;
  createdAt: Date;
  updatedAt: Date;
}

// Live Commentary Model
export interface ICommentary {
  id: string;
  matchId: string;
  ballNumber: number;
  overNumber: number;
  batsman: string;
  bowler: string;
  runs: number;
  isWicket: boolean;
  description: string;
  timestamp: Date;
}

// API Usage Model
export interface IApiUsage {
  id: string;
  userId: string;
  endpoint: string;
  method: string;
  statusCode: number;
  responseTime: number;
  timestamp: Date;
}

// Notification Model
export interface INotification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  data?: Record<string, any>;
  read: boolean;
  createdAt: Date;
  readAt?: Date;
}
