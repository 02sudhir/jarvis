import { Router, Request, Response } from 'express';
import { authMiddleware, tierMiddleware } from '../middleware/auth';
import { predictionService } from '../services/prediction.service';
import { SUBSCRIPTION_TIERS } from '../constants';

const router = Router();

/**
 * GET /match/:matchId/winner
 * Predict match winner
 */
router.get(
  '/match/:matchId/winner',
  authMiddleware,
  tierMiddleware([SUBSCRIPTION_TIERS.FANTASY_PRO, SUBSCRIPTION_TIERS.ANALYST_BETTOR]),
  async (req: Request, res: Response) => {
    try {
      const { matchId } = req.params;

      // Mock team data
      const team1 = { id: 'team_1', name: 'Team A', recentForm: 1.1 };
      const team2 = { id: 'team_2', name: 'Team B', recentForm: 0.9 };

      const prediction = await predictionService.predictMatchWinner(matchId, team1, team2);

      res.json({
        status: 'success',
        data: prediction,
      });
    } catch (error: any) {
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }
);

/**
 * GET /match/:matchId/top-scorer
 * Predict top scorer
 */
router.get(
  '/match/:matchId/top-scorer',
  authMiddleware,
  tierMiddleware([SUBSCRIPTION_TIERS.FANTASY_PRO, SUBSCRIPTION_TIERS.ANALYST_BETTOR]),
  async (req: Request, res: Response) => {
    try {
      const { matchId } = req.params;

      // Mock player data
      const players = [
        { id: 'player_1', name: 'Player A', avgScore: 45 },
        { id: 'player_2', name: 'Player B', avgScore: 38 },
      ];

      const prediction = await predictionService.predictTopScorer(matchId, players);

      res.json({
        status: 'success',
        data: prediction,
      });
    } catch (error: any) {
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }
);

/**
 * GET /player/:playerId/performance
 * Predict player performance
 */
router.get(
  '/player/:playerId/performance',
  authMiddleware,
  tierMiddleware([SUBSCRIPTION_TIERS.FANTASY_PRO, SUBSCRIPTION_TIERS.ANALYST_BETTOR]),
  async (req: Request, res: Response) => {
    try {
      const { playerId } = req.params;

      const playerStats = {
        average: 45,
        recentForm: 1.15,
        venueBonus: 1.05,
      };

      const prediction = await predictionService.predictPlayerPerformance(playerId, playerStats);

      res.json({
        status: 'success',
        data: prediction,
      });
    } catch (error: any) {
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }
);

/**
 * GET /match/:matchId/events
 * Get event probabilities
 */
router.get(
  '/match/:matchId/events',
  authMiddleware,
  tierMiddleware([SUBSCRIPTION_TIERS.ANALYST_BETTOR]),
  async (req: Request, res: Response) => {
    try {
      const { matchId } = req.params;

      const probabilities = await predictionService.getEventProbabilities(matchId);

      res.json({
        status: 'success',
        data: probabilities,
      });
    } catch (error: any) {
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }
);

/**
 * GET /accuracy/:modelType
 * Get model accuracy
 */
router.get('/accuracy/:modelType', async (req: Request, res: Response) => {
  try {
    const { modelType } = req.params;

    const accuracy = await predictionService.getModelAccuracy(modelType);

    res.json({
      status: 'success',
      data: {
        modelType,
        accuracy,
        lastUpdated: new Date(),
      },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});

export default router;
