import { Router, Request, Response } from 'express';
import { optionalAuthMiddleware } from '../middleware/auth';

const router = Router();

/**
 * GET /
 * Get all players with pagination
 */
router.get('/', optionalAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 20;

    // Mock data
    const players = Array.from({ length: limit }, (_, i) => ({
      id: `player_${(page - 1) * limit + i + 1}`,
      name: `Player ${(page - 1) * limit + i + 1}`,
      country: 'India',
      role: ['batsman', 'bowler', 'all-rounder'][i % 3],
      stats: {
        matches: Math.floor(Math.random() * 200),
        runs: Math.floor(Math.random() * 5000),
        wickets: Math.floor(Math.random() * 200),
        average: (Math.random() * 50).toFixed(2),
      },
    }));

    res.json({
      status: 'success',
      data: players,
      pagination: {
        page,
        limit,
        total: 1000,
        pages: Math.ceil(1000 / limit),
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
 * GET /search
 * Search players
 */
router.get('/search', optionalAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const { q, country, role } = req.query;

    const players = [
      {
        id: 'player_1',
        name: q ? `Player matching ${q}` : 'Virat Kohli',
        country: country || 'India',
        role: role || 'batsman',
        stats: {
          matches: 150,
          runs: 5000,
          wickets: 0,
          average: 55.5,
        },
      },
    ];

    res.json({
      status: 'success',
      data: players,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});

/**
 * GET /:playerId
 * Get player details
 */
router.get('/:playerId', optionalAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const { playerId } = req.params;

    const player = {
      id: playerId,
      name: 'Virat Kohli',
      country: 'India',
      role: 'batsman',
      dateOfBirth: '1988-11-05',
      jerseyNumber: 18,
      stats: {
        matches: 150,
        runs: 5000,
        wickets: 0,
        average: 55.5,
        strikeRate: 92.5,
      },
      recentForm: [
        { match: 'match_1', runs: 45, status: '4' },
        { match: 'match_2', runs: 87, status: '4' },
        { match: 'match_3', runs: 23, status: '4' },
      ],
      upcomingMatches: 5,
      currentTeam: 'Delhi Capitals',
    };

    res.json({
      status: 'success',
      data: player,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});

/**
 * GET /:playerId/statistics
 * Get detailed player statistics
 */
router.get('/:playerId/statistics', optionalAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const { playerId } = req.params;
    const format = req.query.format || 'all';

    const stats = {
      playerId,
      format,
      batting: {
        matches: 150,
        runs: 5000,
        average: 55.5,
        strikeRate: 92.5,
        centuries: 12,
        halfCenturies: 25,
      },
      bowling: {
        matches: 5,
        wickets: 0,
        average: 0,
        economy: 0,
      },
      fieldingRecords: {
        catches: 45,
        runOuts: 2,
      },
    };

    res.json({
      status: 'success',
      data: stats,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});

export default router;
