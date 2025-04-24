import { useState } from 'react';
import { FiActivity, FiUser, FiMenu, FiBell, FiPieChart, FiSettings, FiArrowLeft, FiEdit2 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';

export default function Profile() {
  const router = useRouter();

  return (
    <Layout title="Your Profile">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-3xl font-semibold mb-4 md:mb-0 md:mr-6">
              US
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold dark:text-white">User Smith</h2>
              <p className="text-neutral-600 dark:text-neutral-400">user@example.com</p>
              <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-2">
                <span className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 text-xs px-2 py-1 rounded-full">Premium Member</span>
                <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded-full">Fitness Enthusiast</span>
              </div>
            </div>
            <button className="mt-4 md:mt-0 md:ml-auto bg-primary-light dark:bg-primary-dark/30 text-primary dark:text-primary-light px-4 py-2 rounded-md hover:bg-primary-hover dark:hover:bg-primary-dark/50 transition-colors flex items-center">
              <FiEdit2 className="mr-2" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Health Stats */}
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-neutral-700 dark:text-white mb-4">Health Statistics</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">Height</span>
                  <span className="text-sm font-medium dark:text-white">5'10"</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">Weight</span>
                  <span className="text-sm font-medium dark:text-white">165 lbs</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">BMI</span>
                  <span className="text-sm font-medium dark:text-white">23.7</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">Resting Heart Rate</span>
                  <span className="text-sm font-medium dark:text-white">68 bpm</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">Blood Pressure</span>
                  <span className="text-sm font-medium dark:text-white">120/80</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">Average Sleep</span>
                  <span className="text-sm font-medium dark:text-white">7h 20m</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Goals Section */}
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-neutral-700 dark:text-white">Your Health Goals</h3>
            <button className="text-primary hover:text-primary-hover text-sm hover:underline">Add New Goal</button>
          </div>
          
          <ul className="space-y-4">
            <li className="border-b dark:border-neutral-700 pb-4">
              <div className="flex justify-between mb-1">
                <span className="font-medium dark:text-white">Lose 10 pounds</span>
                <span className="text-green-600 dark:text-green-400 text-sm">In Progress</span>
              </div>
              <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 mt-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '40%' }}></div>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-neutral-500 dark:text-neutral-400">Started: Feb 1, 2024</span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">4/10 lbs</span>
              </div>
            </li>
            
            <li className="border-b dark:border-neutral-700 pb-4">
              <div className="flex justify-between mb-1">
                <span className="font-medium dark:text-white">Run 5K under 25 minutes</span>
                <span className="text-yellow-600 dark:text-yellow-400 text-sm">Just Started</span>
              </div>
              <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 mt-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-neutral-500 dark:text-neutral-400">Started: Mar 15, 2024</span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">Current: 29m 45s</span>
              </div>
            </li>
            
            <li>
              <div className="flex justify-between mb-1">
                <span className="font-medium dark:text-white">Meditate Daily for 10 Minutes</span>
                <span className="text-blue-600 dark:text-blue-400 text-sm">Habit Building</span>
              </div>
              <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 mt-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-neutral-500 dark:text-neutral-400">Started: Jan 10, 2024</span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">13 day streak</span>
              </div>
            </li>
          </ul>
        </div>
        
        {/* Preferences Section */}
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-6 mt-6">
          <h3 className="text-lg font-semibold text-neutral-700 dark:text-white mb-4">Preferences</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium dark:text-white">Measurement Units</h4>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Imperial (lbs, ft, mi)</p>
              </div>
              <button className="text-primary hover:text-primary-hover">Change</button>
            </div>
            
            <div className="border-t dark:border-neutral-700 pt-4 flex justify-between items-center">
              <div>
                <h4 className="font-medium dark:text-white">Notifications</h4>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Email and Push Notifications Enabled</p>
              </div>
              <button className="text-primary hover:text-primary-hover">Manage</button>
            </div>
            
            <div className="border-t dark:border-neutral-700 pt-4 flex justify-between items-center">
              <div>
                <h4 className="font-medium dark:text-white">Account Settings</h4>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Password, Email, Privacy</p>
              </div>
              <button className="text-primary hover:text-primary-hover">Manage</button>
            </div>
            
            <div className="border-t dark:border-neutral-700 pt-4 flex justify-between items-center">
              <div>
                <h4 className="font-medium dark:text-white">Connected Apps</h4>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">3 apps connected</p>
              </div>
              <button className="text-primary hover:text-primary-hover">View</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 