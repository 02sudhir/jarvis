import axios from 'axios';
import { config } from '../config';
import { IMatch } from '../models';

export class MatchService {
  private cricketApiKey = config.CRICKET_API.KEY;
  private cricketApiUrl = config.CRICKET_API.BASE_URL;

  /**
   * Get live matches
   */
  async getLiveMatches(): Promise<IMatch[]> {
    try {
      const response = await axios.get(`${this.cricketApiUrl}/matches`, {
        params: {
          status: 'live',
          apikey: this.cricketApiKey,
        },
      });

      return response.data.matches || [];
    } catch (error) {
      console.error('Error fetching live matches:', error);
      return [];
    }
  }

  /**
   * Get match by ID
   */
  async getMatchById(matchId: string): Promise<IMatch | null> {
    try {
      const response = await axios.get(`${this.cricketApiUrl}/matches/${matchId}`, {
        params: {
          apikey: this.cricketApiKey,
        },
      });

      return response.data.match || null;
    } catch (error) {
      console.error(`Error fetching match ${matchId}:`, error);
      return null;
    }
  }

  /**
   * Get upcoming matches
   */
  async getUpcomingMatches(limit: number = 20): Promise<IMatch[]> {
    try {
      const response = await axios.get(`${this.cricketApiUrl}/matches`, {
        params: {
          status: 'scheduled',
          limit,
          apikey: this.cricketApiKey,
        },
      });

      return response.data.matches || [];
    } catch (error) {
      console.error('Error fetching upcoming matches:', error);
      return [];
    }
  }

  /**
   * Get match statistics
   */
  async getMatchStats(matchId: string): Promise<any> {
    try {
      const response = await axios.get(
        `${this.cricketApiUrl}/matches/${matchId}/statistics`,
        {
          params: {
            apikey: this.cricketApiKey,
          },
        }
      );

      return response.data || {};
    } catch (error) {
      console.error(`Error fetching match stats for ${matchId}:`, error);
      return {};
    }
  }

  /**
   * Get match commentary
   */
  async getMatchCommentary(matchId: string): Promise<any[]> {
    try {
      const response = await axios.get(
        `${this.cricketApiUrl}/matches/${matchId}/commentary`,
        {
          params: {
            apikey: this.cricketApiKey,
          },
        }
      );

      return response.data.commentary || [];
    } catch (error) {
      console.error(`Error fetching match commentary for ${matchId}:`, error);
      return [];
    }
  }

  /**
   * Get team performance
   */
  async getTeamPerformance(teamId: string, format: string = 'all'): Promise<any> {
    try {
      const response = await axios.get(
        `${this.cricketApiUrl}/teams/${teamId}/performance`,
        {
          params: {
            format,
            apikey: this.cricketApiKey,
          },
        }
      );

      return response.data || {};
    } catch (error) {
      console.error(`Error fetching team performance for ${teamId}:`, error);
      return {};
    }
  }

  /**
   * Head to head comparison
   */
  async getHeadToHead(team1Id: string, team2Id: string): Promise<any> {
    try {
      const response = await axios.get(
        `${this.cricketApiUrl}/teams/${team1Id}/versus/${team2Id}`,
        {
          params: {
            apikey: this.cricketApiKey,
          },
        }
      );

      return response.data || {};
    } catch (error) {
      console.error(`Error fetching head to head for ${team1Id} vs ${team2Id}:`, error);
      return {};
    }
  }
}

export const matchService = new MatchService();
