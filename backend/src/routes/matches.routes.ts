import { Router, Request, Response } from 'express';
import { optionalAuthMiddleware } from '../middleware/auth';
import { matchService } from '../services/match.service';

const router = Router();

/**
 * GET /live
 * Get live matches
 */
router.get('/live', optionalAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const matches = await matchService.getLiveMatches();

    res.json({
      status: 'success',
      data: matches,
      count: matches.length,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});

/**
 * GET /upcoming
 * Get upcoming matches
 */
router.get('/upcoming', optionalAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 20;
    const matches = await matchService.getUpcomingMatches(limit);

    res.json({
      status: 'success',
      data: matches,
      count: matches.length,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});

/**
 * GET /:matchId
 * Get match details
 */
router.get('/:matchId', optionalAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const { matchId } = req.params;
    const match = await matchService.getMatchById(matchId);

    if (!match) {
      return res.status(404).json({
        status: 'error',
        message: 'Match not found',
      });
    }

    res.json({
      status: 'success',
      data: match,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});

/**
 * GET /:matchId/statistics
 * Get match statistics
 */
router.get('/:matchId/statistics', optionalAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const { matchId } = req.params;
    const stats = await matchService.getMatchStats(matchId);

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

/**
 * GET /:matchId/commentary
 * Get match commentary
 */
router.get('/:matchId/commentary', optionalAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const { matchId } = req.params;
    const commentary = await matchService.getMatchCommentary(matchId);

    res.json({
      status: 'success',
      data: commentary,
      count: commentary.length,
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
 * Search matches
 */
router.get('/search', async (req: Request, res: Response) => {
  try {
    const { q, format, status } = req.query;

    // In production, implement actual search with database
    const mockMatches = [
      {
        id: 'match_1',
        title: 'India vs Pakistan',
        format: format || 'T20',
        status: status || 'scheduled',
      },
    ];

    res.json({
      status: 'success',
      data: mockMatches,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});

export default router;
