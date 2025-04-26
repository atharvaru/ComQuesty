import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const ZipCodeForm: React.FC = () => {
  const [zipCode, setZipCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setZipCode: setContextZipCode } = useAppContext();

  const validateZipCode = (zip: string) => {
    //  US zip code validation
    const zipRegex = /^\d{5}(-\d{4})?$/;
    return zipRegex.test(zip);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!zipCode.trim()) {
      setError('Please enter a zip code');
      return;
    }
    
    if (!validateZipCode(zipCode)) {
      setError('Please enter a valid 5-digit zip code');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    
    setTimeout(() => {
      setContextZipCode(zipCode);
      setIsLoading(false);
      navigate('/deeds');
    }, 800); 
  };

  return (
    <div className="w-full max-w-md">
      <form 
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">Find Good Deeds Near You</h3>
        
        <div className="mb-4">
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
            Enter your zip code
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="zipCode"
              value={zipCode}
              onChange={(e) => {
                setZipCode(e.target.value);
                setError(''); // Clear error when typing
              }}
              className={`block w-full pl-10 pr-3 py-2 rounded-md border ${
                error ? 'border-red-500' : 'border-gray-300'
              } shadow-sm focus:ring-green-500 focus:border-green-500`}
              placeholder="Enter 5-digit zip code"
              maxLength={10}
            />
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center items-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition-colors ${
            isLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Searching...
            </>
          ) : (
            <>
              <Search className="mr-2 h-5 w-5" />
              Find Deeds
            </>
          )}
        </button>
        
        <p className="mt-4 text-xs text-gray-500 text-center">
          We'll use your zip code to find opportunities for good deeds in your area.
        </p>
      </form>
    </div>
  );
};

export default ZipCodeForm;