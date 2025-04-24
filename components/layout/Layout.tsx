import { useState, ReactNode } from 'react';
import { FiActivity, FiUser, FiMenu, FiBell, FiPieChart, FiSun, FiMoon } from 'react-icons/fi';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTheme } from '../../context/ThemeContext';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout = ({ children, title = 'Dashboard' }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
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
              <Link 
                href="/" 
                className={`flex items-center p-3 rounded-lg ${
                  router.pathname === '/' 
                    ? `text-primary ${isDarkMode ? 'bg-neutral-700' : 'bg-primary-light'}` 
                    : `${isDarkMode ? 'text-neutral-300 hover:bg-neutral-700' : 'text-neutral-600 hover:bg-neutral-100'} hover:text-primary`
                } transition-all group`}
              >
                <FiPieChart className={`${isSidebarOpen ? 'mr-3' : ''} transition-transform group-hover:scale-110`} />
                {isSidebarOpen && <span className="font-medium">Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link 
                href="/fitness" 
                className={`flex items-center p-3 rounded-lg ${
                  router.pathname === '/fitness' 
                    ? `text-primary ${isDarkMode ? 'bg-neutral-700' : 'bg-primary-light'}` 
                    : `${isDarkMode ? 'text-neutral-300 hover:bg-neutral-700' : 'text-neutral-600 hover:bg-neutral-100'} hover:text-primary`
                } transition-all group`}
              >
                <FiActivity className={`${isSidebarOpen ? 'mr-3' : ''} transition-transform group-hover:scale-110`} />
                {isSidebarOpen && <span className="font-medium">Fitness</span>}
              </Link>
            </li>
            <li>
              <Link 
                href="/nutrition" 
                className={`flex items-center p-3 rounded-lg ${
                  router.pathname === '/nutrition' 
                    ? `text-primary ${isDarkMode ? 'bg-neutral-700' : 'bg-primary-light'}` 
                    : `${isDarkMode ? 'text-neutral-300 hover:bg-neutral-700' : 'text-neutral-600 hover:bg-neutral-100'} hover:text-primary`
                } transition-all group`}
              >
                <svg className={`w-5 h-5 ${isSidebarOpen ? 'mr-3' : ''} transition-transform group-hover:scale-110`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                {isSidebarOpen && <span className="font-medium">Nutrition</span>}
              </Link>
            </li>
            <li>
              <Link 
                href="/sleep" 
                className={`flex items-center p-3 rounded-lg ${
                  router.pathname === '/sleep' 
                    ? `text-primary ${isDarkMode ? 'bg-neutral-700' : 'bg-primary-light'}` 
                    : `${isDarkMode ? 'text-neutral-300 hover:bg-neutral-700' : 'text-neutral-600 hover:bg-neutral-100'} hover:text-primary`
                } transition-all group`}
              >
                <svg className={`w-5 h-5 ${isSidebarOpen ? 'mr-3' : ''} transition-transform group-hover:scale-110`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                </svg>
                {isSidebarOpen && <span className="font-medium">Sleep</span>}
              </Link>
            </li>
            <li>
              <Link 
                href="/mental" 
                className={`flex items-center p-3 rounded-lg ${
                  router.pathname === '/mental' 
                    ? `text-primary ${isDarkMode ? 'bg-neutral-700' : 'bg-primary-light'}` 
                    : `${isDarkMode ? 'text-neutral-300 hover:bg-neutral-700' : 'text-neutral-600 hover:bg-neutral-100'} hover:text-primary`
                } transition-all group`}
              >
                <svg className={`w-5 h-5 ${isSidebarOpen ? 'mr-3' : ''} transition-transform group-hover:scale-110`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {isSidebarOpen && <span className="font-medium">Mental</span>}
              </Link>
            </li>
            <li>
              <Link 
                href="/profile" 
                className={`flex items-center p-3 rounded-lg ${
                  router.pathname === '/profile' 
                    ? `text-primary ${isDarkMode ? 'bg-neutral-700' : 'bg-primary-light'}` 
                    : `${isDarkMode ? 'text-neutral-300 hover:bg-neutral-700' : 'text-neutral-600 hover:bg-neutral-100'} hover:text-primary`
                } transition-all group`}
              >
                <FiUser className={`${isSidebarOpen ? 'mr-3' : ''} transition-transform group-hover:scale-110`} />
                {isSidebarOpen && <span className="font-medium">Profile</span>}
              </Link>
            </li>
          </ul>
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
            <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>{title}</h2>
            <div className="flex items-center space-x-4">
              <button className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-neutral-700' : 'hover:bg-neutral-100'} transition-all`}>
                <FiBell className={`${isDarkMode ? 'text-neutral-300' : 'text-neutral-600'}`} />
              </button>
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                US
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className={`flex-1 overflow-y-auto p-6 ${isDarkMode ? 'bg-neutral-900' : 'bg-neutral-50'}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout; 