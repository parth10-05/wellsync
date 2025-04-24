import { useState } from 'react';
import { useRouter } from 'next/router';
import { FiActivity, FiUser, FiMenu, FiBell, FiPieChart } from 'react-icons/fi';
import Layout from '../components/layout/Layout';
import HealthMetricCard from '../components/metrics/HealthMetricCard';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const healthStats = {
    fitness: {
      dailySteps: 6754,
      dailyStepsGoal: 10000,
      activeMinutes: 45
    },
    nutrition: {
      calories: {
        consumed: 1456, 
        goal: 2200
      },
      water: {
        consumed: 1.4,
        goal: 2.5
      }
    },
    sleep: {
      duration: 7.2,
      quality: 82,
      bedtime: "23:15"
    },
    mental: {
      mood: 75,
      stress: 30,
      practices: 2
    }
  };

  // Recent activities
  const recentActivities = [
    { type: 'fitness', title: 'Morning Run', timestamp: '2 hours ago', value: '4.2 km' },
    { type: 'nutrition', title: 'Breakfast', timestamp: '3 hours ago', value: '420 cal' },
    { type: 'sleep', title: 'Sleep Recorded', timestamp: '8 hours ago', value: '7h 12m' },
    { type: 'mental', title: 'Meditation', timestamp: '1 day ago', value: '10 min' }
  ];

  return (
    <Layout title="Welcome to Your Wellness Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Fitness Status Card */}
        <div 
          className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => router.push('/fitness')}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Fitness</h3>
            <FiActivity className="text-indigo-500 text-xl" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Steps Today</span>
              <span className="text-sm font-medium dark:text-white">{healthStats.fitness.dailySteps.toLocaleString()} / {healthStats.fitness.dailyStepsGoal.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-indigo-500 h-2 rounded-full" 
                style={{ width: `${Math.min(100, (healthStats.fitness.dailySteps / healthStats.fitness.dailyStepsGoal) * 100)}%` }}
              ></div>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {healthStats.fitness.activeMinutes} active minutes today
            </div>
          </div>
        </div>

        {/* Nutrition Card */}
        <div 
          className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer" 
          onClick={() => router.push('/nutrition')}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Nutrition</h3>
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Calories</span>
              <span className="text-sm font-medium dark:text-white">{healthStats.nutrition.calories.consumed} / {healthStats.nutrition.calories.goal}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${Math.min(100, (healthStats.nutrition.calories.consumed / healthStats.nutrition.calories.goal) * 100)}%` }}
              ></div>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Water: {healthStats.nutrition.water.consumed}L / {healthStats.nutrition.water.goal}L
            </div>
          </div>
        </div>

        {/* Sleep Card */}
        <div 
          className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => router.push('/sleep')}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Sleep</h3>
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Last Night</span>
              <span className="text-sm font-medium dark:text-white">{healthStats.sleep.duration} hours</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full" 
                style={{ width: `${Math.min(100, (healthStats.sleep.duration / 9) * 100)}%` }}
              ></div>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Quality score: {healthStats.sleep.quality}/100
            </div>
          </div>
        </div>

        {/* Mental Wellness Card */}
        <div 
          className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => router.push('/mental')}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Mental</h3>
            <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Mood Today</span>
              <span className="text-sm font-medium dark:text-white">{healthStats.mental.mood}/100</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-purple-500 h-2 rounded-full" 
                style={{ width: `${healthStats.mental.mood}%` }}
              ></div>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {healthStats.mental.practices} wellness practices completed
            </div>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2 bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">Health Overview</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Your overall wellness score is <span className="font-semibold text-indigo-600 dark:text-indigo-400">78/100</span>. 
            Focus on improving your sleep schedule and increasing your daily activity to boost your score.
          </p>
          
          <h4 className="font-medium text-gray-700 dark:text-white mt-6 mb-3">Recent Activities</h4>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-2 last:border-0">
                <div>
                  <span className="text-sm font-medium dark:text-white">{activity.title}</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{activity.timestamp}</p>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{activity.value}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">Your Profile</h3>
          
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xl font-semibold mr-4">
              PS
            </div>
            <div>
              <p className="font-medium dark:text-white">{user?.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
              <p className="text-xs mt-1">
                {user?.isPremium ? (
                  <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-2 py-0.5 rounded-full">Premium</span>
                ) : (
                  <span className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full">Free Plan</span>
                )}
              </p>
            </div>
          </div>
          
          <div className="space-y-3">
            <button 
              onClick={() => router.push('/profile')} 
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              View Profile
            </button>
            <button 
              onClick={logout}
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Recommended For You</h3>
          <a href="#" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">View All</a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow bg-white dark:bg-neutral-900">
            <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-lg inline-block mb-3">
              <FiActivity className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <h4 className="font-medium mb-1 dark:text-white">HIIT Workout</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">20 min · High intensity</p>
            <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">This workout is designed to boost your metabolism and improve cardiovascular health.</p>
            <button className="w-full px-3 py-1.5 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm">
              Start Workout
            </button>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow bg-white dark:bg-neutral-900">
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg inline-block mb-3">
              <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h4 className="font-medium mb-1 dark:text-white">Meal Planning</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Weekly · Personalized</p>
            <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">Get a customized meal plan based on your nutritional needs and preferences.</p>
            <button className="w-full px-3 py-1.5 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm">
              Generate Plan
            </button>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow bg-white dark:bg-neutral-900">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg inline-block mb-3">
              <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h4 className="font-medium mb-1 dark:text-white">Guided Meditation</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">10 min · Stress Relief</p>
            <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">A quick meditation session to help you relax and refocus during your day.</p>
            <button className="w-full px-3 py-1.5 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm">
              Start Session
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
