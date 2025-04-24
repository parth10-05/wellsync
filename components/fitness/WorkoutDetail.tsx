import { FiClock, FiCalendar, FiBarChart2, FiMapPin, FiActivity, FiEdit, FiXCircle } from 'react-icons/fi';
import { Workout } from '../../types';

interface WorkoutDetailProps {
  workout: Workout;
  onEdit: () => void;
  onDelete: () => void;
}

export default function WorkoutDetail({ workout, onEdit, onDelete }: WorkoutDetailProps) {
  // Format date to readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format duration to hours and minutes
  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 
      ? `${hours} hr ${remainingMinutes} min` 
      : `${hours} hr`;
  };

  // Calculate pace for running/walking workouts (min/km)
  const calculatePace = () => {
    if (!workout.distance || !workout.duration) return null;
    
    const paceMinutes = workout.duration / workout.distance;
    const paceMinutesWhole = Math.floor(paceMinutes);
    const paceSeconds = Math.round((paceMinutes - paceMinutesWhole) * 60);
    
    return `${paceMinutesWhole}:${paceSeconds.toString().padStart(2, '0')} min/km`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-indigo-600 text-white p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{workout.type}</h2>
          <div className="flex space-x-2">
            <button 
              onClick={onEdit}
              className="p-2 rounded-full hover:bg-indigo-500 transition-colors"
            >
              <FiEdit size={20} />
            </button>
            <button 
              onClick={onDelete}
              className="p-2 rounded-full hover:bg-indigo-500 transition-colors"
            >
              <FiXCircle size={20} />
            </button>
          </div>
        </div>
        <div className="flex items-center mt-3 text-indigo-100">
          <FiCalendar className="mr-2" />
          <span>{formatDate(workout.date)}</span>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-b border-gray-200">
        <div className="flex flex-col">
          <span className="text-gray-500 text-sm mb-1">Duration</span>
          <div className="flex items-center">
            <FiClock className="mr-2 text-indigo-600" />
            <span className="font-semibold">{formatDuration(workout.duration)}</span>
          </div>
        </div>
        
        {workout.calories && (
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm mb-1">Calories</span>
            <div className="flex items-center">
              <FiActivity className="mr-2 text-orange-500" />
              <span className="font-semibold">{workout.calories}</span>
            </div>
          </div>
        )}
        
        {workout.distance && (
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm mb-1">Distance</span>
            <div className="flex items-center">
              <FiMapPin className="mr-2 text-green-500" />
              <span className="font-semibold">{workout.distance} km</span>
            </div>
          </div>
        )}
        
        {calculatePace() && (
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm mb-1">Pace</span>
            <div className="flex items-center">
              <FiBarChart2 className="mr-2 text-blue-500" />
              <span className="font-semibold">{calculatePace()}</span>
            </div>
          </div>
        )}
        
        {workout.heartRate && (
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm mb-1">Heart Rate</span>
            <div className="flex items-center">
              <svg className="mr-2 w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="font-semibold">{workout.heartRate.avg} bpm avg</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Exercises (if any) */}
      {workout.exercises && workout.exercises.length > 0 && (
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Exercises</h3>
          <div className="space-y-3">
            {workout.exercises.map((exercise, index) => (
              <div key={index} className="border border-gray-200 rounded-md p-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{exercise.name}</h4>
                  {exercise.weight && (
                    <span className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">
                      {exercise.weight} kg
                    </span>
                  )}
                </div>
                <p className="text-gray-500 text-sm mt-1">
                  {exercise.sets} sets × {exercise.reps} reps
                  {exercise.duration && ` • ${exercise.duration} sec`}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Notes (if any) */}
      {workout.notes && (
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-2">Notes</h3>
          <p className="text-gray-700 whitespace-pre-line">{workout.notes}</p>
        </div>
      )}
    </div>
  );
} 