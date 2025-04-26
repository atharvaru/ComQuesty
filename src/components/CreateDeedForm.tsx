import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

// creating a new deed
const CreateDeedForm: React.FC = () => {
  const navigate = useNavigate(); 
  const { user, createDeed } = useAppContext(); 
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'environment',
    difficulty: 'easy',
    estimatedTime: '30 min',
    location: '',
  }); // State to manage form input values
  const [error, setError] = useState(''); // State to manage error messages

  // redirect to login page if user not lofged in
  if (!user) {
    return (
      <div className="text-center py-10">
        <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Please Log In</h3>
        <p className="text-gray-600 mb-4">You need to be logged in to create deeds.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-md transition-colors"
        >
          Log In
        </button>
      </div>
    );
  }

  // handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    // validate required fields
    if (!formData.title.trim() || !formData.description.trim() || !formData.location.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    // difficulty to  points
    const points = {
      easy: 15,
      medium: 30,
      hard: 50
    }[formData.difficulty];

    // call createDeed function with form data
    createDeed({
      ...formData,
      points,
      createdBy: user.id, // add user ID as the creator
      createdAt: new Date().toISOString(), //current timestamp
      approved: false // deed as not approved by default
    });

    // to deeds
    navigate('/deeds');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title input field */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Deed Title*
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-green-500"
          placeholder="e.g., Clean up local park"
        />
      </div>

      {/* Description input field */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description*
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-green-500"
          placeholder="Describe what needs to be done and why it's important..."
        />
      </div>

      {/* Grid for category, difficulty, estimated time, and location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category dropdown */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-green-500"
          >
            <option value="environment">Environment</option>
            <option value="community">Community</option>
            <option value="social">Social</option>
            <option value="animal welfare">Animal Welfare</option>
            <option value="education">Education</option>
          </select>
        </div>

        {/* Difficulty dropdown */}
        <div>
          <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
            Difficulty
          </label>
          <select
            id="difficulty"
            value={formData.difficulty}
            onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
            className="block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-green-500"
          >
            <option value="easy">Easy (15 points)</option>
            <option value="medium">Medium (30 points)</option>
            <option value="hard">Hard (50 points)</option>
          </select>
        </div>

        {/* Estimated time dropdown */}
        <div>
          <label htmlFor="estimatedTime" className="block text-sm font-medium text-gray-700 mb-1">
            Estimated Time
          </label>
          <select
            id="estimatedTime"
            value={formData.estimatedTime}
            onChange={(e) => setFormData({ ...formData, estimatedTime: e.target.value })}
            className="block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-green-500"
          >
            <option value="15 min">15 minutes</option>
            <option value="30 min">30 minutes</option>
            <option value="1 hour">1 hour</option>
            <option value="2 hours">2 hours</option>
            <option value="3 hours">3 hours</option>
            <option value="4+ hours">4+ hours</option>
          </select>
        </div>

        {/* Location input field */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location*
          </label>
          <input
            type="text"
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-green-500"
            placeholder="e.g., City Park, Downtown"
          />
        </div>
      </div>

      {/* Error message display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex justify-end space-x-4">
        {/* Cancel button */}
        <button
          type="button"
          onClick={() => navigate('/deeds')}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        {/* Submit button */}
        <button
          type="submit"
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Create Deed
        </button>
      </div>
    </form>
  );
};

export default CreateDeedForm;