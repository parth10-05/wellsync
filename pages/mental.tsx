import { useState } from 'react';
import { FiActivity, FiUser, FiMenu, FiBell, FiPieChart, FiArrowLeft, FiPlus, FiPlusCircle, FiCalendar, FiXCircle } from 'react-icons/fi';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
import HealthMetricCard from '../components/metrics/HealthMetricCard';

export default function MentalHealth() {
  const router = useRouter();
  const [showMoodModal, setShowMoodModal] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [moodNote, setMoodNote] = useState('');
  const [moodFactors, setMoodFactors] = useState<string[]>([]);
  const [newFactor, setNewFactor] = useState('');
  
  // Sample mood data
  const [moodData, setMoodData] = useState({
    today: {
      date: "2024-04-12",
      mood: "Happy",
      score: 85,
      energy: "Energetic",
      energyScore: 90,
      stress: "Low",
      stressScore: 25,
      notes: "Productive day at work, went for a run, had dinner with friends.",
      factors: ["Exercise", "Social", "Work success"]
    },
    weeklyAverage: {
      mood: 78,
      energy: 75,
      stress: 35
    },
    moodHistory: [
      { date: "2024-04-06", mood: 65, stress: 45 },
      { date: "2024-04-07", mood: 75, stress: 30 },
      { date: "2024-04-08", mood: 80, stress: 40 },
      { date: "2024-04-09", mood: 70, stress: 60 },
      { date: "2024-04-10", mood: 75, stress: 35 },
      { date: "2024-04-11", mood: 85, stress: 20 },
      { date: "2024-04-12", mood: 85, stress: 25 }
    ]
  });

  // Mental health practices
  const [practices, setPractices] = useState([
    {
      id: "1",
      name: "Daily Meditation",
      description: "5-minute mindfulness practice",
      category: "Mindfulness",
      duration: "5 min",
      completed: true,
      streak: 5,
      scheduled: "07:30",
      icon: "🧘"
    },
    {
      id: "2",
      name: "Gratitude Journal",
      description: "Write 3 things you're grateful for",
      category: "Journaling",
      duration: "3 min",
      completed: false,
      streak: 0,
      scheduled: "21:00",
      icon: "📓"
    },
    {
      id: "3",
      name: "Deep Breathing",
      description: "Box breathing exercise",
      category: "Stress Relief",
      duration: "2 min",
      completed: false,
      scheduled: "12:30",
      icon: "🫁"
    },
    {
      id: "4",
      name: "Digital Detox",
      description: "No screens for 30 minutes",
      category: "Mindfulness",
      duration: "30 min",
      completed: false,
      scheduled: "19:00",
      icon: "📵"
    }
  ]);

  // Mood options
  const moodOptions = [
    { name: "Happy", icon: "😊", color: "bg-yellow-500" },
    { name: "Calm", icon: "😌", color: "bg-blue-500" },
    { name: "Tired", icon: "😴", color: "bg-purple-500" },
    { name: "Anxious", icon: "😰", color: "bg-orange-500" },
    { name: "Sad", icon: "😔", color: "bg-indigo-500" },
    { name: "Stressed", icon: "😫", color: "bg-red-500" },
    { name: "Grateful", icon: "🙏", color: "bg-green-500" },
    { name: "Excited", icon: "🤩", color: "bg-pink-500" }
  ];

  // Common factors that affect mood
  const commonFactors = [
    "Sleep", "Exercise", "Nutrition", "Work stress", 
    "Social interaction", "Alone time", "Screen time", 
    "Nature", "Meditation", "Weather"
  ];

  const handleCompletePractice = (id: string) => {
    setPractices(practices.map(practice => 
      practice.id === id ? { ...practice, completed: true, streak: practice.streak + 1 } : practice
    ));
  };

  const handleAddFactor = () => {
    if (newFactor && !moodFactors.includes(newFactor)) {
      setMoodFactors([...moodFactors, newFactor]);
      setNewFactor('');
    }
  };

  const handleRemoveFactor = (factor: string) => {
    setMoodFactors(moodFactors.filter(f => f !== factor));
  };

  const handleSaveMood = () => {
    if (!selectedMood) {
      alert('Please select a mood');
      return;
    }
    
    // Find selected mood details
    const moodOption = moodOptions.find(m => m.name === selectedMood);
    
    // Update mood data
    const newMoodData = {
      ...moodData,
      today: {
        ...moodData.today,
        date: new Date().toISOString().split('T')[0],
        mood: selectedMood,
        score: selectedMood === 'Happy' || selectedMood === 'Excited' || selectedMood === 'Grateful' ? 85 : 
               selectedMood === 'Calm' ? 75 :
               selectedMood === 'Tired' || selectedMood === 'Anxious' ? 45 :
               selectedMood === 'Sad' || selectedMood === 'Stressed' ? 30 : 50,
        notes: moodNote,
        factors: moodFactors
      }
    };
    
    setMoodData(newMoodData);
    setShowMoodModal(false);
    
    // Reset form
    setSelectedMood(null);
    setMoodNote('');
    setMoodFactors([]);
  };

  const getIconForFactor = (factor: string) => {
    const iconMap: {[key: string]: string} = {
      "Sleep": "😴",
      "Exercise": "🏃",
      "Nutrition": "🍎",
      "Work stress": "💼",
      "Social interaction": "👥",
      "Alone time": "🧘",
      "Screen time": "📱",
      "Nature": "🌳",
      "Meditation": "🧠",
      "Weather": "☀️"
    };
    
    return iconMap[factor] || "✨";
  };

  const getMoodIcon = (mood: string) => {
    const option = moodOptions.find(m => m.name === mood);
    return option ? option.icon : "😊";
  };

  const getMoodColor = (mood: string) => {
    const option = moodOptions.find(m => m.name === mood);
    return option ? option.color : "bg-gray-500";
  };

  return (
    <Layout title="Mental Wellness">
      <div className="max-w-6xl mx-auto">
        {/* Mood Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <HealthMetricCard
            title="Current Mood"
            value={moodData.today.score}
            max={100}
            icon={<span className="text-xl">{getMoodIcon(moodData.today.mood)}</span>}
            progress={moodData.today.score}
            color="yellow"
            subtitle={moodData.today.mood}
          />
          
          <HealthMetricCard
            title="Energy Level"
            value={moodData.today.energyScore}
            max={100}
            icon={<span className="text-xl">⚡</span>}
            progress={moodData.today.energyScore}
            color="blue"
            subtitle={moodData.today.energy}
          />
          
          <HealthMetricCard
            title="Stress Level"
            value={moodData.today.stressScore}
            max={100}
            invert={true}
            icon={<span className="text-xl">🧠</span>}
            progress={moodData.today.stressScore}
            color="red"
            subtitle={moodData.today.stress}
          />
        </div>

        {/* Recent Mood and Log Mood Button */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold dark:text-white">Today's Mood</h3>
            <button 
              onClick={() => setShowMoodModal(true)}
              className="flex items-center px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
            >
              <FiPlus className="mr-1" />
              <span>Log Mood</span>
            </button>
          </div>
          
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow p-4">
            <div className="flex items-start">
              <div className={`${getMoodColor(moodData.today.mood)} w-12 h-12 rounded-full flex items-center justify-center text-xl mr-4`}>
                {getMoodIcon(moodData.today.mood)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-lg dark:text-white">{moodData.today.mood}</h4>
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">Today</span>
                </div>
                <p className="text-neutral-600 dark:text-neutral-300 mb-3">
                  {moodData.today.notes || "No notes added for today."}
                </p>
                {moodData.today.factors && moodData.today.factors.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-2">Factors:</p>
                    <div className="flex flex-wrap gap-2">
                      {moodData.today.factors.map(factor => (
                        <span key={factor} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300">
                          {getIconForFactor(factor)} {factor}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Wellness Practices */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 dark:text-white">Daily Wellness Practices</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {practices.map(practice => (
              <div key={practice.id} className="bg-white dark:bg-neutral-800 rounded-lg shadow p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{practice.icon}</span>
                    <div>
                      <h4 className="font-medium text-lg dark:text-white">{practice.name}</h4>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">{practice.description}</p>
                    </div>
                  </div>
                  {practice.streak > 0 && (
                    <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                      🔥 {practice.streak} day streak
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 block">Scheduled</span>
                    <span className="text-neutral-900 dark:text-white">{practice.scheduled} • {practice.duration}</span>
                  </div>
                  <button 
                    onClick={() => handleCompletePractice(practice.id)}
                    disabled={practice.completed}
                    className={`px-3 py-1 rounded-md text-sm ${
                      practice.completed 
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                        : 'bg-primary text-white hover:bg-primary-hover'
                    }`}
                  >
                    {practice.completed ? 'Completed' : 'Complete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Mood History Chart (simplified) */}
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow p-4 mb-6">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Mood & Stress Trends</h3>
          
          <div className="h-64 relative">
            {/* This is a simplified chart representation. In a real app, use Chart.js or similar */}
            <div className="absolute inset-0 border-b border-l border-neutral-200 dark:border-neutral-700">
              <div className="absolute left-0 bottom-0 text-xs text-neutral-500 dark:text-neutral-400">7 days ago</div>
              <div className="absolute right-0 bottom-0 text-xs text-neutral-500 dark:text-neutral-400">Today</div>
              
              <div className="absolute left-0 bottom-0 h-full w-full flex items-end">
                {moodData.moodHistory.map((day, index) => {
                  const width = 100 / moodData.moodHistory.length;
                  return (
                    <div 
                      key={day.date} 
                      className="flex flex-col items-center justify-end h-full"
                      style={{ width: `${width}%` }}
                    >
                      {/* Mood bar */}
                      <div 
                        className="w-6 bg-yellow-500 rounded-t transition-all duration-500"
                        style={{ height: `${day.mood}%` }}
                      ></div>
                      
                      {/* Stress bar - offset to show both */}
                      <div 
                        className="w-6 bg-red-500 rounded-t transition-all duration-500 absolute"
                        style={{ 
                          height: `${day.stress}%`, 
                          left: `calc(${index * width}% + ${width/2}% + 10px)` 
                        }}
                      ></div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="absolute top-0 left-0 text-xs text-neutral-500 dark:text-neutral-400">High</div>
            <div className="absolute bottom-0 left-0 text-xs text-neutral-500 dark:text-neutral-400">Low</div>
            
            <div className="absolute top-4 right-4 flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">Mood</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">Stress</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mood Logging Modal */}
        {showMoodModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold dark:text-white">How are you feeling?</h3>
                  <button 
                    onClick={() => setShowMoodModal(false)}
                    className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-white"
                  >
                    <FiXCircle size={24} />
                  </button>
                </div>
                
                <div className="mb-6">
                  <div className="grid grid-cols-4 gap-3">
                    {moodOptions.map(mood => (
                      <button 
                        key={mood.name}
                        className={`p-3 rounded-lg flex flex-col items-center justify-center transition-all ${
                          selectedMood === mood.name 
                            ? `ring-2 ring-offset-2 ring-${mood.color.split('-')[1]}-500 dark:ring-offset-neutral-800` 
                            : 'hover:bg-neutral-100 dark:hover:bg-neutral-700'
                        }`}
                        onClick={() => setSelectedMood(mood.name)}
                      >
                        <span className="text-3xl mb-2">{mood.icon}</span>
                        <span className="text-sm font-medium dark:text-white">{mood.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Notes
                  </label>
                  <textarea
                    value={moodNote}
                    onChange={(e) => setMoodNote(e.target.value)}
                    placeholder="How's your day going? Any specific events affecting your mood?"
                    rows={3}
                    className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md dark:bg-neutral-900 dark:text-white"
                  ></textarea>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Factors affecting your mood
                  </label>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {moodFactors.map(factor => (
                      <span 
                        key={factor} 
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
                      >
                        {getIconForFactor(factor)} {factor}
                        <button 
                          onClick={() => handleRemoveFactor(factor)}
                          className="ml-1 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-white"
                        >
                          <FiXCircle size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newFactor}
                      onChange={(e) => setNewFactor(e.target.value)}
                      placeholder="Add custom factor"
                      className="flex-1 px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md dark:bg-neutral-900 dark:text-white"
                    />
                    <button
                      onClick={handleAddFactor}
                      className="px-3 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  
                  <div className="mt-3">
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">Common factors:</p>
                    <div className="flex flex-wrap gap-2">
                      {commonFactors.map(factor => (
                        <button
                          key={factor}
                          onClick={() => {
                            if (!moodFactors.includes(factor)) {
                              setMoodFactors([...moodFactors, factor]);
                            }
                          }}
                          disabled={moodFactors.includes(factor)}
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            moodFactors.includes(factor)
                              ? 'bg-neutral-200 text-neutral-400 dark:bg-neutral-700 dark:text-neutral-500 cursor-not-allowed'
                              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
                          }`}
                        >
                          {getIconForFactor(factor)} {factor}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowMoodModal(false)}
                    className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md text-neutral-700 dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveMood}
                    className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-md transition-colors"
                    disabled={!selectedMood}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
} 