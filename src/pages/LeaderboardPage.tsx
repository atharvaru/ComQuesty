import React, { useState } from 'react';
import { Award, ChevronUp, ChevronDown, Search, Trophy } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const LeaderboardPage: React.FC = () => {
  const { leaderboard, user } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'points' | 'username' | 'completedDeeds'>('points');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleSort = (column: 'points' | 'username' | 'completedDeeds') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const sortedAndFilteredLeaderboard = leaderboard
    .filter(entry => 
      entry.username.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'username') {
        return sortOrder === 'asc' 
          ? a.username.localeCompare(b.username)
          : b.username.localeCompare(a.username);
      } else {
        return sortOrder === 'asc'
          ? a[sortBy] - b[sortBy]
          : b[sortBy] - a[sortBy];
      }
    });

  const currentUserRank = leaderboard.findIndex(u => user && u.id === user.id) + 1;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
              <Trophy className="h-8 w-8 text-yellow-500 mr-2" />
              Leaderboard
            </h1>
            <p className="text-gray-600">
              See who's making the biggest impact in our community.
            </p>
          </div>
          
          {user && currentUserRank > 0 && (
            <div className="mt-4 sm:mt-0 bg-green-50 p-3 rounded-lg border border-green-100">
              <p className="text-green-800 font-medium">
                Your Rank: <span className="font-bold">{currentUserRank}</span>
              </p>
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
                placeholder="Search by username..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                    Rank
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('username')}
                  >
                    <div className="flex items-center">
                      User
                      {sortBy === 'username' && (
                        sortOrder === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('completedDeeds')}
                  >
                    <div className="flex items-center">
                      Deeds
                      {sortBy === 'completedDeeds' && (
                        sortOrder === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('points')}
                  >
                    <div className="flex items-center">
                      Points
                      {sortBy === 'points' && (
                        sortOrder === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedAndFilteredLeaderboard.map((entry, index) => {
                  const isCurrentUser = user && entry.id === user.id;
                  const rank = leaderboard.findIndex(u => u.id === entry.id) + 1;
                  
                  let rankDisplay;
                  if (rank === 1) {
                    rankDisplay = <span className="text-yellow-500 font-bold">1st</span>;
                  } else if (rank === 2) {
                    rankDisplay = <span className="text-gray-400 font-bold">2nd</span>;
                  } else if (rank === 3) {
                    rankDisplay = <span className="text-amber-600 font-bold">3rd</span>;
                  } else {
                    rankDisplay = <span>{rank}th</span>;
                  }
                  
                  return (
                    <tr 
                      key={entry.id}
                      className={`${isCurrentUser ? 'bg-green-50' : index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {rankDisplay}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                            <span className="text-lg text-green-600">
                              {entry.username.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {entry.username}
                              {isCurrentUser && (
                                <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">
                                  You
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {entry.completedDeeds}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm font-semibold text-purple-600">
                          <Award className="h-4 w-4 mr-1" />
                          {entry.points.toLocaleString()}
                        </div>
                      </td>
                    </tr>
                  );
                })}
                
                {sortedAndFilteredLeaderboard.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                      No results found for "{searchTerm}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-8 bg-green-50 p-6 rounded-lg border border-green-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">How Scoring Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-md shadow-sm">
              <div className="inline-block bg-green-100 p-2 rounded-full mb-3">
                <div className="h-4 w-16 bg-green-500 rounded-full"></div>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-1">Easy Deeds</h3>
              <p className="text-gray-600 text-sm">10-15 points</p>
              <p className="text-gray-600 mt-2 text-sm">
                Quick tasks that make a small but meaningful impact.
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-md shadow-sm">
              <div className="inline-block bg-yellow-100 p-2 rounded-full mb-3">
                <div className="h-4 w-16 bg-yellow-500 rounded-full"></div>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-1">Medium Deeds</h3>
              <p className="text-gray-600 text-sm">25-35 points</p>
              <p className="text-gray-600 mt-2 text-sm">
                More involved tasks requiring additional time and effort.
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-md shadow-sm">
              <div className="inline-block bg-red-100 p-2 rounded-full mb-3">
                <div className="h-4 w-16 bg-red-500 rounded-full"></div>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-1">Hard Deeds</h3>
              <p className="text-gray-600 text-sm">50-70 points</p>
              <p className="text-gray-600 mt-2 text-sm">
                Challenging tasks with significant community impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;