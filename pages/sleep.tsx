import { useState } from 'react';
import { FiActivity, FiUser, FiMenu, FiBell, FiPieChart, FiArrowLeft, FiPlusCircle, FiClock, FiX } from 'react-icons/fi';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
import HealthMetricCard from '../components/metrics/HealthMetricCard';

export default function Sleep() {
  const router = useRouter();
  const [showJournalModal, setShowJournalModal] = useState(false);
  const [journalEntry, setJournalEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    factors: [] as string[]
  });
  const [newFactor, setNewFactor] = useState('');
  
  // Sample sleep data
  const [sleepData, setSleepData] = useState({
    lastNight: {
      date: "2024-04-12",
      duration: 7.2, // hours
      quality: 82, // score out of 100
      deepSleep: 1.8, // hours
      lightSleep: 3.9, // hours
      remSleep: 1.5, // hours
      awake: 0.4, // hours
      bedtime: "23:15",
      wakeup: "06:24",
      sleepEfficiency: 85 // percentage
    },
    weeklyAverage: {
      duration: 7.1, // hours
      quality: 78, // score out of 100
      deepSleep: 1.7, // hours
      lightSleep: 3.8, // hours
      remSleep: 1.6, // hours
    },
    sleepTrend: [
      { date: "2024-04-06", duration: 6.5, quality: 72 },
      { date: "2024-04-07", duration: 7.8, quality: 85 },
      { date: "2024-04-08", duration: 6.9, quality: 74 },
      { date: "2024-04-09", duration: 7.0, quality: 76 },
      { date: "2024-04-10", duration: 7.4, quality: 82 },
      { date: "2024-04-11", duration: 7.8, quality: 88 },
      { date: "2024-04-12", duration: 7.2, quality: 82 }
    ]
  });

  // Sleep factors / journal entries
  const [sleepFactors, setSleepFactors] = useState([
    { date: "2024-04-12", factors: ["Exercise: Evening walk", "Screen time: Stopped 30min before bed", "Stress: Moderate", "Caffeine: None after noon"] },
    { date: "2024-04-11", factors: ["Exercise: Morning run", "Screen time: Low", "Stress: Low", "Caffeine: None after noon", "Meditation: 10min before bed"] },
    { date: "2024-04-10", factors: ["Exercise: None", "Screen time: High", "Stress: Moderate", "Caffeine: Afternoon coffee"] }
  ]);

  // Predefined factor categories
  const factorCategories = [
    { name: "Exercise", options: ["None", "Morning", "Afternoon", "Evening"] },
    { name: "Screen time", options: ["Low", "Moderate", "High", "Stopped 30min before bed"] },
    { name: "Stress", options: ["Low", "Moderate", "High"] },
    { name: "Caffeine", options: ["None", "Morning only", "Afternoon coffee", "None after noon"] },
    { name: "Meditation", options: ["None", "5min before bed", "10min before bed", "15min before bed"] }
  ];

  const handleAddFactor = () => {
    if (newFactor.trim() === '') return;
    
    setJournalEntry(prev => ({
      ...prev,
      factors: [...prev.factors, newFactor]
    }));
    
    setNewFactor('');
  };

  const handleRemoveFactor = (index: number) => {
    setJournalEntry(prev => ({
      ...prev,
      factors: prev.factors.filter((_, i) => i !== index)
    }));
  };

  const handleSaveJournal = () => {
    if (journalEntry.factors.length === 0) {
      alert('Please add at least one sleep factor.');
      return;
    }

    setSleepFactors(prev => [
      { date: journalEntry.date, factors: [...journalEntry.factors] },
      ...prev
    ]);

    // Reset form and close modal
    setJournalEntry({
      date: new Date().toISOString().split('T')[0],
      factors: []
    });
    setShowJournalModal(false);
  };

  const handleSelectPresetFactor = (category: string, option: string) => {
    const factorText = `${category}: ${option}`;
    if (!journalEntry.factors.includes(factorText)) {
      setJournalEntry(prev => ({
        ...prev,
        factors: [...prev.factors, factorText]
      }));
    }
  };

  // Sleep improvement recommendations
  const sleepRecommendations = [
    {
      title: 'Consistent Sleep Schedule',
      description: 'Go to bed and wake up at the same time each day, even on weekends.',
      impact: 'high',
      icon: '🕰️'
    },
    {
      title: 'Limit Screen Time',
      description: 'Avoid screens 1 hour before bedtime to reduce blue light exposure.',
      impact: 'medium',
      icon: '📱'
    },
    {
      title: 'Optimize Sleep Environment',
      description: 'Keep your bedroom cool, dark, and quiet for better sleep quality.',
      impact: 'high',
      icon: '🌙'
    },
    {
      title: 'Avoid Caffeine Late in Day',
      description: 'Limit caffeine intake after 2 PM as it can interfere with sleep.',
      impact: 'medium',
      icon: '☕'
    }
  ];

  const handleSetReminder = (recommendation: string) => {
    alert(`Setting reminder for: ${recommendation} - This would integrate with your calendar or reminders app in a complete implementation`);
  };

  const handleLearnMore = (recommendation: string) => {
    alert(`Learn more about: ${recommendation} - This would show detailed information in a complete implementation`);
  };

  const handleExploreRoutines = (recommendation: string) => {
    alert(`Explore routines for: ${recommendation} - This would show suggested routines in a complete implementation`);
  };

  return (
    <Layout title="Sleep Tracking">
      <div className="max-w-6xl mx-auto">
        {/* Sleep Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <HealthMetricCard
            title="Sleep Duration"
            value={sleepData.lastNight.duration}
            max={8}
            unit="h"
            progress={(sleepData.lastNight.duration / 8) * 100}
            icon={<FiClock />}
            color="blue"
          />
          
          <HealthMetricCard
            title="Sleep Quality"
            value={sleepData.lastNight.quality}
            max={100}
            progress={sleepData.lastNight.quality}
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>}
            color="indigo"
          />
          
          <HealthMetricCard
            title="Deep Sleep"
            value={sleepData.lastNight.deepSleep}
            max={sleepData.lastNight.duration}
            unit="h"
            progress={(sleepData.lastNight.deepSleep / sleepData.lastNight.duration) * 100}
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>}
            color="purple"
          />
          
          <HealthMetricCard
            title="Efficiency"
            value={sleepData.lastNight.sleepEfficiency}
            max={100}
            unit="%"
            progress={sleepData.lastNight.sleepEfficiency}
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>}
            color="green"
          />
        </div>
        
        {/* Sleep Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Last Night's Sleep */}
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">Last Night's Sleep</h3>
            
            <div className="flex justify-between mb-3">
              <div>
                <p className="text-sm text-gray-500 dark:text-neutral-400">Bedtime</p>
                <p className="font-semibold dark:text-white">{sleepData.lastNight.bedtime}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-neutral-400">Wake Up</p>
                <p className="font-semibold dark:text-white">{sleepData.lastNight.wakeup}</p>
              </div>
            </div>
            
            {/* Sleep Stages Visualization */}
            <div className="mb-4">
              <p className="text-sm text-gray-500 dark:text-neutral-400 mb-2">Sleep Stages</p>
              <div className="w-full h-5 flex rounded-full overflow-hidden">
                <div 
                  className="bg-purple-600" 
                  style={{ width: `${(sleepData.lastNight.deepSleep / sleepData.lastNight.duration) * 100}%` }}
                  title={`Deep Sleep: ${sleepData.lastNight.deepSleep}h`}
                ></div>
                <div 
                  className="bg-blue-400" 
                  style={{ width: `${(sleepData.lastNight.remSleep / sleepData.lastNight.duration) * 100}%` }}
                  title={`REM Sleep: ${sleepData.lastNight.remSleep}h`}
                ></div>
                <div 
                  className="bg-blue-300" 
                  style={{ width: `${(sleepData.lastNight.lightSleep / sleepData.lastNight.duration) * 100}%` }}
                  title={`Light Sleep: ${sleepData.lastNight.lightSleep}h`}
                ></div>
                <div 
                  className="bg-gray-300" 
                  style={{ width: `${(sleepData.lastNight.awake / sleepData.lastNight.duration) * 100}%` }}
                  title={`Awake: ${sleepData.lastNight.awake}h`}
                ></div>
              </div>
              
              <div className="flex justify-between text-xs mt-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-1"></div>
                  <span>Deep ({sleepData.lastNight.deepSleep}h)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-1"></div>
                  <span>REM ({sleepData.lastNight.remSleep}h)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-300 rounded-full mr-1"></div>
                  <span>Light ({sleepData.lastNight.lightSleep}h)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-gray-300 rounded-full mr-1"></div>
                  <span>Awake ({sleepData.lastNight.awake}h)</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => alert('This would show a detailed sleep report in a complete implementation')}
              className="w-full px-3 py-1.5 bg-indigo-100 text-indigo-600 rounded hover:bg-indigo-200 text-sm"
            >
              View Detailed Sleep Report
            </button>
          </div>
          
          {/* Sleep Trend */}
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">Weekly Sleep Trend</h3>
            
            {/* Simple chart visualization */}
            <div className="h-36 flex items-end space-x-1">
              {sleepData.sleepTrend.map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-indigo-500 rounded-t"
                    style={{ 
                      height: `${(day.duration / 10) * 100}%`,
                      opacity: 0.4 + (day.quality / 200)
                    }}
                  ></div>
                  <p className="text-xs mt-1">{day.date.split('-')[2]}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-neutral-400">Weekly Average</span>
                <span className="font-medium dark:text-white">{sleepData.weeklyAverage.duration}h</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-neutral-400">Quality Trend</span>
                <span className="font-medium text-green-600 dark:text-green-400">+3%</span>
              </div>
            </div>
          </div>
          
          {/* Sleep Factors */}
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Sleep Factors</h3>
              <button 
                onClick={() => setShowJournalModal(true)}
                className="p-1 text-indigo-600 hover:bg-indigo-50 rounded-full"
              >
                <FiPlusCircle />
              </button>
            </div>
            
            <div className="space-y-4">
              {sleepFactors.map((entry, index) => (
                <div key={index} className="border-b pb-3 last:border-0 last:pb-0">
                  <p className="text-sm font-medium mb-1">
                    {new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </p>
                  <div className="space-y-1">
                    {entry.factors.map((factor, idx) => (
                      <div key={idx} className="flex text-sm">
                        <span className="text-gray-600 dark:text-neutral-300">{factor}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => setShowJournalModal(true)}
              className="mt-4 w-full px-3 py-1.5 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
            >
              Add Sleep Journal Entry
            </button>
          </div>
        </div>
        
        {/* Sleep Recommendations */}
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">Sleep Recommendations</h3>
          <div className="space-y-4">
            <div className="flex border-l-4 border-indigo-500 bg-indigo-50 p-4 rounded-r">
              <div className="flex-1">
                <h4 className="font-medium">Consistent Sleep Schedule</h4>
                <p className="text-sm text-gray-600 dark:text-neutral-400 mt-1">
                  Your sleep patterns show inconsistent bedtimes. Try to go to bed and wake up at the same time every day, even on weekends.
                </p>
              </div>
              <div className="ml-4">
                <button 
                  onClick={() => handleSetReminder('Consistent Sleep Schedule')}
                  className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
                >
                  Set Reminders
                </button>
              </div>
            </div>
            
            <div className="flex border-l-4 border-green-500 bg-green-50 p-4 rounded-r">
              <div className="flex-1">
                <h4 className="font-medium">Screen-Free Bedtime</h4>
                <p className="text-sm text-gray-600 dark:text-neutral-400 mt-1">
                  Based on your sleep quality data, nights when you avoided screens before bed resulted in 12% better sleep quality.
                </p>
              </div>
              <div className="ml-4">
                <button 
                  onClick={() => handleLearnMore('Screen-Free Bedtime')}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                >
                  Learn More
                </button>
              </div>
            </div>
            
            <div className="flex border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r">
              <div className="flex-1">
                <h4 className="font-medium">Evening Relaxation Routine</h4>
                <p className="text-sm text-gray-600 dark:text-neutral-400 mt-1">
                  Adding a 10-minute relaxation or meditation routine before bed could help improve your deep sleep percentage.
                </p>
              </div>
              <div className="ml-4">
                <button 
                  onClick={() => handleExploreRoutines('Evening Relaxation Routine')}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                >
                  Explore Routines
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sleep Journal Modal */}
      {showJournalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Sleep Journal Entry</h3>
                <button 
                  onClick={() => setShowJournalModal(false)} 
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FiX size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">Date</label>
                  <input 
                    type="date" 
                    value={journalEntry.date}
                    onChange={(e) => setJournalEntry(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md dark:bg-neutral-900 dark:text-white"
                  />
                </div>

                <div className="border-t pt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-3">Sleep Factors</label>
                  
                  {journalEntry.factors.length > 0 && (
                    <div className="mb-4 space-y-2">
                      {journalEntry.factors.map((factor, index) => (
                        <div key={index} className="flex justify-between items-center bg-gray-50 dark:bg-neutral-700 p-2 rounded">
                          <div>
                            <p className="text-sm">{factor}</p>
                          </div>
                          <button 
                            onClick={() => handleRemoveFactor(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FiX />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Quick add preset factors */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">Quick Add</label>
                    <div className="space-y-2">
                      {factorCategories.map((category, categoryIndex) => (
                        <div key={categoryIndex} className="bg-gray-50 dark:bg-neutral-700 p-2 rounded">
                          <p className="text-sm font-medium mb-1">{category.name}</p>
                          <div className="flex flex-wrap gap-1">
                            {category.options.map((option, optionIndex) => (
                              <button
                                key={optionIndex}
                                onClick={() => handleSelectPresetFactor(category.name, option)}
                                className="px-2 py-1 text-xs bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded hover:bg-indigo-50 dark:hover:bg-neutral-700"
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Custom factor input */}
                  <div className="bg-gray-100 p-3 rounded-md">
                    <h4 className="text-sm font-medium mb-2">Add Custom Factor</h4>
                    <div className="flex space-x-2">
                      <input 
                        type="text" 
                        value={newFactor}
                        onChange={(e) => setNewFactor(e.target.value)}
                        placeholder="e.g., Room temperature: Cold" 
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-neutral-700 rounded-md dark:bg-neutral-900 dark:text-white"
                        onKeyPress={(e) => e.key === 'Enter' ? handleAddFactor() : null}
                      />
                      <button 
                        onClick={handleAddFactor}
                        className="px-3 py-2 bg-indigo-100 text-indigo-600 rounded-md hover:bg-indigo-200 text-sm"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button 
                  onClick={() => setShowJournalModal(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-neutral-700 rounded-md text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-neutral-700"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveJournal}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Save Entry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
} 