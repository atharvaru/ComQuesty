import React from 'react';
import { Link } from 'react-router-dom';
import { Deed } from '../types';
import { Clock, MapPin, Award } from 'lucide-react';

interface DeedCardProps {
  deed: Deed;
}
// culurs for dificl
const DeedCard: React.FC<DeedCardProps> = ({ deed }) => {
  const difficultyColor = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800',
  }[deed.difficulty];
// set emojis
  const categoryIconMap: Record<string, string> = {
    environment: '🌳',
    community: '🏘️',
    social: '👥',
    'animal welfare': '🐾',
    education: '📚'
  };

  const categoryIcon = categoryIconMap[deed.category] || '✨';

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      <div className={`h-2 ${deed.difficulty === 'easy' ? 'bg-green-500' : deed.difficulty === 'medium' ? 'bg-yellow-500' : 'bg-red-500'}`} />
      
      <div className="p-5">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{deed.title}</h3>
          <span className="text-2xl" role="img" aria-label={deed.category}>
            {categoryIcon}
          </span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{deed.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${difficultyColor}`}>
            {deed.difficulty.charAt(0).toUpperCase() + deed.difficulty.slice(1)}
          </span>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
            {deed.category.charAt(0).toUpperCase() + deed.category.slice(1)}
          </span>
        </div>
        
        <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4 gap-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{deed.estimatedTime}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{deed.location}</span>
          </div>
          <div className="flex items-center">
            <Award className="w-4 h-4 mr-1" />
            <span className="font-medium text-purple-600">{deed.points} points</span>
          </div>
        </div>
        
        <Link 
          to={`/deed/${deed.id}`}
          className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
        >
          Start This Deed
        </Link>
      </div>
    </div>
  );
};

export default DeedCard;