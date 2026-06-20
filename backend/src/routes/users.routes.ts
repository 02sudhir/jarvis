import { Router, Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';

const router = Router();

/**
 * GET /profile
 * Get user profile
 */
router.get('/profile', async (req: AuthRequest, res: Response) => {
  try {
    const user = {
      id: req.user?.id,
      email: req.user?.email,
      firstName: 'John',
      lastName: 'Doe',
      country: 'India',
      subscriptionTier: req.user?.subscriptionTier,
      subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      preferences: {
        favoriteTeams: ['India', 'Mumbai Indians'],
        favoriteFormats: ['T20', 'ODI'],
        notifications: true,
        emailUpdates: false,
      },
      createdAt: new Date(),
    };

    res.json({
      status: 'success',
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});

/**
 * PUT /profile
 * Update user profile
 */
router.put('/profile', async (req: AuthRequest, res: Response) => {
  try {
    const { firstName, lastName, country, preferences } = req.body;

    // In production, update user in database
    const updatedUser = {
      id: req.user?.id,
      email: req.user?.email,
      firstName: firstName || 'John',
      lastName: lastName || 'Doe',
      country: country || 'India',
      preferences: preferences || {},
    };

    res.json({
      status: 'success',
      message: 'Profile updated successfully',
      data: updatedUser,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});

/**
 * GET /subscription
 * Get user subscription details
 */
router.get('/subscription', async (req: AuthRequest, res: Response) => {
  try {
    const subscription = {
      tier: req.user?.subscriptionTier,
      status: 'active',
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      autoRenew: true,
      features: {
        realTimeMatches: req.user?.subscriptionTier !== 'free',
        historicalData: req.user?.subscriptionTier !== 'free',
        predictions: ['fantasy_pro', 'analyst_bettor'].includes(req.user?.subscriptionTier || ''),
      },
    };

    res.json({
      status: 'success',
      data: subscription,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});

/**
 * POST /upgrade
 * Upgrade subscription
 */
router.post('/upgrade', async (req: AuthRequest, res: Response) => {
  try {
    const { newTier, paymentMethod } = req.body;

    // In production, process payment and update subscription
    res.json({
      status: 'success',
      message: 'Subscription upgraded successfully',
      data: {
        previousTier: req.user?.subscriptionTier,
        newTier,
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
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
 * GET /dashboards
 * Get user dashboards
 */
router.get('/dashboards', async (req: AuthRequest, res: Response) => {
  try {
    const dashboards = [
      {
        id: 'dashboard_1',
        name: 'My Dashboard',
        widgets: [
          { id: 'widget_1', type: 'live_matches', position: 0 },
          { id: 'widget_2', type: 'top_players', position: 1 },
        ],
        isDefault: true,
      },
    ];

    res.json({
      status: 'success',
      data: dashboards,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});

/**
 * POST /dashboards
 * Create new dashboard
 */
router.post('/dashboards', async (req: AuthRequest, res: Response) => {
  try {
    const { name, widgets } = req.body;

    const newDashboard = {
      id: `dashboard_${Date.now()}`,
      name,
      widgets: widgets || [],
      isDefault: false,
    };

    res.json({
      status: 'success',
      data: newDashboard,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});

export default router;
