import { Workout, WorkoutExercise } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Initial mock workout data
const mockWorkouts: Workout[] = [
  {
    id: '1',
    type: 'Running',
    date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    duration: 30,
    calories: 320,
    distance: 4.2,
    heartRate: {
      avg: 145,
      max: 178
    },
    notes: 'Morning run in the park. Felt great after the first mile.',
    completed: true
  },
  {
    id: '2',
    type: 'Strength Training',
    date: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
    duration: 45,
    calories: 280,
    exercises: [
      { name: 'Bench Press', sets: 4, reps: 10, weight: 70 },
      { name: 'Squats', sets: 3, reps: 12, weight: 90 },
      { name: 'Pull Ups', sets: 3, reps: 8 },
      { name: 'Shoulder Press', sets: 3, reps: 10, weight: 20 }
    ],
    notes: 'Upper/lower body split. Increased weight on bench press.',
    completed: true
  },
  {
    id: '3',
    type: 'Yoga',
    date: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
    duration: 60,
    calories: 150,
    notes: 'Evening yoga session. Focused on flexibility and stress reduction.',
    completed: true
  },
  {
    id: '4',
    type: 'Running',
    date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
    duration: 40,
    distance: 5,
    notes: 'Scheduled morning run. Goal: maintain steady pace.',
    completed: false
  },
  {
    id: '5',
    type: 'HIIT',
    date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
    duration: 25,
    calories: 300,
    notes: 'Planned HIIT session. Circuit training with 30s work/15s rest.',
    completed: false
  }
];

// Simulate delay to mimic API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock workout service
export const mockWorkoutService = {
  getWorkouts: async () => {
    await delay(800);
    return { data: [...mockWorkouts] };
  },
  
  getWorkoutById: async (id: string) => {
    await delay(500);
    const workout = mockWorkouts.find(w => w.id === id);
    if (!workout) throw new Error('Workout not found');
    return { data: workout };
  },
  
  addWorkout: async (workoutData: Partial<Workout>) => {
    await delay(800);
    const newWorkout: Workout = {
      id: uuidv4(),
      type: workoutData.type || 'Other',
      date: workoutData.date || new Date().toISOString(),
      duration: workoutData.duration || 0,
      completed: workoutData.completed || false,
      ...workoutData
    } as Workout;
    
    mockWorkouts.push(newWorkout);
    return { data: newWorkout };
  },
  
  updateWorkout: async (id: string, workoutData: Partial<Workout>) => {
    await delay(800);
    const index = mockWorkouts.findIndex(w => w.id === id);
    if (index === -1) throw new Error('Workout not found');
    
    const updatedWorkout = {
      ...mockWorkouts[index],
      ...workoutData,
      id // Ensure ID doesn't change
    };
    
    mockWorkouts[index] = updatedWorkout;
    return { data: updatedWorkout };
  },
  
  deleteWorkout: async (id: string) => {
    await delay(500);
    const index = mockWorkouts.findIndex(w => w.id === id);
    if (index === -1) throw new Error('Workout not found');
    
    mockWorkouts.splice(index, 1);
    return { data: { success: true } };
  }
};

// Mock workout statistics
export const getWorkoutStats = async () => {
  await delay(600);
  
  const completedWorkouts = mockWorkouts.filter(w => w.completed);
  const totalWorkouts = completedWorkouts.length;
  const totalDuration = completedWorkouts.reduce((total, workout) => total + workout.duration, 0);
  const totalCalories = completedWorkouts.reduce((total, workout) => total + (workout.calories || 0), 0);
  
  // Calculate current streak
  const sortedWorkouts = [...completedWorkouts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  let currentStreak = 0;
  if (sortedWorkouts.length > 0) {
    currentStreak = 1;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let lastWorkoutDate = new Date(sortedWorkouts[0].date);
    lastWorkoutDate.setHours(0, 0, 0, 0);
    
    // Check if the most recent workout was today or yesterday
    const dayDiff = Math.floor((today.getTime() - lastWorkoutDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (dayDiff <= 1) {
      // Count consecutive days
      for (let i = 1; i < sortedWorkouts.length; i++) {
        const currentDate = new Date(sortedWorkouts[i-1].date);
        currentDate.setHours(0, 0, 0, 0);
        
        const prevDate = new Date(sortedWorkouts[i].date);
        prevDate.setHours(0, 0, 0, 0);
        
        const diff = Math.floor((currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (diff === 1) {
          currentStreak++;
        } else {
          break;
        }
      }
    } else {
      currentStreak = 0;
    }
  }
  
  // Count workout types
  const workoutTypes = completedWorkouts.reduce((acc, workout) => {
    acc[workout.type] = (acc[workout.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    data: {
      totalWorkouts,
      totalDuration,
      totalCalories,
      currentStreak,
      workoutTypes,
      // Last 7 days workouts
      weeklyWorkouts: completedWorkouts
        .filter(w => {
          const workoutDate = new Date(w.date);
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
          return workoutDate >= sevenDaysAgo;
        })
        .length
    }
  };
};

// Mock exercise library
export const exerciseLibrary = [
  // Strength exercises
  { category: 'Chest', name: 'Bench Press', equipment: 'Barbell', instructions: 'Lie on a bench and press the barbell upward until your arms are fully extended.' },
  { category: 'Chest', name: 'Push-ups', equipment: 'Bodyweight', instructions: 'Support your body with your hands and toes, lower your chest to the ground, then push back up.' },
  { category: 'Chest', name: 'Dumbbell Flyes', equipment: 'Dumbbells', instructions: 'Lie on a bench with arms extended above your chest, then lower the dumbbells out to the sides.' },
  
  { category: 'Back', name: 'Pull-ups', equipment: 'Bar', instructions: 'Hang from a bar and pull your body up until your chin is above the bar.' },
  { category: 'Back', name: 'Bent-over Rows', equipment: 'Barbell', instructions: 'Bend at the waist and pull the barbell to your lower chest.' },
  { category: 'Back', name: 'Lat Pulldowns', equipment: 'Cable Machine', instructions: 'Sit at a pulldown machine and pull the bar down to your upper chest.' },
  
  { category: 'Legs', name: 'Squats', equipment: 'Barbell', instructions: 'Rest the barbell on your shoulders, bend your knees, and lower your body, then stand back up.' },
  { category: 'Legs', name: 'Deadlifts', equipment: 'Barbell', instructions: 'Bend and grip the barbell, then lift by extending your hips and knees.' },
  { category: 'Legs', name: 'Lunges', equipment: 'Dumbbells', instructions: 'Step forward with one leg and lower your body until both knees are bent at 90 degrees.' },
  
  { category: 'Shoulders', name: 'Overhead Press', equipment: 'Barbell', instructions: 'Press the barbell from shoulder height to fully extended arms overhead.' },
  { category: 'Shoulders', name: 'Lateral Raises', equipment: 'Dumbbells', instructions: 'Raise dumbbells out to the sides until arms are parallel to the floor.' },
  { category: 'Shoulders', name: 'Front Raises', equipment: 'Dumbbells', instructions: 'Raise dumbbells in front of you until arms are parallel to the floor.' },
  
  { category: 'Arms', name: 'Bicep Curls', equipment: 'Dumbbells', instructions: 'Curl the dumbbells from a hanging position to shoulder height.' },
  { category: 'Arms', name: 'Tricep Dips', equipment: 'Bench', instructions: 'Lower your body by bending your elbows, then push back up.' },
  { category: 'Arms', name: 'Skull Crushers', equipment: 'Barbell', instructions: 'Lie on a bench and lower the barbell toward your forehead, then extend your arms.' }
];

export const getExercisesByCategory = async (category?: string) => {
  await delay(400);
  
  if (!category) {
    return { data: exerciseLibrary };
  }
  
  return { 
    data: exerciseLibrary.filter(exercise => 
      exercise.category.toLowerCase() === category.toLowerCase()
    )
  };
}; 