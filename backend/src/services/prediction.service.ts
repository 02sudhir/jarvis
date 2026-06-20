import { config } from '../config';
import { IPrediction } from '../models';

export class PredictionService {
  private modelVersion = '1.0.0';

  /**
   * Predict match winner
   */
  async predictMatchWinner(
    matchId: string,
    team1: any,
    team2: any
  ): Promise<IPrediction> {
    // Simplified prediction logic
    // In production, this would use ML models

    const team1Strength = this.calculateTeamStrength(team1);
    const team2Strength = this.calculateTeamStrength(team2);

    const totalStrength = team1Strength + team2Strength;
    const team1Probability = team1Strength / totalStrength;
    const team2Probability = team2Strength / totalStrength;

    const winner = team1Probability > team2Probability ? team1.id : team2.id;
    const probability = Math.max(team1Probability, team2Probability);

    return {
      id: `pred_${Date.now()}`,
      matchId,
      predictionType: 'match_winner',
      team: winner,
      probability: Math.round(probability * 100),
      confidence: Math.round(probability * 100),
      reasoning: `Based on team strength and historical performance`,
      modelVersion: this.modelVersion,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  /**
   * Predict top scorer
   */
  async predictTopScorer(
    matchId: string,
    players: any[]
  ): Promise<IPrediction> {
    // Simplified prediction
    const topPlayer = players.reduce((prev, current) =>
      current.avgScore > prev.avgScore ? current : prev
    );

    return {
      id: `pred_${Date.now()}`,
      matchId,
      predictionType: 'top_scorer',
      player: topPlayer.id,
      probability: Math.round(Math.random() * 40 + 60), // 60-100%
      confidence: Math.round(Math.random() * 30 + 70),
      reasoning: `${topPlayer.name} has highest recent form`,
      modelVersion: this.modelVersion,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  /**
   * Predict player performance
   */
  async predictPlayerPerformance(playerId: string, playerStats: any): Promise<any> {
    // Simplified prediction
    const baseAverage = playerStats.average || 0;
    const recentForm = playerStats.recentForm || 1.0;
    const venueBonus = playerStats.venueBonus || 1.0;

    const expectedScore = Math.round(baseAverage * recentForm * venueBonus);

    return {
      playerId,
      expectedScore,
      confidence: Math.round(Math.random() * 30 + 70),
      formTrend: recentForm > 1.0 ? 'upward' : 'downward',
    };
  }

  /**
   * Get event probabilities (sixes, wickets, etc.)
   */
  async getEventProbabilities(matchId: string): Promise<any> {
    // Simplified probabilities
    return {
      wicket_next_5_balls: Math.round(Math.random() * 30 + 40),
      six_next_over: Math.round(Math.random() * 40 + 30),
      boundary_next_ball: Math.round(Math.random() * 50 + 35),
      match_winner: {
        team1: Math.round(Math.random() * 50 + 40),
        team2: Math.round(Math.random() * 50 + 40),
      },
    };
  }

  /**
   * Calculate team strength score
   */
  private calculateTeamStrength(team: any): number {
    const recentForm = team.recentForm || 1.0;
    const homeAdvantage = team.isHome ? 1.1 : 0.9;
    const playerAverage = team.avgPlayerRating || 70;

    return (playerAverage / 100) * recentForm * homeAdvantage;
  }

  /**
   * Get model accuracy
   */
  async getModelAccuracy(modelType: string): Promise<number> {
    // In production, fetch actual accuracy from model registry
    const accuracyMap: Record<string, number> = {
      match_winner: 68,
      top_scorer: 52,
      team_performance: 72,
      player_performance: 65,
    };

    return accuracyMap[modelType] || 60;
  }
}

export const predictionService = new PredictionService();
