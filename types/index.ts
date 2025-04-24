// User Profile Types
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferredUnits: UnitPreferences;
  healthMetrics: HealthMetrics;
  goals: UserGoal[];
  integrations: UserIntegration[];
  createdAt: string;
  updatedAt: string;
}

export interface UnitPreferences {
  weight: 'kg' | 'lb';
  height: 'cm' | 'ft';
  distance: 'km' | 'mi';
  temperature: 'celsius' | 'fahrenheit';
}

export interface HealthMetrics {
  height: number;
  weight: number;
  bmi?: number;
  restingHeartRate?: number;
  bloodPressure?: {
    systolic: number;
    diastolic: number;
  };
}

export interface UserGoal {
  id: string;
  type: 'weight' | 'fitness' | 'sleep' | 'nutrition' | 'mental';
  title: string;
  description?: string;
  target: number | string;
  currentValue: number | string;
  unit?: string;
  startDate: string;
  targetDate?: string;
  progress: number; // 0-100%
  status: 'not_started' | 'in_progress' | 'completed' | 'abandoned';
}

export interface UserIntegration {
  provider: string;
  connected: boolean;
  lastSync?: string;
}

// Fitness Types
export interface Workout {
  id: string;
  type: string;
  date: string;
  duration: number; // in minutes
  calories?: number;
  distance?: number;
  steps?: number;
  heartRate?: {
    avg: number;
    max: number;
  };
  exercises?: WorkoutExercise[];
  notes?: string;
  completed: boolean;
}

export interface WorkoutExercise {
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number; // in seconds
}

export interface FitnessStats {
  dailySteps: number;
  dailyStepsGoal: number;
  weeklyWorkouts: number;
  weeklyWorkoutsGoal: number;
  totalMinutes: number;
  totalCalories: number;
  streak: number;
}

// Nutrition Types
export interface NutritionData {
  calories: {
    consumed: number;
    goal: number;
  };
  macros: {
    protein: MacroNutrient;
    carbs: MacroNutrient;
    fat: MacroNutrient;
  };
  water: {
    value: number;
    goal: number;
    unit: string;
  };
  meals: Meal[];
}

export interface MacroNutrient {
  value: number;
  goal: number;
  unit: string;
}

export interface Meal {
  id: string;
  name: string;
  time: string;
  calories: number;
  items: FoodItem[];
  planned?: boolean;
}

export interface FoodItem {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servingSize?: string;
  servingUnit?: string;
}

// Sleep Types
export interface SleepData {
  lastNight: SleepNight;
  weeklyAverage: WeeklySleepAverage;
  sleepTrend: SleepTrendDay[];
}

export interface SleepNight {
  date: string;
  duration: number; // in hours
  quality: number; // score out of 100
  deepSleep: number; // in hours
  lightSleep: number; // in hours
  remSleep: number; // in hours
  awake: number; // in hours
  bedtime: string;
  wakeup: string;
  sleepEfficiency: number; // percentage
}

export interface WeeklySleepAverage {
  duration: number; // in hours
  quality: number; // score out of 100
  deepSleep: number; // in hours
  lightSleep: number; // in hours
  remSleep: number; // in hours
}

export interface SleepTrendDay {
  date: string;
  duration: number;
  quality: number;
}

// Mental Health Types
export interface MoodData {
  today: DailyMood;
  weeklyAverage: MoodAverage;
  moodHistory: MoodHistoryDay[];
}

export interface DailyMood {
  date: string;
  mood: string;
  score: number; // 0-100
  energy: string;
  energyScore: number; // 0-100
  stress: string;
  stressScore: number; // 0-100
  notes?: string;
  factors?: string[];
}

export interface MoodAverage {
  mood: number;
  energy: number;
  stress: number;
}

export interface MoodHistoryDay {
  date: string;
  mood: number;
  stress: number;
}

export interface WellnessPractice {
  id: string;
  name: string;
  description: string;
  category: string;
  duration: string; // e.g., "5 min"
  completed: boolean;
  streak?: number;
  scheduled?: string;
  icon: string;
}

// AI and Analytics Types
export interface HealthRecommendation {
  id: string;
  category: 'fitness' | 'nutrition' | 'sleep' | 'mental';
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  reasoning: string;
  action?: string;
}

export interface HealthInsight {
  id: string;
  category: 'fitness' | 'nutrition' | 'sleep' | 'mental' | 'overall';
  title: string;
  description: string;
  metrics: {
    name: string;
    value: number | string;
    change?: number;
    trend: 'up' | 'down' | 'stable';
  }[];
  timeframe: string;
}

// Dashboard Types
export interface DashboardStats {
  overallHealthScore: number;
  categoryScores: {
    fitness: number;
    nutrition: number;
    sleep: number;
    mental: number;
  };
  recentActivities: {
    type: string;
    title: string;
    timestamp: string;
    value?: string | number;
  }[];
  upcoming: {
    type: string;
    title: string;
    scheduledFor: string;
  }[];
}

export interface HealthTrend {
  metric: string;
  timeframe: string;
  data: {
    date: string;
    value: number;
  }[];
  average: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
}

// Auth Types
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isPremium: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
} 