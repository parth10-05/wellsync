import { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiX, FiBook, FiInfo, FiTag, FiHeart, FiPlusCircle, FiTarget, FiTrendingUp } from 'react-icons/fi';
import { getExercisesByCategory } from '../../services/mockData';

// Interface for Exercise
interface Exercise {
  id?: string;
  category: string;
  name: string;
  equipment: string;
  instructions: string;
  muscleGroups?: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  isFavorite?: boolean;
}

export default function ExerciseLibrary() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const categories = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Cardio'];

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    setIsLoading(true);
    try {
      const response = await getExercisesByCategory();
      // Add some additional properties to the mock data for UI enhancement
      const enhancedExercises = response.data.map((ex: Exercise, index: number) => ({
        ...ex,
        id: `ex-${index}`,
        muscleGroups: getMuscleGroupsByCategory(ex.category),
        difficulty: getRandomDifficulty(),
        isFavorite: Math.random() > 0.8 // Some random exercises are favorites
      }));
      setExercises(enhancedExercises);
      setFilteredExercises(enhancedExercises);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getMuscleGroupsByCategory = (category: string): string[] => {
    const muscleGroups: {[key: string]: string[]} = {
      'Chest': ['Pectoralis Major', 'Pectoralis Minor', 'Serratus Anterior'],
      'Back': ['Latissimus Dorsi', 'Trapezius', 'Rhomboids', 'Erector Spinae'],
      'Legs': ['Quadriceps', 'Hamstrings', 'Glutes', 'Calves'],
      'Shoulders': ['Deltoids', 'Rotator Cuff'],
      'Arms': ['Biceps', 'Triceps', 'Forearms'],
      'Core': ['Rectus Abdominis', 'Obliques', 'Transverse Abdominis'],
      'Cardio': ['Heart', 'Lungs']
    };
    
    return muscleGroups[category] || ['Various'];
  };

  const getRandomDifficulty = (): 'beginner' | 'intermediate' | 'advanced' => {
    const difficulties: ('beginner' | 'intermediate' | 'advanced')[] = ['beginner', 'intermediate', 'advanced'];
    return difficulties[Math.floor(Math.random() * difficulties.length)];
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === 'All' ? null : category);
    
    let filtered = exercises;
    
    // Apply category filter
    if (category !== 'All') {
      filtered = filtered.filter(exercise => exercise.category === category);
    }
    
    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(exercise => 
        exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.equipment.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply favorites filter
    if (showFavoritesOnly) {
      filtered = filtered.filter(exercise => exercise.isFavorite);
    }
    
    setFilteredExercises(filtered);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    let filtered = exercises;
    
    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(exercise => exercise.category === selectedCategory);
    }
    
    // Apply search term filter
    if (term) {
      filtered = filtered.filter(exercise => 
        exercise.name.toLowerCase().includes(term.toLowerCase()) ||
        exercise.equipment.toLowerCase().includes(term.toLowerCase())
      );
    }
    
    // Apply favorites filter
    if (showFavoritesOnly) {
      filtered = filtered.filter(exercise => exercise.isFavorite);
    }
    
    setFilteredExercises(filtered);
  };

  const toggleFavorites = () => {
    const newShowFavoritesOnly = !showFavoritesOnly;
    setShowFavoritesOnly(newShowFavoritesOnly);
    
    let filtered = exercises;
    
    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(exercise => exercise.category === selectedCategory);
    }
    
    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(exercise => 
        exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.equipment.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply favorites filter
    if (newShowFavoritesOnly) {
      filtered = filtered.filter(exercise => exercise.isFavorite);
    }
    
    setFilteredExercises(filtered);
  };

  const toggleFavorite = (exerciseId: string | undefined) => {
    if (!exerciseId) return;
    
    const updatedExercises = exercises.map(exercise => 
      exercise.id === exerciseId 
        ? { ...exercise, isFavorite: !exercise.isFavorite } 
        : exercise
    );
    
    setExercises(updatedExercises);
    
    // Update filtered exercises too
    const updatedFilteredExercises = filteredExercises.map(exercise => 
      exercise.id === exerciseId 
        ? { ...exercise, isFavorite: !exercise.isFavorite } 
        : exercise
    );
    
    setFilteredExercises(updatedFilteredExercises);
    
    // If we're showing favorites only and the user unfavorites an exercise, remove it from the filtered list
    if (showFavoritesOnly) {
      const unfavoritedExercise = updatedExercises.find(ex => ex.id === exerciseId);
      if (unfavoritedExercise && !unfavoritedExercise.isFavorite) {
        setFilteredExercises(prevFiltered => prevFiltered.filter(ex => ex.id !== exerciseId));
      }
    }
    
    // Update the selected exercise if it's the one being toggled
    if (selectedExercise && selectedExercise.id === exerciseId) {
      setSelectedExercise({
        ...selectedExercise,
        isFavorite: !selectedExercise.isFavorite
      });
    }
  };

  const handleSelectExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise);
  };

  const handleCloseExerciseDetail = () => {
    setSelectedExercise(null);
  };

  const getDifficultyColor = (difficulty: string | undefined) => {
    switch(difficulty) {
      case 'beginner':
        return 'text-success';
      case 'intermediate':
        return 'text-warning';
      case 'advanced':
        return 'text-error';
      default:
        return 'text-neutral-500';
    }
  };

  const getCategoryColor = (category: string) => {
    const categoryColors: {[key: string]: string} = {
      'Chest': 'bg-primary-light text-primary',
      'Back': 'bg-secondary-light text-secondary',
      'Legs': 'bg-accent-light text-accent',
      'Shoulders': 'bg-info-light text-info',
      'Arms': 'bg-warning-light text-warning',
      'Core': 'bg-error-light text-error',
      'Cardio': 'bg-secondary-light text-secondary'
    };
    
    return categoryColors[category] || 'bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200';
  };

  return (
    <div className="container mx-auto animate-fade-in">
      <div className="bg-card rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-card-foreground mb-6 flex items-center">
          <FiBook className="mr-2 text-primary" />
          <span>Exercise Library</span>
        </h2>
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search exercises..."
              value={searchTerm}
              onChange={e => handleSearch(e.target.value)}
              className="w-full px-10 py-2 border border-neutral-200 dark:border-neutral-700 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <FiSearch className="absolute left-3 top-3 text-neutral-400" />
            {searchTerm && (
              <button
                onClick={() => handleSearch('')}
                className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
              >
                <FiX />
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={toggleFavorites}
              className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                showFavoritesOnly
                  ? 'bg-accent-light text-accent'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              <FiHeart className={`mr-1 ${showFavoritesOnly ? 'fill-current' : ''}`} />
              <span className="text-sm">Favorites</span>
            </button>
            
            <div className="relative">
              <button
                className="flex items-center px-3 py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              >
                <FiFilter className="mr-1" />
                <span className="text-sm">Filters</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                (category === 'All' && !selectedCategory) || category === selectedCategory
                  ? 'bg-primary-light text-primary transform scale-105 shadow-sm'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Exercise List */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-card border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 animate-pulse">
                <div className="h-5 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/4 mb-3"></div>
                <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2 mb-2"></div>
                <div className="h-20 bg-neutral-200 dark:bg-neutral-700 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : filteredExercises.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExercises.map((exercise) => (
              <div 
                key={exercise.id}
                className="border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md hover:translate-y-[-2px] group"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">{exercise.name}</h3>
                    <span className={`text-xs px-2.5 py-1 rounded-full ${getCategoryColor(exercise.category)}`}>
                      {exercise.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400 mb-3">
                    <FiTarget className="mr-1" />
                    {exercise.difficulty && (
                      <span className={`${getDifficultyColor(exercise.difficulty)}`}>
                        {exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}
                      </span>
                    )}
                    {exercise.difficulty && <span className="mx-2">•</span>}
                    <span>{exercise.equipment}</span>
                  </div>
                  
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2 mb-3">{exercise.instructions}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {exercise.muscleGroups?.map((muscle, idx) => (
                      <span 
                        key={idx} 
                        className="text-xs px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between">
                    <button 
                      onClick={() => handleSelectExercise(exercise)}
                      className="text-sm px-3 py-1 bg-primary-light text-primary rounded hover:bg-primary hover:text-white transition-colors"
                    >
                      Details
                    </button>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(exercise.id);
                      }}
                      className={`p-1 rounded-full transition-colors ${
                        exercise.isFavorite
                          ? 'text-accent hover:text-neutral-600 dark:hover:text-neutral-300'
                          : 'text-neutral-400 hover:text-accent'
                      }`}
                      aria-label={exercise.isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                      <FiHeart className={exercise.isFavorite ? "fill-current" : ""} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 px-4">
            <FiInfo size={48} className="mx-auto mb-4 text-neutral-400" />
            <h3 className="text-lg font-medium mb-2">No exercises found</h3>
            <p className="text-neutral-500 dark:text-neutral-400 mb-6">Try adjusting your search or filters to find what you're looking for.</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory(null);
                setShowFavoritesOnly(false);
                setFilteredExercises(exercises);
              }}
              className="px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary-hover transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
      
      {/* Exercise Detail Modal */}
      {selectedExercise && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-card rounded-lg shadow-xl w-full max-w-md animate-slide-up">
            <div className="relative p-6">
              <button 
                onClick={handleCloseExerciseDetail} 
                className="absolute right-4 top-4 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 p-1 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all"
              >
                <FiX size={20} />
              </button>
              
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-card-foreground">{selectedExercise.name}</h3>
                  <button 
                    onClick={() => toggleFavorite(selectedExercise.id)}
                    className={`p-1 text-lg ${
                      selectedExercise.isFavorite ? 'text-accent' : 'text-neutral-400'
                    }`}
                    aria-label={selectedExercise.isFavorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    <FiHeart className={selectedExercise.isFavorite ? "fill-current" : ""} />
                  </button>
                </div>
                
                <div className="flex items-center mt-2">
                  <span className={`text-xs px-2.5 py-1 rounded-full ${getCategoryColor(selectedExercise.category)}`}>
                    {selectedExercise.category}
                  </span>
                  <span className="mx-2">•</span>
                  {selectedExercise.difficulty && (
                    <span className={`text-sm ${getDifficultyColor(selectedExercise.difficulty)}`}>
                      {selectedExercise.difficulty.charAt(0).toUpperCase() + selectedExercise.difficulty.slice(1)}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm uppercase text-neutral-500 dark:text-neutral-400 font-medium flex items-center mb-2">
                    <FiTarget className="mr-1" /> Target Muscles
                  </h4>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {selectedExercise.muscleGroups?.map((muscle, idx) => (
                      <span 
                        key={idx} 
                        className="text-sm px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm uppercase text-neutral-500 dark:text-neutral-400 font-medium flex items-center mb-2">
                    <FiTag className="mr-1" /> Equipment
                  </h4>
                  <p className="text-card-foreground">{selectedExercise.equipment}</p>
                </div>
                
                <div>
                  <h4 className="text-sm uppercase text-neutral-500 dark:text-neutral-400 font-medium flex items-center mb-2">
                    <FiInfo className="mr-1" /> Instructions
                  </h4>
                  <p className="text-card-foreground">{selectedExercise.instructions}</p>
                </div>
              </div>
              
              <div className="mt-8 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <div className="flex justify-between">
                  <button 
                    onClick={handleCloseExerciseDetail}
                    className="px-4 py-2 bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
                  >
                    Close
                  </button>
                  
                  <button 
                    className="flex items-center px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary-hover transition-colors"
                  >
                    <FiPlusCircle className="mr-1" />
                    Add to Workout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 