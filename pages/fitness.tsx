import { useState, useEffect } from 'react';
import { 
  FiActivity, FiUser, FiMenu, FiBell, FiPieChart, 
  FiArrowLeft, FiClock, FiBook, FiSettings, 
  FiHeart, FiTrendingUp, FiCalendar, FiSun, FiMoon
} from 'react-icons/fi';
import { useRouter } from 'next/router';
import { WorkoutTracker, WorkoutTimer, ExerciseLibrary } from '../components/fitness';
import { useTheme } from '../context/ThemeContext';

type TabType = 'tracker' | 'timer' | 'exercises';
type NotificationType = {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  read: boolean;
};

export default function Fitness() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('tracker');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([
    { 
      id: '1', 
      title: 'Workout Reminder', 
      message: 'Time for your scheduled leg workout!', 
      type: 'info',
      read: false 
    },
    { 
      id: '2', 
      title: 'Goal Achieved', 
      message: 'Congratulations! You reached your weekly workout goal.',
      type: 'success',
      read: false 
    }
  ]);
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const markNotificationAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const isDarkMode = theme === 'dark';

  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-neutral-900' : 'bg-neutral-50'} transition-all`}>
      {/* Sidebar */}
      <div 
        className={`${isSidebarOpen ? 'w-64' : 'w-20'} ${isDarkMode ? 'bg-neutral-800' : 'bg-white'} 
          shadow-lg transition-all duration-300 flex flex-col border-r ${isDarkMode ? 'border-neutral-700' : 'border-neutral-200'}`}
      >
        <div className={`p-4 flex items-center justify-between border-b ${isDarkMode ? 'border-neutral-700' : 'border-neutral-200'}`}>
          {isSidebarOpen ? (
            <h1 className="text-2xl font-bold text-primary animate-fade-in">WellSync</h1>
          ) : (
            <h1 className="text-2xl font-bold text-primary animate-fade-in">WS</h1>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className={`p-2 rounded-md ${isDarkMode ? 'hover:bg-neutral-700' : 'hover:bg-neutral-100'} transition-all`}
          >
            <FiMenu className={`${isDarkMode ? 'text-neutral-300' : 'text-neutral-600'}`} />
          </button>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <a 
                href="/" 
                className={`flex items-center p-3 rounded-lg ${isDarkMode ? 'text-neutral-300 hover:bg-neutral-700' : 'text-neutral-600 hover:bg-neutral-100'} 
                  hover:text-primary transition-all group`}
              >
                <FiPieChart className={`${isSidebarOpen ? 'mr-3' : ''} transition-transform group-hover:scale-110`} />
                {isSidebarOpen && <span className="font-medium">Dashboard</span>}
              </a>
            </li>
            <li>
              <a 
                href="/fitness" 
                className={`flex items-center p-3 rounded-lg text-primary ${isDarkMode ? 'bg-neutral-700' : 'bg-primary-light'} transition-all`}
              >
                <FiActivity className={`${isSidebarOpen ? 'mr-3' : ''} transition-transform animate-pulse`} />
                {isSidebarOpen && <span className="font-medium">Fitness</span>}
              </a>
            </li>
            <li>
              <a 
                href="/nutrition" 
                className={`flex items-center p-3 rounded-lg ${isDarkMode ? 'text-neutral-300 hover:bg-neutral-700' : 'text-neutral-600 hover:bg-neutral-100'} 
                  hover:text-primary transition-all group`}
              >
                <FiHeart className={`${isSidebarOpen ? 'mr-3' : ''} transition-transform group-hover:scale-110`} />
                {isSidebarOpen && <span className="font-medium">Nutrition</span>}
              </a>
            </li>
            <li>
              <a 
                href="/progress" 
                className={`flex items-center p-3 rounded-lg ${isDarkMode ? 'text-neutral-300 hover:bg-neutral-700' : 'text-neutral-600 hover:bg-neutral-100'} 
                  hover:text-primary transition-all group`}
              >
                <FiTrendingUp className={`${isSidebarOpen ? 'mr-3' : ''} transition-transform group-hover:scale-110`} />
                {isSidebarOpen && <span className="font-medium">Progress</span>}
              </a>
            </li>
            <li>
              <a 
                href="/profile" 
                className={`flex items-center p-3 rounded-lg ${isDarkMode ? 'text-neutral-300 hover:bg-neutral-700' : 'text-neutral-600 hover:bg-neutral-100'} 
                  hover:text-primary transition-all group`}
              >
                <FiUser className={`${isSidebarOpen ? 'mr-3' : ''} transition-transform group-hover:scale-110`} />
                {isSidebarOpen && <span className="font-medium">Profile</span>}
              </a>
            </li>
          </ul>
          
          {isSidebarOpen && (
            <div className="mt-8">
              <h3 className={`px-3 py-2 text-xs font-semibold uppercase ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                Health Insights
              </h3>
              <div className={`mt-2 p-4 rounded-lg ${isDarkMode ? 'bg-neutral-700' : 'bg-neutral-100'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm ${isDarkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>Weekly Goal</span>
                  <span className="text-sm font-medium text-accent">72%</span>
                </div>
                <div className={`w-full h-2 rounded-full ${isDarkMode ? 'bg-neutral-600' : 'bg-neutral-200'}`}>
                  <div className="h-full rounded-full bg-accent w-[72%] transition-all duration-1000"></div>
                </div>
              </div>
            </div>
          )}
        </nav>
        
        {isSidebarOpen && (
          <div className={`p-4 border-t ${isDarkMode ? 'border-neutral-700' : 'border-neutral-200'}`}>
            <button 
              onClick={toggleTheme}
              className={`w-full flex items-center justify-between p-2 rounded-lg ${isDarkMode ? 'bg-neutral-700 text-neutral-300' : 'bg-neutral-100 text-neutral-600'} transition-all`}
            >
              <span className="text-sm font-medium">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
              {isDarkMode ? (
                <FiSun className="animate-pulse" />
              ) : (
                <FiMoon className="animate-pulse" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className={`${isDarkMode ? 'bg-neutral-800' : 'bg-white'} shadow-sm`}>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <button 
                onClick={() => router.push('/')}
                className={`mr-4 p-2 rounded-full ${isDarkMode ? 'hover:bg-neutral-700' : 'hover:bg-neutral-100'} transition-all`}
              >
                <FiArrowLeft className={`${isDarkMode ? 'text-neutral-300' : 'text-neutral-600'}`} />
              </button>
              <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-neutral-800'} flex items-center`}>
                <FiActivity className="mr-2 text-primary" /> 
                <span>Fitness Tracking</span>
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)} 
                  className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-neutral-700' : 'hover:bg-neutral-100'} transition-all relative`}
                >
                  <FiBell className={`${isDarkMode ? 'text-neutral-300' : 'text-neutral-600'}`} />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 h-4 w-4 bg-error text-white text-xs flex items-center justify-center rounded-full animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>
                
                {/* Notification Panel */}
                {showNotifications && (
                  <div className={`absolute right-0 mt-2 w-80 rounded-lg shadow-lg ${isDarkMode ? 'bg-neutral-800 border border-neutral-700' : 'bg-white border border-neutral-200'} z-10 overflow-hidden animate-fade-in`}>
                    <div className={`p-3 border-b ${isDarkMode ? 'border-neutral-700' : 'border-neutral-200'} flex justify-between items-center`}>
                      <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>Notifications</h3>
                      <button className="text-xs text-primary hover:underline">Mark all as read</button>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length > 0 ? (
                        <ul>
                          {notifications.map((notification) => (
                            <li 
                              key={notification.id} 
                              className={`p-3 border-b ${isDarkMode ? 'border-neutral-700' : 'border-neutral-200'} 
                                ${notification.read ? 'opacity-70' : ''} 
                                ${notification.type === 'success' ? 'border-l-4 border-l-success' : 
                                  notification.type === 'warning' ? 'border-l-4 border-l-warning' : 
                                  'border-l-4 border-l-info'}`}
                              onClick={() => markNotificationAsRead(notification.id)}
                            >
                              <div className="flex justify-between">
                                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>{notification.title}</p>
                                {!notification.read && (
                                  <span className={`h-2 w-2 rounded-full ${notification.type === 'success' ? 'bg-success' : 
                                    notification.type === 'warning' ? 'bg-warning' : 'bg-info'}`}></span>
                                )}
                              </div>
                              <p className={`text-sm mt-1 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                                {notification.message}
                              </p>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className={`p-4 text-center ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                          No notifications
                        </div>
                      )}
                    </div>
                    <div className={`p-2 ${isDarkMode ? 'bg-neutral-700' : 'bg-neutral-100'} text-center`}>
                      <button className="text-sm text-primary hover:underline">View all notifications</button>
                    </div>
                  </div>
                )}
              </div>
              
              <button className={`flex items-center space-x-2 p-2 rounded-lg ${isDarkMode ? 'hover:bg-neutral-700' : 'hover:bg-neutral-100'} transition-all`}>
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                  US
                </div>
                {isSidebarOpen && (
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>User</span>
                )}
              </button>
            </div>
          </div>
          
          {/* Tab Navigation */}
          <div className={`flex border-b ${isDarkMode ? 'border-neutral-700' : 'border-neutral-200'} px-4`}>
            <button
              onClick={() => setActiveTab('tracker')}
              className={`flex items-center px-4 py-3 border-b-2 transition-all ${
                activeTab === 'tracker' 
                  ? 'border-primary text-primary'
                  : `border-transparent ${isDarkMode ? 'text-neutral-400 hover:text-neutral-300 hover:border-neutral-600' : 'text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'}`
              }`}
            >
              <FiActivity className="mr-2" />
              <span>Tracker</span>
            </button>
            
            <button
              onClick={() => setActiveTab('timer')}
              className={`flex items-center px-4 py-3 border-b-2 transition-all ${
                activeTab === 'timer' 
                  ? 'border-primary text-primary'
                  : `border-transparent ${isDarkMode ? 'text-neutral-400 hover:text-neutral-300 hover:border-neutral-600' : 'text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'}`
              }`}
            >
              <FiClock className="mr-2" />
              <span>Timer</span>
            </button>
            
            <button
              onClick={() => setActiveTab('exercises')}
              className={`flex items-center px-4 py-3 border-b-2 transition-all ${
                activeTab === 'exercises' 
                  ? 'border-primary text-primary'
                  : `border-transparent ${isDarkMode ? 'text-neutral-400 hover:text-neutral-300 hover:border-neutral-600' : 'text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'}`
              }`}
            >
              <FiBook className="mr-2" />
              <span>Exercises</span>
            </button>

            <div className="ml-auto flex items-center py-1">
              <button className={`flex items-center p-2 rounded-lg text-sm ${isDarkMode ? 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'} transition-all`}>
                <FiCalendar className="mr-1" />
                <span>Today</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className={`flex-1 overflow-y-auto p-6 ${isDarkMode ? 'bg-neutral-900' : 'bg-neutral-50'} animate-fade-in`}>
          {activeTab === 'tracker' && <WorkoutTracker />}
          {activeTab === 'timer' && <WorkoutTimer />}
          {activeTab === 'exercises' && <ExerciseLibrary />}
        </main>
      </div>
    </div>
  );
} 