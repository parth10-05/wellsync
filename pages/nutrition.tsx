import { useState } from 'react';
import { FiActivity, FiUser, FiMenu, FiBell, FiPieChart, FiArrowLeft, FiPlus, FiCalendar, FiX, FiClock, FiMinusCircle } from 'react-icons/fi';
import { useRouter } from 'next/router';
import HealthMetricCard from '../components/metrics/HealthMetricCard';
import Layout from '../components/layout/Layout';

export default function Nutrition() {
  const router = useRouter();
  const [showAddMealModal, setShowAddMealModal] = useState(false);
  const [newMeal, setNewMeal] = useState({
    name: '',
    time: '',
    items: [] as { name: string; calories: number; protein: number; carbs: number; fat: number }[]
  });
  const [currentFoodItem, setCurrentFoodItem] = useState({
    name: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  });

  // Sample nutrition data
  const [nutritionData, setNutritionData] = useState({
    calories: {
      consumed: 1650,
      goal: 2200
    },
    macros: {
      protein: { value: 85, goal: 120, unit: 'g' },
      carbs: { value: 190, goal: 250, unit: 'g' },
      fat: { value: 55, goal: 70, unit: 'g' }
    },
    water: {
      value: 1.8,
      goal: 2.5,
      unit: 'L'
    }
  });

  // Sample meals
  const [meals, setMeals] = useState([
    {
      id: 1,
      name: 'Breakfast',
      time: '7:30 AM',
      calories: 420,
      items: [
        { name: 'Avocado Toast', calories: 240, protein: 8, carbs: 22, fat: 15 },
        { name: 'Greek Yogurt', calories: 120, protein: 15, carbs: 8, fat: 2 },
        { name: 'Coffee with Milk', calories: 60, protein: 2, carbs: 5, fat: 3 }
      ]
    },
    {
      id: 2,
      name: 'Lunch',
      time: '12:15 PM',
      calories: 580,
      items: [
        { name: 'Chicken Salad', calories: 350, protein: 32, carbs: 18, fat: 18 },
        { name: 'Whole Grain Bread', calories: 150, protein: 5, carbs: 30, fat: 2 },
        { name: 'Apple', calories: 80, protein: 0, carbs: 21, fat: 0 }
      ]
    },
    {
      id: 3,
      name: 'Snack',
      time: '3:45 PM',
      calories: 180,
      items: [
        { name: 'Mixed Nuts', calories: 180, protein: 6, carbs: 6, fat: 16 }
      ]
    },
    {
      id: 4,
      name: 'Dinner',
      time: '7:00 PM',
      calories: 0,
      planned: true,
      items: []
    }
  ]);

  const handleAddFoodItem = () => {
    if (currentFoodItem.name.trim() === '') return;
    
    setNewMeal(prev => ({
      ...prev,
      items: [...prev.items, {...currentFoodItem}],
    }));
    
    setCurrentFoodItem({
      name: '',
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    });
  };

  const handleRemoveFoodItem = (index: number) => {
    setNewMeal(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const calculateTotalCalories = () => {
    return newMeal.items.reduce((total, item) => total + item.calories, 0);
  };

  const handleAddMeal = () => {
    if (newMeal.name.trim() === '' || newMeal.time.trim() === '' || newMeal.items.length === 0) {
      alert('Please fill in all required fields and add at least one food item.');
      return;
    }

    const totalCalories = calculateTotalCalories();
    const totalProtein = newMeal.items.reduce((total, item) => total + item.protein, 0);
    const totalCarbs = newMeal.items.reduce((total, item) => total + item.carbs, 0);
    const totalFat = newMeal.items.reduce((total, item) => total + item.fat, 0);

    const newMealEntry = {
      id: meals.length + 1,
      name: newMeal.name,
      time: newMeal.time,
      calories: totalCalories,
      items: [...newMeal.items]
    };

    setMeals(prev => [...prev, newMealEntry]);
    
    // Update nutrition data
    setNutritionData(prev => ({
      ...prev,
      calories: {
        ...prev.calories,
        consumed: prev.calories.consumed + totalCalories
      },
      macros: {
        protein: { ...prev.macros.protein, value: prev.macros.protein.value + totalProtein },
        carbs: { ...prev.macros.carbs, value: prev.macros.carbs.value + totalCarbs },
        fat: { ...prev.macros.fat, value: prev.macros.fat.value + totalFat }
      }
    }));

    // Reset form and close modal
    setNewMeal({
      name: '',
      time: '',
      items: []
    });
    setShowAddMealModal(false);
  };

  const handleEditMeal = (id: number) => {
    // In a real app, this would open the meal for editing
    alert(`Edit meal with ID: ${id} - This would open the meal editor in a complete implementation`);
  };

  const handleAddItemsToPlannedMeal = (id: number) => {
    // In a real app, this would allow adding items to a planned meal
    alert(`Add items to planned meal with ID: ${id} - This would open the food selection in a complete implementation`);
  };

  return (
    <Layout title="Nutrition Tracking">
      <div className="max-w-6xl mx-auto">
        {/* Nutrition Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <HealthMetricCard
            title="Calories"
            value={nutritionData.calories.consumed}
            max={nutritionData.calories.goal}
            progress={(nutritionData.calories.consumed / nutritionData.calories.goal) * 100}
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>}
            color="indigo"
          />
          
          <HealthMetricCard
            title="Protein"
            value={nutritionData.macros.protein.value}
            max={nutritionData.macros.protein.goal}
            unit="g"
            progress={(nutritionData.macros.protein.value / nutritionData.macros.protein.goal) * 100}
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
            </svg>}
            color="green"
          />
          
          <HealthMetricCard
            title="Carbs"
            value={nutritionData.macros.carbs.value}
            max={nutritionData.macros.carbs.goal}
            unit="g"
            progress={(nutritionData.macros.carbs.value / nutritionData.macros.carbs.goal) * 100}
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
            </svg>}
            color="yellow"
          />
          
          <HealthMetricCard
            title="Fat"
            value={nutritionData.macros.fat.value}
            max={nutritionData.macros.fat.goal}
            unit="g"
            progress={(nutritionData.macros.fat.value / nutritionData.macros.fat.goal) * 100}
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>}
            color="red"
          />
        </div>
        
        {/* Water Intake */}
        <div className="mb-6 bg-white dark:bg-neutral-800 rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-white">Water Intake</h3>
            <div className="text-right">
              <p className="text-sm text-neutral-500 dark:text-neutral-400">Daily Goal</p>
              <p className="font-medium text-neutral-800 dark:text-white">{nutritionData.water.goal} {nutritionData.water.unit}</p>
            </div>
          </div>
          
          <div className="relative pt-1">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                  {Math.floor((nutritionData.water.value / nutritionData.water.goal) * 100)}%
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-blue-600">
                  {nutritionData.water.value} {nutritionData.water.unit}
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-4 mt-2 text-xs flex rounded bg-blue-200">
              <div 
                style={{ width: `${(nutritionData.water.value / nutritionData.water.goal) * 100}%` }} 
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500 ease-in-out"
              ></div>
            </div>
          </div>
          
          <div className="flex justify-center mt-3 space-x-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(glass => (
              <button 
                key={glass}
                className={`w-6 h-8 rounded-b-lg ${glass <= nutritionData.water.value * 4 ? 'bg-blue-500' : 'bg-blue-200 dark:bg-neutral-700'} transition-all hover:opacity-80`}
                onClick={() => {
                  // Add 0.25L of water (representing one glass)
                  const newValue = Math.min(nutritionData.water.goal, glass / 4);
                  setNutritionData(prev => ({
                    ...prev,
                    water: {
                      ...prev.water,
                      value: newValue
                    }
                  }));
                }}
              ></button>
            ))}
          </div>
        </div>
        
        {/* Meals Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold dark:text-white">Today's Meals</h3>
            <button 
              onClick={() => setShowAddMealModal(true)}
              className="flex items-center px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
            >
              <FiPlus className="mr-1" />
              <span>Add Meal</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {meals.map(meal => (
              <div key={meal.id} className={`p-4 rounded-lg ${meal.planned ? 'bg-neutral-100 dark:bg-neutral-900 border border-dashed border-neutral-300 dark:border-neutral-700' : 'bg-white dark:bg-neutral-800'} shadow`}>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-lg dark:text-white">{meal.name}</h4>
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">{meal.time}</span>
                </div>
                
                {meal.planned ? (
                  <div className="py-6 flex flex-col items-center">
                    <p className="text-neutral-500 dark:text-neutral-400 mb-3">Planned meal (no items yet)</p>
                    <button 
                      onClick={() => handleAddItemsToPlannedMeal(meal.id)}
                      className="flex items-center px-3 py-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors text-neutral-700 dark:text-white"
                    >
                      <FiPlus className="mr-1" />
                      <span>Add Items</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-neutral-700 dark:text-neutral-300 font-medium">{meal.calories} calories</span>
                      <button 
                        onClick={() => handleEditMeal(meal.id)}
                        className="text-primary hover:text-primary-hover"
                      >
                        Edit
                      </button>
                    </div>
                    
                    <ul className="divide-y divide-neutral-100 dark:divide-neutral-700">
                      {meal.items.map((item, index) => (
                        <li key={index} className="py-2">
                          <div className="flex justify-between">
                            <span className="dark:text-white">{item.name}</span>
                            <span className="text-neutral-500 dark:text-neutral-400">{item.calories} cal</span>
                          </div>
                          <div className="flex mt-1 text-xs text-neutral-500 dark:text-neutral-400 space-x-2">
                            <span>P: {item.protein}g</span>
                            <span>C: {item.carbs}g</span>
                            <span>F: {item.fat}g</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Add Meal Modal */}
        {showAddMealModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold dark:text-white">Add New Meal</h3>
                  <button 
                    onClick={() => setShowAddMealModal(false)}
                    className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-white"
                  >
                    <FiX size={24} />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Meal Name
                    </label>
                    <input
                      type="text"
                      value={newMeal.name}
                      onChange={(e) => setNewMeal({...newMeal, name: e.target.value})}
                      className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md dark:bg-neutral-900 dark:text-white"
                      placeholder="e.g., Lunch, Snack, etc."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Time
                    </label>
                    <div className="relative">
                      <input
                        type="time"
                        value={newMeal.time}
                        onChange={(e) => setNewMeal({...newMeal, time: e.target.value})}
                        className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md pl-10 dark:bg-neutral-900 dark:text-white"
                      />
                      <div className="absolute left-3 top-2.5 text-neutral-400">
                        <FiClock />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Food Items */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium dark:text-white">Food Items</h4>
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">
                      Total: {calculateTotalCalories()} calories
                    </span>
                  </div>
                  
                  {newMeal.items.length > 0 ? (
                    <ul className="mb-4 divide-y divide-neutral-100 dark:divide-neutral-700">
                      {newMeal.items.map((item, index) => (
                        <li key={index} className="py-3 flex justify-between items-center">
                          <div>
                            <p className="font-medium dark:text-white">{item.name}</p>
                            <div className="flex mt-1 text-xs text-neutral-500 dark:text-neutral-400 space-x-2">
                              <span>{item.calories} cal</span>
                              <span>P: {item.protein}g</span>
                              <span>C: {item.carbs}g</span>
                              <span>F: {item.fat}g</span>
                            </div>
                          </div>
                          <button 
                            onClick={() => handleRemoveFoodItem(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FiMinusCircle />
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-neutral-500 dark:text-neutral-400 py-3 italic">
                      No food items added yet
                    </p>
                  )}
                  
                  {/* Add food item form */}
                  <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-lg">
                    <h5 className="font-medium mb-3 dark:text-white">Add Food Item</h5>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-3">
                      <div className="md:col-span-2">
                        <input
                          type="text"
                          placeholder="Food name"
                          value={currentFoodItem.name}
                          onChange={(e) => setCurrentFoodItem({...currentFoodItem, name: e.target.value})}
                          className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md dark:bg-neutral-800 dark:text-white"
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          placeholder="Calories"
                          value={currentFoodItem.calories || ''}
                          onChange={(e) => setCurrentFoodItem({...currentFoodItem, calories: parseInt(e.target.value) || 0})}
                          className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md dark:bg-neutral-800 dark:text-white"
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          placeholder="Protein (g)"
                          value={currentFoodItem.protein || ''}
                          onChange={(e) => setCurrentFoodItem({...currentFoodItem, protein: parseInt(e.target.value) || 0})}
                          className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md dark:bg-neutral-800 dark:text-white"
                        />
                      </div>
                      <div>
                        <div className="flex space-x-1">
                          <input
                            type="number"
                            placeholder="Carbs (g)"
                            value={currentFoodItem.carbs || ''}
                            onChange={(e) => setCurrentFoodItem({...currentFoodItem, carbs: parseInt(e.target.value) || 0})}
                            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md dark:bg-neutral-800 dark:text-white"
                          />
                          <input
                            type="number"
                            placeholder="Fat (g)"
                            value={currentFoodItem.fat || ''}
                            onChange={(e) => setCurrentFoodItem({...currentFoodItem, fat: parseInt(e.target.value) || 0})}
                            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md dark:bg-neutral-800 dark:text-white"
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleAddFoodItem}
                      className="w-full py-2 bg-primary hover:bg-primary-hover text-white rounded-md transition-colors"
                    >
                      Add to Meal
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowAddMealModal(false)}
                    className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md text-neutral-700 dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddMeal}
                    className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-md transition-colors"
                    disabled={newMeal.name === '' || newMeal.time === '' || newMeal.items.length === 0}
                  >
                    Save Meal
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