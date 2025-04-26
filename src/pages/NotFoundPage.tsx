import React from 'react';
import { Link } from 'react-router-dom';
import { Home, MapPin } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <div className="inline-block p-4 bg-green-100 rounded-full mb-6">
          <span className="text-6xl">🔍</span>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h1>
        
        <p className="text-gray-600 mb-8">
          Oops! It seems the good deed you're looking for has already been completed.
          Don't worry, there are plenty more waiting for you!
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-6 rounded-md transition-colors inline-flex items-center justify-center"
          >
            <Home className="mr-2 h-5 w-5" />
            Go Home
          </Link>
          
          <Link
            to="/location"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-md transition-colors inline-flex items-center justify-center"
          >
            <MapPin className="mr-2 h-5 w-5" />
            Find Deeds
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;