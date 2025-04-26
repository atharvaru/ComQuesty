import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Filter, Search, X, PlusCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import DeedCard from '../components/DeedCard';

const DeedsPage: React.FC = () => {
  const { deeds, zipCode, user } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get unique categories from deeds
  const categories = Array.from(new Set(deeds.map(deed => deed.category)));

  // Filter deeds based on search and filters
  const filteredDeeds = deeds.filter(deed => {
    const matchesSearch = deed.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         deed.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? deed.category === selectedCategory : true;
    const matchesDifficulty = selectedDifficulty ? deed.difficulty === selectedDifficulty : true;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedDifficulty(null);
    setSearchTerm('');
  };

  const hasActiveFilters = selectedCategory || selectedDifficulty || searchTerm;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <MapPin className="h-6 w-6 text-green-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">
            Good Deeds Near {zipCode}
          </h1>
          <Link to="/location" className="ml-2 text-sm text-blue-600 hover:text-blue-800">
            Change
          </Link>
        </div>

        {user && (
          <Link
            to="/deeds/create"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition-colors inline-flex items-center"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Create New Deed
          </Link>
        )}
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
              placeholder="Search for deeds..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full flex justify-center items-center bg-white border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Filter className="mr-2 h-5 w-5" />
              {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
          
          <div className={`md:flex gap-4 ${isFilterOpen ? 'block' : 'hidden'}`}>
            <div className="mt-4 md:mt-0">
              <select
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mt-4 md:mt-0">
              <select
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                value={selectedDifficulty || ''}
                onChange={(e) => setSelectedDifficulty(e.target.value || null)}
              >
                <option value="">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="mt-4 md:mt-0 flex items-center text-red-600 hover:text-red-800 font-medium py-2 px-4 rounded-md hover:bg-red-50 transition-colors"
              >
                <X className="mr-1 h-4 w-4" />
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-gray-600 mb-6">
        {filteredDeeds.length === 0 
          ? 'No deeds found. Try adjusting your filters.' 
          : `Showing ${filteredDeeds.length} ${filteredDeeds.length === 1 ? 'deed' : 'deeds'}`}
      </p>

      {/* Deeds Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDeeds.map(deed => (
          <DeedCard key={deed.id} deed={deed} />
        ))}
      </div>

      {/* Empty State */}
      {filteredDeeds.length === 0 && (
        <div className="text-center py-16">
          <div className="bg-gray-100 rounded-full p-4 inline-flex mb-4">
            <MapPin className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No deeds found</h3>
          <p className="text-gray-600 mb-6">
            We couldn't find any deeds matching your current filters.
          </p>
          <button
            onClick={clearFilters}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-md transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default DeedsPage;