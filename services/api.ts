import axios from 'axios';

// API configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
const API_TIMEOUT = 15000; // 15 seconds

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    // Get the token from localStorage when in browser environment
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API service for health data
const healthService = {
  // User authentication
  login: async (email: string, password: string) => {
    return api.post('/auth/login', { email, password });
  },
  
  register: async (userData: any) => {
    return api.post('/auth/register', userData);
  },
  
  // Profile data
  getUserProfile: async () => {
    return api.get('/profile');
  },
  
  updateUserProfile: async (profileData: any) => {
    return api.put('/profile', profileData);
  },
  
  // Fitness tracking
  getWorkouts: async (params?: any) => {
    return api.get('/fitness/workouts', { params });
  },
  
  addWorkout: async (workoutData: any) => {
    return api.post('/fitness/workouts', workoutData);
  },
  
  getWorkoutById: async (id: string) => {
    return api.get(`/fitness/workouts/${id}`);
  },
  
  updateWorkout: async (id: string, workoutData: any) => {
    return api.put(`/fitness/workouts/${id}`, workoutData);
  },
  
  deleteWorkout: async (id: string) => {
    return api.delete(`/fitness/workouts/${id}`);
  },
  
  // Nutrition tracking
  getMeals: async (date?: string) => {
    return api.get('/nutrition/meals', { params: { date } });
  },
  
  addMeal: async (mealData: any) => {
    return api.post('/nutrition/meals', mealData);
  },
  
  searchFoods: async (query: string) => {
    return api.get('/nutrition/foods/search', { params: { query } });
  },
  
  // Sleep tracking
  getSleepData: async (params?: any) => {
    return api.get('/sleep', { params });
  },
  
  addSleepRecord: async (sleepData: any) => {
    return api.post('/sleep', sleepData);
  },
  
  // Mental health tracking
  getMoodData: async (params?: any) => {
    return api.get('/mental/mood', { params });
  },
  
  addMoodEntry: async (moodData: any) => {
    return api.post('/mental/mood', moodData);
  },
  
  getWellnessPractices: async () => {
    return api.get('/mental/practices');
  },
  
  completeWellnessPractice: async (id: string) => {
    return api.post(`/mental/practices/${id}/complete`);
  },
  
  // Dashboard and analytics
  getDashboardStats: async () => {
    return api.get('/dashboard/stats');
  },
  
  getHealthTrends: async (metric: string, timeframe: string) => {
    return api.get('/dashboard/trends', { params: { metric, timeframe } });
  },
  
  // AI recommendations
  getRecommendations: async (category?: string) => {
    return api.get('/ai/recommendations', { params: { category } });
  },
  
  getPersonalizedInsights: async () => {
    return api.get('/ai/insights');
  }
};

export default healthService; 