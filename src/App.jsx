// Import React and necessary hooks
import React, { useState, useEffect } from 'react';
import './App.css';
import 'tailwindcss/tailwind.css';

const API_URL = 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/back?limit=20&offset=0';
const API_OPTIONS = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '3a79191005mshfea109df93484d8p150e5ejsnae39acd2c9f8',
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
  },
};

const App = () => {
  const [exercises, setExercises] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredExercises, setFilteredExercises] = useState([]);

  // Fetch exercises from API
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch(API_URL, API_OPTIONS);
        const data = await response.json();
        setExercises(data);
        setFilteredExercises(data); // Set initial filtered data
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    fetchExercises();
  }, []);

  // Filter exercises based on search query
  useEffect(() => {
    const results = exercises.filter((exercise) =>
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredExercises(results);
  }, [searchQuery, exercises]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <header className="w-full bg-blue-500 text-white p-4 text-center text-2xl font-bold">
        Exercise Library
      </header>

      <main className="w-full max-w-4xl p-4">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search exercises..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {filteredExercises.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExercises.map((exercise, index) => (
              <div
                key={exercise.id || index}
                className="p-4 bg-white rounded shadow-md hover:shadow-lg"
              >
                <img
                  src={exercise.gifUrl}
                  alt={exercise.name}
                  className="w-full h-40 object-cover rounded mb-3"
                />
                <h3 className="text-xl font-semibold mb-2">{exercise.name}</h3>
                <p className="text-gray-700">
                  <strong>Target:</strong> {exercise.target}
                </p>
                <p className="text-gray-700">
                  <strong>Equipment:</strong> {exercise.equipment}
                </p>
                {exercise.secondaryMuscles.length > 0 && (
                  <p className="text-gray-700">
                    <strong>Secondary Muscles:</strong>{' '}
                    {exercise.secondaryMuscles.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No exercises found.</p>
        )}
      </main>

      <footer className="w-full bg-blue-500 text-white p-4 text-center mt-auto">
        © {new Date().getFullYear()} Exercise Library
      </footer>
    </div>
  );
};

export default App;
