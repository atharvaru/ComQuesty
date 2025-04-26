import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogIn } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
// sipmle login
const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAppContext(); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }
    
    if (username.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }
    
    setError('');
    login(username);
    navigate('/location');
  };

  return (
    <div className="w-full max-w-md">
      <form 
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">Join the Quest</h3>
        
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
            Choose a username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError(''); // Clear error when typing
              }}
              className={`text-black block w-full pl-10 pr-3 py-2 rounded-md border ${
                error ? 'border-red-500' : 'border-gray-300'
              } shadow-sm focus:ring-green-500 focus:border-green-500`}
              placeholder="Your adventure name"
            />
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
        
        <button
          type="submit"
          className="w-full flex justify-center items-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
        >
          <LogIn className="mr-2 h-5 w-5" />
          Start Your Journey
        </button>
        
        <p className="mt-4 text-xs text-gray-500 text-center">
          By continuing, you agree to ComQuest's Terms of Service and Privacy Policy.
        </p>
      </form>
    </div>
  );
};

export default LoginForm;