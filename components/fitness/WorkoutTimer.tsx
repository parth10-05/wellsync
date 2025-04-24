import { useState, useEffect, useRef } from 'react';
import { FiPlay, FiPause, FiRefreshCw, FiCheck, FiX, FiPlus, FiMinus, FiClock, FiSettings, FiZap, FiRepeat } from 'react-icons/fi';

type TimerMode = 'stopwatch' | 'countdown' | 'interval';

interface IntervalSettings {
  workSeconds: number;
  restSeconds: number;
  rounds: number;
}

export default function WorkoutTimer() {
  const [mode, setMode] = useState<TimerMode>('stopwatch');
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [countdownTime, setCountdownTime] = useState(60);
  const [intervalSettings, setIntervalSettings] = useState<IntervalSettings>({
    workSeconds: 30,
    restSeconds: 10,
    rounds: 8
  });
  const [currentRound, setCurrentRound] = useState(1);
  const [isWorkPhase, setIsWorkPhase] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  
  // Start timer
  const startTimer = () => {
    if (isRunning) return;
    
    setIsRunning(true);
    
    timerRef.current = setInterval(() => {
      if (mode === 'stopwatch') {
        setTime(prev => prev + 1);
      } else if (mode === 'countdown') {
        setTime(prev => {
          if (prev <= 1) {
            stopTimer();
            playAlarm();
            return 0;
          }
          return prev - 1;
        });
      } else if (mode === 'interval') {
        setTime(prev => {
          // Check if current phase (work/rest) is ending
          if (prev <= 1) {
            playBeep();
            
            if (isWorkPhase) {
              // Work phase ending, switch to rest
              setIsWorkPhase(false);
              return intervalSettings.restSeconds;
            } else {
              // Rest phase ending
              if (currentRound >= intervalSettings.rounds) {
                // All rounds complete
                stopTimer();
                playAlarm();
                return 0;
              } else {
                // Move to next round
                setCurrentRound(prev => prev + 1);
                setIsWorkPhase(true);
                return intervalSettings.workSeconds;
              }
            }
          }
          return prev - 1;
        });
      }
    }, 1000);
  };
  
  // Stop timer
  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRunning(false);
  };
  
  // Reset timer
  const resetTimer = () => {
    stopTimer();
    
    if (mode === 'stopwatch') {
      setTime(0);
    } else if (mode === 'countdown') {
      setTime(countdownTime);
    } else if (mode === 'interval') {
      setTime(intervalSettings.workSeconds);
      setCurrentRound(1);
      setIsWorkPhase(true);
    }
  };
  
  // Change timer mode
  const changeMode = (newMode: TimerMode) => {
    stopTimer();
    setMode(newMode);
    
    if (newMode === 'stopwatch') {
      setTime(0);
    } else if (newMode === 'countdown') {
      setTime(countdownTime);
    } else if (newMode === 'interval') {
      setTime(intervalSettings.workSeconds);
      setCurrentRound(1);
      setIsWorkPhase(true);
    }
  };
  
  // Update interval settings
  const updateIntervalSettings = (settings: Partial<IntervalSettings>) => {
    const newSettings = { ...intervalSettings, ...settings };
    setIntervalSettings(newSettings);
    
    if (mode === 'interval' && !isRunning) {
      setTime(newSettings.workSeconds);
    }
  };
  
  // Update countdown time
  const updateCountdownTime = (seconds: number) => {
    setCountdownTime(seconds);
    
    if (mode === 'countdown' && !isRunning) {
      setTime(seconds);
    }
  };
  
  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Play sound
  const playBeep = () => {
    // Simple beep for phase change
    try {
      const audio = new Audio('/beep.mp3');
      audio.play();
    } catch (error) {
      console.error('Error playing beep sound', error);
    }
  };
  
  // Play alarm sound
  const playAlarm = () => {
    // Alarm for timer completion
    try {
      const audio = new Audio('/alarm.mp3');
      audio.play();
    } catch (error) {
      console.error('Error playing alarm sound', error);
    }
  };

  return (
    <div className="container mx-auto animate-fade-in">
      <div className="bg-card rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-card-foreground mb-6 flex items-center">
          <FiClock className="mr-2 text-primary" />
          <span>Workout Timer</span>
        </h2>
        
        {/* Timer Mode Selection */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg shadow-sm bg-neutral-100 dark:bg-neutral-800 p-1">
            <button
              onClick={() => changeMode('stopwatch')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                mode === 'stopwatch' 
                  ? 'bg-primary text-white shadow-sm transform scale-105' 
                  : 'bg-transparent hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              <div className="flex items-center">
                <FiClock className="mr-1" />
                Stopwatch
              </div>
            </button>
            <button
              onClick={() => changeMode('countdown')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                mode === 'countdown' 
                  ? 'bg-primary text-white shadow-sm transform scale-105' 
                  : 'bg-transparent hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              <div className="flex items-center">
                <FiZap className="mr-1" />
                Countdown
              </div>
            </button>
            <button
              onClick={() => changeMode('interval')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                mode === 'interval' 
                  ? 'bg-primary text-white shadow-sm transform scale-105' 
                  : 'bg-transparent hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              <div className="flex items-center">
                <FiRepeat className="mr-1" />
                Interval
              </div>
            </button>
          </div>
        </div>
        
        {/* Main Timer Display */}
        <div className="mb-8 text-center">
          {mode === 'interval' && (
            <div className="mb-2">
              <h3 className={`text-lg font-semibold mb-1 ${isWorkPhase ? 'text-accent' : 'text-secondary'}`}>
                {isWorkPhase ? 'WORK' : 'REST'}
              </h3>
              <p className="text-sm text-neutral-500">
                Round {currentRound} of {intervalSettings.rounds}
              </p>
            </div>
          )}
          
          <div className="flex flex-col items-center">
            <div 
              className={`text-6xl font-bold mb-2 rounded-xl px-8 py-4 bg-primary-light dark:bg-primary-light ${
                isRunning ? 'animate-pulse' : ''
              }`}
            >
              {formatTime(time)}
            </div>
            
            {/* Controls */}
            <div className="flex space-x-4 mt-4">
              <button
                onClick={isRunning ? stopTimer : startTimer}
                className={`p-4 rounded-full shadow-md transition-all ${
                  isRunning
                    ? 'bg-error hover:bg-error-hover text-white'
                    : 'bg-success hover:bg-success-hover text-white'
                }`}
              >
                {isRunning ? <FiPause size={24} /> : <FiPlay size={24} />}
              </button>
              
              <button
                onClick={resetTimer}
                className="p-4 rounded-full bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 shadow-md transition-all"
                disabled={isRunning}
              >
                <FiRefreshCw size={24} className={isRunning ? 'text-neutral-400' : ''} />
              </button>
              
              {(mode === 'countdown' || mode === 'interval') && (
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className={`p-4 rounded-full shadow-md transition-all ${
                    showSettings 
                      ? 'bg-primary text-white' 
                      : 'bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600'
                  }`}
                  disabled={isRunning}
                >
                  <FiSettings size={24} className={isRunning ? 'text-neutral-400' : ''} />
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Settings */}
        {showSettings && (
          <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-4 mb-6 animate-slide-up">
            {mode === 'countdown' && (
              <div>
                <h3 className="text-lg font-medium mb-4">Countdown Settings</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Duration (minutes:seconds)</label>
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => updateCountdownTime(Math.max(countdownTime - 60, 0))}
                      className="p-2 rounded-md bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-all"
                      disabled={countdownTime <= 60}
                    >
                      <FiMinus />
                    </button>
                    
                    <span className="w-16 text-center text-xl">{Math.floor(countdownTime / 60)}</span>
                    
                    <button
                      onClick={() => updateCountdownTime(countdownTime + 60)}
                      className="p-2 rounded-md bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-all"
                    >
                      <FiPlus />
                    </button>
                    
                    <span className="mx-2">:</span>
                    
                    <button
                      onClick={() => updateCountdownTime(Math.max(countdownTime - 1, 0))}
                      className="p-2 rounded-md bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-all"
                      disabled={countdownTime <= 0}
                    >
                      <FiMinus />
                    </button>
                    
                    <span className="w-16 text-center text-xl">{countdownTime % 60}</span>
                    
                    <button
                      onClick={() => updateCountdownTime(countdownTime + 1)}
                      className="p-2 rounded-md bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-all"
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-center mt-4 space-x-3">
                  <button
                    onClick={() => updateCountdownTime(30)}
                    className="px-3 py-1 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded text-sm transition-all"
                  >
                    30s
                  </button>
                  <button
                    onClick={() => updateCountdownTime(60)}
                    className="px-3 py-1 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded text-sm transition-all"
                  >
                    1m
                  </button>
                  <button
                    onClick={() => updateCountdownTime(120)}
                    className="px-3 py-1 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded text-sm transition-all"
                  >
                    2m
                  </button>
                  <button
                    onClick={() => updateCountdownTime(300)}
                    className="px-3 py-1 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded text-sm transition-all"
                  >
                    5m
                  </button>
                </div>
              </div>
            )}
            
            {mode === 'interval' && (
              <div>
                <h3 className="text-lg font-medium mb-4">Interval Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Work Duration (s)</label>
                    <div className="flex items-center">
                      <button
                        onClick={() => updateIntervalSettings({ workSeconds: Math.max(intervalSettings.workSeconds - 5, 5) })}
                        className="p-2 rounded-l-md bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-all"
                      >
                        <FiMinus />
                      </button>
                      <span className="px-4 py-2 bg-neutral-50 dark:bg-neutral-900 border-y border-neutral-200 dark:border-neutral-700 w-16 text-center">
                        {intervalSettings.workSeconds}
                      </span>
                      <button
                        onClick={() => updateIntervalSettings({ workSeconds: intervalSettings.workSeconds + 5 })}
                        className="p-2 rounded-r-md bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-all"
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Rest Duration (s)</label>
                    <div className="flex items-center">
                      <button
                        onClick={() => updateIntervalSettings({ restSeconds: Math.max(intervalSettings.restSeconds - 5, 5) })}
                        className="p-2 rounded-l-md bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-all"
                      >
                        <FiMinus />
                      </button>
                      <span className="px-4 py-2 bg-neutral-50 dark:bg-neutral-900 border-y border-neutral-200 dark:border-neutral-700 w-16 text-center">
                        {intervalSettings.restSeconds}
                      </span>
                      <button
                        onClick={() => updateIntervalSettings({ restSeconds: intervalSettings.restSeconds + 5 })}
                        className="p-2 rounded-r-md bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-all"
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Rounds</label>
                    <div className="flex items-center">
                      <button
                        onClick={() => updateIntervalSettings({ rounds: Math.max(intervalSettings.rounds - 1, 1) })}
                        className="p-2 rounded-l-md bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-all"
                      >
                        <FiMinus />
                      </button>
                      <span className="px-4 py-2 bg-neutral-50 dark:bg-neutral-900 border-y border-neutral-200 dark:border-neutral-700 w-16 text-center">
                        {intervalSettings.rounds}
                      </span>
                      <button
                        onClick={() => updateIntervalSettings({ rounds: intervalSettings.rounds + 1 })}
                        className="p-2 rounded-r-md bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-all"
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <h4 className="text-sm font-medium mb-2">Quick Presets</h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => updateIntervalSettings({ workSeconds: 20, restSeconds: 10, rounds: 8 })}
                      className="px-3 py-1 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded text-sm transition-all"
                    >
                      Tabata
                    </button>
                    <button
                      onClick={() => updateIntervalSettings({ workSeconds: 30, restSeconds: 15, rounds: 10 })}
                      className="px-3 py-1 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded text-sm transition-all"
                    >
                      HIIT
                    </button>
                    <button
                      onClick={() => updateIntervalSettings({ workSeconds: 45, restSeconds: 15, rounds: 6 })}
                      className="px-3 py-1 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded text-sm transition-all"
                    >
                      Circuit
                    </button>
                    <button
                      onClick={() => updateIntervalSettings({ workSeconds: 60, restSeconds: 60, rounds: 5 })}
                      className="px-3 py-1 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded text-sm transition-all"
                    >
                      Strength
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowSettings(false)}
                className="flex items-center px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary-hover transition-all"
              >
                <FiCheck className="mr-1" />
                Apply Settings
              </button>
            </div>
          </div>
        )}
        
        {/* Tips */}
        <div className="mt-8 p-4 bg-info-light dark:bg-info-light dark:bg-opacity-10 rounded-lg">
          <h3 className="font-medium text-info mb-2">Timer Tips</h3>
          <ul className="text-sm list-disc list-inside space-y-1 text-neutral-700 dark:text-neutral-300">
            <li>Use <strong>Stopwatch</strong> for tracking open-ended workouts</li>
            <li>Use <strong>Countdown</strong> for timed workouts or challenges</li>
            <li>Use <strong>Interval</strong> for HIIT, Tabata, or circuit training</li>
            <li>Your last timer settings will be saved for next time</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 