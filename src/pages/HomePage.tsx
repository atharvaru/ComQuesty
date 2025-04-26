import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Award, Camera, LogIn } from 'lucide-react';
import LoginForm from '../components/LoginForm';
import { useAppContext } from '../context/AppContext';

const HomePage: React.FC = () => {
  const { user } = useAppContext();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-500 py-16 md:py-24">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-white mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Make a Difference in Your Community
            </h1>
            <p className="text-xl mb-8 text-green-50">
              ComQuest turns good deeds into adventures. Complete quests, earn points, and compete with others while making the world a better place.
            </p>
            
            {!user ? (
              <LoginForm />
            ) : (
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/location"
                  className="bg-white text-green-600 font-semibold py-3 px-6 rounded-md hover:bg-green-50 transition-colors inline-flex items-center justify-center"
                >
                  <MapPin className="mr-2 h-5 w-5" />
                  Find Deeds
                </Link>
                <Link
                  to="/leaderboard"
                  className="bg-green-700 text-white font-semibold py-3 px-6 rounded-md hover:bg-green-800 transition-colors inline-flex items-center justify-center"
                >
                  <Award className="mr-2 h-5 w-5" />
                  View Leaderboard
                </Link>
              </div>
            )}
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-green-200 rounded-lg transform rotate-3"></div>
              <img
                src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="People helping in the community"
                className="relative rounded-lg shadow-xl transform -rotate-2 hover:rotate-0 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How ComQuest Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
              <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">1. Find Local Quests</h3>
              <p className="text-gray-600">
                Enter your zip code to discover good deeds you can do in your area. From park cleanups to helping neighbors, there's something for everyone.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
              <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Camera className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">2. Complete & Document</h3>
              <p className="text-gray-600">
                Do your good deed and take a photo as proof. Your contribution makes a real impact in your community and earns you points based on difficulty.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
              <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">3. Earn & Compete</h3>
              <p className="text-gray-600">
                Earn points for each completed deed. Rise up the leaderboard and challenge others to make a bigger impact through friendly competition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Quests Preview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Featured Quests</h2>
            <Link to="/location" className="text-green-600 hover:text-green-700 font-semibold flex items-center">
              View All
              <svg className="ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sample quest cards - in a real app, these would be populated from data */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100">
              <div className="h-2 bg-green-500"></div>
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Clean up local park</h3>
                  <span className="text-2xl">🌳</span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  Help protect our planet by removing litter and debris. This will make a real difference in our community!
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">Easy</span>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">Environment</span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-500">30 min • Anywhere</span>
                  <span className="font-medium text-purple-600">15 points</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100">
              <div className="h-2 bg-yellow-500"></div>
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Help at food bank</h3>
                  <span className="text-2xl">🏘️</span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  Make our community stronger by supporting local initiatives. Your help will be greatly appreciated by everyone.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">Medium</span>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">Community</span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-500">2 hours • Food Banks</span>
                  <span className="font-medium text-purple-600">30 points</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100">
              <div className="h-2 bg-red-500"></div>
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Organize a workshop</h3>
                  <span className="text-2xl">📚</span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  Share knowledge and skills with your community. This is a perfect opportunity to use your skills for good.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded-full">Hard</span>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">Education</span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-500">4 hours • Community Centers</span>
                  <span className="font-medium text-purple-600">50 points</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link
              to={user ? "/location" : "/"}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-md transition-colors inline-flex items-center"
            >
              {user ? (
                <>
                  <MapPin className="mr-2 h-5 w-5" />
                  Find Deeds Near You
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" />
                  Join the Quest
                </>
              )}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;