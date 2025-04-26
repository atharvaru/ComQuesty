import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Award, LogOut, MapPin, Clock, Calendar, Camera } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { CompletedDeed, Deed } from '../types';

const ProfilePage: React.FC = () => {
  const { user, completedDeeds, deeds, logout } = useAppContext();
  const navigate = useNavigate();
  const [userDeeds, setUserDeeds] = useState<Array<CompletedDeed & { deed: Deed }>>([]);
  const [activeTab, setActiveTab] = useState<'deeds' | 'stats'>('deeds');

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    // Match completed deeds with deed details
    const userCompletedDeeds = completedDeeds
      .filter(cd => cd.userId === user.id)
      .map(cd => {
        const deed = deeds.find(d => d.id === cd.deedId);
        return deed ? { ...cd, deed } : null;
      })
      .filter((item): item is CompletedDeed & { deed: Deed } => item !== null)
      .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
    
    setUserDeeds(userCompletedDeeds);
  }, [user, completedDeeds, deeds, navigate]);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Please log in</h1>
        <p className="text-gray-600 mb-6">You need to be logged in to view your profile.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-green-600 hover:bg-green-700 text-black font-semibold py-2 px-6 rounded-md transition-colors"
        >
          Log In
        </button>
      </div>
    );
  }

  // Calculate stats
  const totalPoints = user.points;
  const totalDeeds = user.completedDeeds;
  const deedsByCategory = userDeeds.reduce((acc, { deed }) => {
    acc[deed.category] = (acc[deed.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const deedsByDifficulty = userDeeds.reduce((acc, { deed }) => {
    acc[deed.difficulty] = (acc[deed.difficulty] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="h-24 bg-gradient-to-r from-green-600 to-green-500"></div>
          <div className="p-6">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="flex-shrink-0 -mt-16 mb-4 sm:mb-0">
                <div className="h-24 w-24 rounded-full bg-green-100 border-4 border-white shadow-md flex items-center justify-center">
                  <User className="h-12 w-12 text-green-600" />
                </div>
              </div>
              <div className="sm:ml-6 text-center sm:text-left">
                <h1 className="text-2xl font-bold text-gray-800">{user.username}</h1>
                <p className="text-gray-600">
                  Good deed adventurer • Joined {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-auto flex flex-col sm:flex-row items-center gap-4">
                <div className="bg-purple-100 px-4 py-2 rounded-full flex items-center">
                  <Award className="h-5 w-5 text-purple-600 mr-2" />
                  <span className="font-semibold text-purple-800">{totalPoints} Points</span>
                </div>
                <button
                  onClick={logout}
                  className="text-red-600 hover:text-red-700 font-medium flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('deeds')}
                className={`py-4 px-6 font-medium text-sm flex items-center ${
                  activeTab === 'deeds'
                    ? 'border-b-2 border-green-500 text-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Camera className="h-4 w-4 mr-2" />
                Completed Deeds
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                className={`py-4 px-6 font-medium text-sm flex items-center ${
                  activeTab === 'stats'
                    ? 'border-b-2 border-green-500 text-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Award className="h-4 w-4 mr-2" />
                Statistics
              </button>
            </nav>
          </div>
          
          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'deeds' && (
              <>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Completed Deeds</h2>
                
                {userDeeds.length === 0 ? (
                  <div className="text-center py-10">
                    <div className="bg-gray-100 rounded-full p-4 inline-flex mb-4">
                      <Camera className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">No deeds completed yet</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      Start your journey by finding and completing good deeds in your community.
                    </p>
                    <button
                      onClick={() => navigate('/location')}
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-md transition-colors"
                    >
                      Find Deeds
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {userDeeds.map(completedDeed => (
                      <div key={completedDeed.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className={`h-2 ${
                          completedDeed.deed.difficulty === 'easy' 
                            ? 'bg-green-500' 
                            : completedDeed.deed.difficulty === 'medium'
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                        }`} />
                        
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            {completedDeed.deed.title}
                          </h3>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                              completedDeed.deed.difficulty === 'easy'
                                ? 'bg-green-100 text-green-800'
                                : completedDeed.deed.difficulty === 'medium'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                            }`}>
                              {completedDeed.deed.difficulty.charAt(0).toUpperCase() + completedDeed.deed.difficulty.slice(1)}
                            </span>
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                              {completedDeed.deed.category.charAt(0).toUpperCase() + completedDeed.deed.category.slice(1)}
                            </span>
                            <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-0.5 rounded-full flex items-center">
                              <Award className="h-3 w-3 mr-1" />
                              {completedDeed.points} points
                            </span>
                          </div>
                          
                          <div className="flex items-center text-xs text-gray-500 mb-3">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>Completed on {formatDate(completedDeed.completedAt)}</span>
                          </div>
                          
                          <div className="aspect-w-16 aspect-h-9 mb-3 rounded-md overflow-hidden">
                            <img
                              src={completedDeed.photoUrl}
                              alt={`Completed deed: ${completedDeed.deed.title}`}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          
                          <div className="flex items-center text-xs text-gray-500">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>{completedDeed.deed.location}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
            
            {activeTab === 'stats' && (
              <>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Your Impact Statistics</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <div className="flex items-center mb-2">
                      <Award className="h-5 w-5 text-green-600 mr-2" />
                      <h3 className="text-lg font-semibold text-gray-800">Total Points</h3>
                    </div>
                    <p className="text-3xl font-bold text-green-600">{totalPoints}</p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <div className="flex items-center mb-2">
                      <Camera className="h-5 w-5 text-blue-600 mr-2" />
                      <h3 className="text-lg font-semibold text-gray-800">Deeds Completed</h3>
                    </div>
                    <p className="text-3xl font-bold text-blue-600">{totalDeeds}</p>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                    <div className="flex items-center mb-2">
                      <Clock className="h-5 w-5 text-purple-600 mr-2" />
                      <h3 className="text-lg font-semibold text-gray-800">Average Points</h3>
                    </div>
                    <p className="text-3xl font-bold text-purple-600">
                      {totalDeeds > 0 ? Math.round(totalPoints / totalDeeds) : 0}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Categories Breakdown */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Deeds by Category</h3>
                    {Object.keys(deedsByCategory).length > 0 ? (
                      <div className="space-y-3">
                        {Object.entries(deedsByCategory).map(([category, count]) => (
                          <div key={category} className="bg-white p-3 rounded-md border border-gray-100">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium text-gray-800">
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                              </span>
                              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                                {count} {count === 1 ? 'deed' : 'deeds'}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${(count / totalDeeds) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">Complete deeds to see category statistics.</p>
                    )}
                  </div>
                  
                  {/* Difficulty Breakdown */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Deeds by Difficulty</h3>
                    {Object.keys(deedsByDifficulty).length > 0 ? (
                      <div className="space-y-3">
                        {['easy', 'medium', 'hard'].map(difficulty => {
                          const count = deedsByDifficulty[difficulty] || 0;
                          const difficultyColor = {
                            easy: 'bg-green-600',
                            medium: 'bg-yellow-500',
                            hard: 'bg-red-500',
                          }[difficulty];
                          
                          const badgeColor = {
                            easy: 'bg-green-100 text-green-800',
                            medium: 'bg-yellow-100 text-yellow-800',
                            hard: 'bg-red-100 text-red-800',
                          }[difficulty];
                          
                          return (
                            <div key={difficulty} className="bg-white p-3 rounded-md border border-gray-100">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium text-gray-800">
                                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                                </span>
                                <span className={`${badgeColor} text-xs font-semibold px-2 py-0.5 rounded-full`}>
                                  {count} {count === 1 ? 'deed' : 'deeds'}
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`${difficultyColor} h-2 rounded-full`} 
                                  style={{ width: `${(count / totalDeeds) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-gray-500">Complete deeds to see difficulty statistics.</p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;