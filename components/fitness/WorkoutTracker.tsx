import { useState, useEffect } from 'react';
import { FiPlus, FiCalendar, FiActivity, FiAward, FiClock, FiBarChart2, FiFilter, FiMoreHorizontal, FiArrowUp, FiArrowDown, FiXCircle } from 'react-icons/fi';
import { Workout } from '../../types';
import WorkoutForm from './WorkoutForm';
import WorkoutDetail from './WorkoutDetail';
import healthService from '../../services/api';
import { mockWorkoutService, getWorkoutStats } from '../../services/mockData';

// Use mock service in development, real service in production
const workoutService = process.env.NODE_ENV === 'production' 
  ? healthService 
  : mockWorkoutService;

export default function WorkoutTracker() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null);
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'upcoming'
  const [stats, setStats] = useState<any>(null);
  const [showStats, setShowStats] = useState(true);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  useEffect(() => {
    fetchWorkouts();
    fetchStats();
  }, []);

  const fetchWorkouts = async () => {
    setIsLoading(true);
    try {
      const response = await workoutService.getWorkouts();
      setWorkouts(response.data);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await getWorkoutStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching workout stats:', error);
    }
  };

  const handleAddWorkout = async (workoutData: Partial<Workout>) => {
    try {
      const response = await workoutService.addWorkout(workoutData);
      setWorkouts([...workouts, response.data]);
      setShowForm(false);
      fetchStats(); // Refresh stats after adding a workout
    } catch (error) {
      console.error('Error adding workout:', error);
    }
  };

  const handleUpdateWorkout = async (workoutData: Partial<Workout>) => {
    if (!editingWorkout?.id) return;
    
    try {
      // Update in API
      const response = await workoutService.updateWorkout(editingWorkout.id, workoutData);
      
      // Update local state
      const updatedWorkouts = workouts.map(workout => 
        workout.id === editingWorkout.id ? response.data : workout
      );
      
      setWorkouts(updatedWorkouts);
      setEditingWorkout(null);
      setSelectedWorkout(response.data);
      setShowForm(false);
      fetchStats(); // Refresh stats after updating a workout
    } catch (error) {
      console.error('Error updating workout:', error);
    }
  };

  const handleDeleteWorkout = async (id: string) => {
    try {
      await workoutService.deleteWorkout(id);
      setWorkouts(workouts.filter(workout => workout.id !== id));
      setSelectedWorkout(null);
      fetchStats(); // Refresh stats after deleting a workout
    } catch (error) {
      console.error('Error deleting workout:', error);
    }
  };

  const handleEditClick = (workout: Workout) => {
    setEditingWorkout(workout);
    setShowForm(true);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingWorkout(null);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  const filteredWorkouts = workouts.filter(workout => {
    if (filter === 'all') return true;
    if (filter === 'completed') return workout.completed;
    if (filter === 'upcoming') return !workout.completed;
    return true;
  });

  // Sort workouts with upcoming first, then by date
  const sortedWorkouts = [...filteredWorkouts].sort((a, b) => {
    // Upcoming workouts first
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // Then sort by date
    const dateComparison = new Date(b.date).getTime() - new Date(a.date).getTime();
    return sortOrder === 'desc' ? dateComparison : -dateComparison;
  });

  // Get workout type distribution for the chart
  const workoutTypeData = Array.isArray(stats?.workoutTypes) ? stats.workoutTypes : [];
  const maxTypeCount = workoutTypeData.length > 0 
    ? Math.max(...workoutTypeData.map(w => w.count), 1) 
    : 1;

  const getWorkoutTypeColor = (type: string) => {
    const typeColors = {
      'Strength': 'var(--primary)',
      'Cardio': 'var(--secondary)',
      'HIIT': 'var(--accent)',
      'Yoga': 'var(--info)',
      'Running': 'var(--warning)'
    };
    
    return typeColors[type as keyof typeof typeColors] || 'var(--neutral-400)';
  };

  return (
    <div className="container mx-auto animate-fade-in">
      {showForm ? (
        <WorkoutForm 
          onSave={editingWorkout ? handleUpdateWorkout : handleAddWorkout}
          onCancel={handleFormCancel}
          workout={editingWorkout}
        />
      ) : (
        <>
          {/* Stats Summary */}
          {stats && (
            <div className={`bg-card rounded-xl shadow-md transition-all duration-300 overflow-hidden mb-6`}>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-card-foreground flex items-center">
                    <FiBarChart2 className="mr-2 text-primary" /> 
                    <span>Workout Summary</span>
                  </h2>
                  <button 
                    onClick={() => setShowStats(!showStats)} 
                    className="text-primary hover:text-primary-hover transition-colors"
                  >
                    {showStats ? 'Show Less' : 'Show More'}
                  </button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-primary-light rounded-lg overflow-hidden shadow-sm transform transition-transform hover:scale-105">
                    <div className="flex items-center p-4">
                      <div className="p-2 bg-primary bg-opacity-20 rounded-full mr-3">
                        <FiActivity className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm opacity-80">Total Workouts</p>
                        <p className="text-2xl font-bold">{stats.totalWorkouts || 0}</p>
                      </div>
                    </div>
                    <div className="h-1 bg-primary bg-opacity-30">
                      <div className="h-full bg-primary" style={{ width: `${Math.min(100, ((stats.totalWorkouts || 0) / 20) * 100)}%` }}></div>
                    </div>
                  </div>
                  
                  <div className="bg-secondary-light rounded-lg overflow-hidden shadow-sm transform transition-transform hover:scale-105">
                    <div className="flex items-center p-4">
                      <div className="p-2 bg-secondary bg-opacity-20 rounded-full mr-3">
                        <FiClock className="text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm opacity-80">Total Duration</p>
                        <p className="text-2xl font-bold">
                          {(stats.totalDuration || 0) >= 60 
                            ? `${Math.floor((stats.totalDuration || 0) / 60)}h ${(stats.totalDuration || 0) % 60}m`
                            : `${stats.totalDuration || 0}m`
                          }
                        </p>
                      </div>
                    </div>
                    <div className="h-1 bg-secondary bg-opacity-30">
                      <div className="h-full bg-secondary" style={{ width: `${Math.min(100, ((stats.totalDuration || 0) / 300) * 100)}%` }}></div>
                    </div>
                  </div>
                  
                  <div className="bg-accent-light rounded-lg overflow-hidden shadow-sm transform transition-transform hover:scale-105">
                    <div className="flex items-center p-4">
                      <div className="p-2 bg-accent bg-opacity-20 rounded-full mr-3">
                        <FiBarChart2 className="text-accent" />
                      </div>
                      <div>
                        <p className="text-sm opacity-80">Calories Burned</p>
                        <p className="text-2xl font-bold">{stats.totalCalories || 0}</p>
                      </div>
                    </div>
                    <div className="h-1 bg-accent bg-opacity-30">
                      <div className="h-full bg-accent" style={{ width: `${Math.min(100, ((stats.totalCalories || 0) / 2000) * 100)}%` }}></div>
                    </div>
                  </div>
                  
                  <div className="bg-info-light rounded-lg overflow-hidden shadow-sm transform transition-transform hover:scale-105">
                    <div className="flex items-center p-4">
                      <div className="p-2 bg-info bg-opacity-20 rounded-full mr-3">
                        <FiAward className="text-info" />
                      </div>
                      <div>
                        <p className="text-sm opacity-80">Current Streak</p>
                        <p className="text-2xl font-bold">{stats.currentStreak || 0} days</p>
                      </div>
                    </div>
                    <div className="h-1 bg-info bg-opacity-30">
                      <div className="h-full bg-info" style={{ width: `${Math.min(100, ((stats.currentStreak || 0) / 7) * 100)}%` }}></div>
                    </div>
                  </div>
                </div>
                
                {showStats && (
                  <div className="animate-slide-up">
                    <h3 className="text-md font-medium mb-3">Workout Types</h3>
                    <div className="bg-card p-4 rounded-lg shadow-sm border border-border">
                      {workoutTypeData.length > 0 ? (
                        workoutTypeData.map((type) => (
                          <div key={type.name} className="mb-3 last:mb-0">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium">{type.name}</span>
                              <span className="text-sm">{type.count} workouts</span>
                            </div>
                            <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                              <div 
                                className="h-full rounded-full transition-all duration-1000" 
                                style={{ 
                                  width: `${(type.count / maxTypeCount) * 100}%`,
                                  backgroundColor: getWorkoutTypeColor(type.name)
                                }}
                              ></div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-3 text-neutral-500">
                          No workout type data available
                        </div>
                      )}
                    </div>

                    <h3 className="text-md font-medium mt-6 mb-3">Monthly Activity</h3>
                    <div className="bg-card p-4 rounded-lg shadow-sm border border-border overflow-x-auto">
                      {Array.isArray(stats.monthlyActivity) && stats.monthlyActivity.length > 0 ? (
                        <div className="flex items-end h-32 space-x-2 min-w-[500px]">
                          {stats.monthlyActivity.map((month) => (
                            <div key={month.month} className="flex flex-col items-center flex-1">
                              <div 
                                className="w-full rounded-t-md transition-all duration-700 bg-primary hover:bg-primary-hover group relative"
                                style={{ 
                                  height: `${(month.workouts / Math.max(...stats.monthlyActivity.map(m => m.workouts), 1)) * 100}%`,
                                  minHeight: '4px'
                                }}
                              >
                                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-primary-hover text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                  {month.workouts} workouts
                                </div>
                              </div>
                              <span className="text-xs mt-2 opacity-70">{month.month}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-3 text-neutral-500">
                          No monthly activity data available
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Workout List Header */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <h2 className="text-xl font-semibold text-card-foreground">Your Workouts</h2>
              <div className="relative ml-2">
                <button 
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                  className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                >
                  <FiFilter className="text-neutral-500 dark:text-neutral-400" />
                </button>
                
                {showFilterMenu && (
                  <div className="absolute z-10 mt-2 w-48 bg-card rounded-lg shadow-lg border border-border animate-fade-in overflow-hidden">
                    <div className="p-2">
                      <button 
                        className={`w-full text-left px-3 py-2 rounded-md transition-colors ${filter === 'all' ? 'bg-primary-light text-primary' : 'hover:bg-neutral-100 dark:hover:bg-neutral-700'}`}
                        onClick={() => { setFilter('all'); setShowFilterMenu(false); }}
                      >
                        All Workouts
                      </button>
                      <button 
                        className={`w-full text-left px-3 py-2 rounded-md transition-colors ${filter === 'completed' ? 'bg-primary-light text-primary' : 'hover:bg-neutral-100 dark:hover:bg-neutral-700'}`}
                        onClick={() => { setFilter('completed'); setShowFilterMenu(false); }}
                      >
                        Completed
                      </button>
                      <button 
                        className={`w-full text-left px-3 py-2 rounded-md transition-colors ${filter === 'upcoming' ? 'bg-primary-light text-primary' : 'hover:bg-neutral-100 dark:hover:bg-neutral-700'}`}
                        onClick={() => { setFilter('upcoming'); setShowFilterMenu(false); }}
                      >
                        Upcoming
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="ml-3 flex items-center">
                <span className="text-sm text-neutral-500 dark:text-neutral-400 mr-2">Sort:</span>
                <button 
                  onClick={toggleSortOrder}
                  className="flex items-center p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                >
                  {sortOrder === 'desc' ? (
                    <FiArrowDown className="text-neutral-500 dark:text-neutral-400" />
                  ) : (
                    <FiArrowUp className="text-neutral-500 dark:text-neutral-400" />
                  )}
                </button>
              </div>
            </div>
            
            <button 
              onClick={() => setShowForm(true)} 
              className="flex items-center px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary-hover transition-colors"
            >
              <FiPlus className="mr-1" />
              Add Workout
            </button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-card rounded-lg shadow-md p-6 animate-pulse">
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-1/4 mb-4"></div>
                  <div className="h-10 bg-neutral-200 dark:bg-neutral-700 rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {selectedWorkout ? (
                <div className="animate-fade-in">
                  <div className="mb-4">
                    <button 
                      onClick={() => setSelectedWorkout(null)} 
                      className="flex items-center text-primary hover:text-primary-hover transition-colors"
                    >
                      <FiXCircle className="mr-1" /> Back to all workouts
                    </button>
                  </div>
                  <WorkoutDetail 
                    workout={selectedWorkout}
                    onDelete={handleDeleteWorkout}
                    onEdit={handleEditClick}
                  />
                </div>
              ) : (
                <>
                  {filteredWorkouts.length === 0 ? (
                    <div className="bg-card rounded-lg shadow-md p-8 text-center">
                      <div className="flex flex-col items-center">
                        <FiActivity className="text-4xl text-neutral-400 mb-3" />
                        <h3 className="text-lg font-medium mb-2">No workouts found</h3>
                        <p className="text-neutral-500 dark:text-neutral-400 mb-4">
                          {filter === 'all' 
                            ? "You haven't added any workouts yet." 
                            : `No ${filter} workouts found.`}
                        </p>
                        <button 
                          onClick={() => setShowForm(true)} 
                          className="px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary-hover transition-colors"
                        >
                          Add Your First Workout
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {sortedWorkouts.map((workout) => (
                        <div 
                          key={workout.id} 
                          onClick={() => setSelectedWorkout(workout)}
                          className={`bg-card rounded-lg shadow-md p-5 cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 ${
                            workout.completed ? 'border-l-4 border-success' : 'border-l-4 border-warning'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <h3 className="text-lg font-semibold mb-2 text-card-foreground">{workout.name}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              workout.completed 
                                ? 'bg-success bg-opacity-10 text-success' 
                                : 'bg-warning bg-opacity-10 text-warning'
                            }`}>
                              {workout.completed ? 'Completed' : 'Upcoming'}
                            </span>
                          </div>
                          
                          <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">
                            <div className="flex items-center mb-1">
                              <FiCalendar className="mr-2" size={14} />
                              {new Date(workout.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <FiActivity className="mr-2" size={14} />
                              {workout.type}
                            </div>
                          </div>
                          
                          <div className="mt-3 flex justify-between items-center">
                            <div className="flex space-x-2">
                              <span className="inline-block px-2 py-1 bg-neutral-100 dark:bg-neutral-700 rounded text-xs">
                                {workout.duration} min
                              </span>
                              <span className="inline-block px-2 py-1 bg-neutral-100 dark:bg-neutral-700 rounded text-xs">
                                {workout.calories} cal
                              </span>
                            </div>
                            <button className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300">
                              <FiMoreHorizontal />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
} 