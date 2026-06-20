import axios, { AxiosInstance } from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add token to requests
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Handle responses
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  register(email: string, password: string, firstName: string, lastName: string) {
    return this.api.post('/auth/register', {
      email,
      password,
      firstName,
      lastName,
    });
  }

  login(email: string, password: string) {
    return this.api.post('/auth/login', {
      email,
      password,
    });
  }

  refreshToken(refreshToken: string) {
    return this.api.post('/auth/refresh-token', {
      refreshToken,
    });
  }

  logout() {
    return this.api.post('/auth/logout');
  }

  // Matches endpoints
  getLiveMatches() {
    return this.api.get('/matches/live');
  }

  getUpcomingMatches(limit: number = 20) {
    return this.api.get('/matches/upcoming', {
      params: { limit },
    });
  }

  getMatch(matchId: string) {
    return this.api.get(`/matches/${matchId}`);
  }

  getMatchCommentary(matchId: string) {
    return this.api.get(`/matches/${matchId}/commentary`);
  }

  getMatchStats(matchId: string) {
    return this.api.get(`/matches/${matchId}/statistics`);
  }

  // Players endpoints
  getPlayers(page: number = 1, limit: number = 20) {
    return this.api.get('/players', {
      params: { page, limit },
    });
  }

  getPlayer(playerId: string) {
    return this.api.get(`/players/${playerId}`);
  }

  getPlayerStats(playerId: string, format: string = 'all') {
    return this.api.get(`/players/${playerId}/statistics`, {
      params: { format },
    });
  }

  searchPlayers(query: string, country?: string, role?: string) {
    return this.api.get('/players/search', {
      params: { q: query, country, role },
    });
  }

  // Predictions endpoints
  predictMatchWinner(matchId: string) {
    return this.api.get(`/predictions/match/${matchId}/winner`);
  }

  predictTopScorer(matchId: string) {
    return this.api.get(`/predictions/match/${matchId}/top-scorer`);
  }

  predictPlayerPerformance(playerId: string) {
    return this.api.get(`/predictions/player/${playerId}/performance`);
  }

  getEventProbabilities(matchId: string) {
    return this.api.get(`/predictions/match/${matchId}/events`);
  }

  // User endpoints
  getUserProfile() {
    return this.api.get('/users/profile');
  }

  updateUserProfile(data: any) {
    return this.api.put('/users/profile', data);
  }

  getSubscription() {
    return this.api.get('/users/subscription');
  }

  upgradeSubscription(newTier: string, paymentMethod: string) {
    return this.api.post('/users/upgrade', {
      newTier,
      paymentMethod,
    });
  }

  getDashboards() {
    return this.api.get('/users/dashboards');
  }

  createDashboard(name: string, widgets: any[]) {
    return this.api.post('/users/dashboards', {
      name,
      widgets,
    });
  }
}

export const apiService = new ApiService();
