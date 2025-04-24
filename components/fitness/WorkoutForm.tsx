import { useState, ChangeEvent, FormEvent } from 'react';
import { FiClock, FiCalendar, FiPlusCircle, FiMinusCircle, FiX } from 'react-icons/fi';
import { Workout, WorkoutExercise } from '../../types';
import healthService from '../../services/api';

interface WorkoutFormProps {
  initialWorkout?: Partial<Workout>;
  onSubmit: (workout: Partial<Workout>) => void;
  onCancel: () => void;
}

const DEFAULT_WORKOUT: Partial<Workout> = {
  type: 'Running',
  duration: 30,
  completed: false,
  exercises: []
};

const WORKOUT_TYPES = [
  'Running',
  'Walking',
  'Cycling',
  'Swimming',
  'Strength Training',
  'HIIT',
  'Yoga',
  'Pilates',
  'Stretching',
  'Other'
];

export default function WorkoutForm({ initialWorkout, onSubmit, onCancel }: WorkoutFormProps) {
  const [workout, setWorkout] = useState<Partial<Workout>>(initialWorkout || DEFAULT_WORKOUT);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const [currentExercise, setCurrentExercise] = useState<Partial<WorkoutExercise>>({
    name: '',
    sets: 3,
    reps: 10
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'duration' || name === 'calories' || name === 'distance') {
      setWorkout({ ...workout, [name]: Number(value) });
    } else {
      setWorkout({ ...workout, [name]: value });
    }
  };

  const handleExerciseChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'sets' || name === 'reps' || name === 'weight' || name === 'duration') {
      setCurrentExercise({ ...currentExercise, [name]: Number(value) });
    } else {
      setCurrentExercise({ ...currentExercise, [name]: value });
    }
  };

  const addExercise = () => {
    if (!currentExercise.name) {
      setErrors({ ...errors, exerciseName: 'Exercise name is required' });
      return;
    }

    const updatedExercises = [...(workout.exercises || []), currentExercise as WorkoutExercise];
    setWorkout({ ...workout, exercises: updatedExercises });
    setCurrentExercise({ name: '', sets: 3, reps: 10 });
    setShowExerciseForm(false);
    setErrors({...errors, exerciseName: ''});
  };

  const removeExercise = (index: number) => {
    const updatedExercises = [...(workout.exercises || [])];
    updatedExercises.splice(index, 1);
    setWorkout({ ...workout, exercises: updatedExercises });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!workout.type) newErrors.type = 'Workout type is required';
    if (!workout.duration) newErrors.duration = 'Duration is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Add current date if not provided
    if (!workout.date) {
      const now = new Date();
      workout.date = now.toISOString();
    }
    
    onSubmit(workout);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {initialWorkout?.id ? 'Edit Workout' : 'Add New Workout'}
        </h2>
        <button 
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <FiX size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Workout Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Workout Type
            </label>
            <select
              name="type"
              value={workout.type}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.type ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            >
              {WORKOUT_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.type && <p className="mt-1 text-sm text-red-500">{errors.type}</p>}
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (minutes)
            </label>
            <div className="relative">
              <input
                type="number"
                name="duration"
                value={workout.duration || ''}
                onChange={handleChange}
                min="1"
                className={`w-full px-3 py-2 border ${errors.duration ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 pl-10`}
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <FiClock />
              </div>
            </div>
            {errors.duration && <p className="mt-1 text-sm text-red-500">{errors.duration}</p>}
          </div>

          {/* Date and Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date and Time
            </label>
            <div className="relative">
              <input
                type="datetime-local"
                name="date"
                value={workout.date ? new Date(workout.date).toISOString().slice(0, 16) : ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 pl-10"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <FiCalendar />
              </div>
            </div>
          </div>

          {/* Calories */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Calories Burned
            </label>
            <input
              type="number"
              name="calories"
              value={workout.calories || ''}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Optional"
            />
          </div>

          {/* Distance */}
          {(workout.type === 'Running' || workout.type === 'Walking' || workout.type === 'Cycling' || workout.type === 'Swimming') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Distance (km)
              </label>
              <input
                type="number"
                name="distance"
                value={workout.distance || ''}
                onChange={handleChange}
                min="0"
                step="0.1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}

          {/* Notes */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              name="notes"
              value={workout.notes || ''}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Optional: Add notes about your workout"
            />
          </div>
        </div>

        {/* Exercises Section (for strength training) */}
        {workout.type === 'Strength Training' && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-md font-medium text-gray-700">Exercises</h3>
              <button
                type="button"
                onClick={() => setShowExerciseForm(true)}
                className="flex items-center text-indigo-600 hover:text-indigo-800"
              >
                <FiPlusCircle className="mr-1" />
                <span>Add Exercise</span>
              </button>
            </div>

            {/* Exercise List */}
            {workout.exercises && workout.exercises.length > 0 ? (
              <div className="space-y-2 mb-4">
                {workout.exercises.map((exercise, index) => (
                  <div key={index} className="flex items-center justify-between border border-gray-200 rounded-md p-3">
                    <div>
                      <p className="font-medium">{exercise.name}</p>
                      <p className="text-sm text-gray-500">
                        {`${exercise.sets} sets × ${exercise.reps} reps`}
                        {exercise.weight ? ` · ${exercise.weight} kg` : ''}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeExercise(index)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <FiMinusCircle />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic mb-4">No exercises added yet.</p>
            )}

            {/* Add Exercise Form */}
            {showExerciseForm && (
              <div className="border border-gray-200 rounded-md p-4 bg-gray-50 mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Add Exercise</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      name="name"
                      value={currentExercise.name}
                      onChange={handleExerciseChange}
                      placeholder="Exercise name"
                      className={`w-full px-3 py-2 border ${errors.exerciseName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                    {errors.exerciseName && <p className="mt-1 text-xs text-red-500">{errors.exerciseName}</p>}
                  </div>
                  <div>
                    <div className="flex items-center">
                      <input
                        type="number"
                        name="sets"
                        value={currentExercise.sets}
                        onChange={handleExerciseChange}
                        min="1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Sets"
                      />
                      <span className="ml-2 text-gray-500">sets</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <input
                        type="number"
                        name="reps"
                        value={currentExercise.reps}
                        onChange={handleExerciseChange}
                        min="1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Reps"
                      />
                      <span className="ml-2 text-gray-500">reps</span>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <div className="flex items-center">
                      <input
                        type="number"
                        name="weight"
                        value={currentExercise.weight || ''}
                        onChange={handleExerciseChange}
                        min="0"
                        step="0.5"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Weight (optional)"
                      />
                      <span className="ml-2 text-gray-500">kg</span>
                    </div>
                  </div>
                  <div className="md:col-span-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setShowExerciseForm(false)}
                      className="px-3 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 mr-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={addExercise}
                      className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            {initialWorkout?.id ? 'Update Workout' : 'Add Workout'}
          </button>
        </div>
      </form>
    </div>
  );
} 