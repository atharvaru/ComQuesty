import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Menu, X, MapPin, Award, User } from 'lucide-react';

const Header: React.FC = () => {
  const { user } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };
 
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-green-600 to-green-500 shadow-md transition-all duration-300">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <MapPin className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-xl font-bold text-white">ComQuest</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/location"
              className={`text-white hover:text-green-100 transition-colors ${
                isActive('/location') ? 'font-semibold border-b-2 border-white pb-1' : ''
              }`}
            >
              Find Deeds
            </Link>
            <Link
              to="/leaderboard"
              className={`text-white hover:text-green-100 transition-colors ${
                isActive('/leaderboard') ? 'font-semibold border-b-2 border-white pb-1' : ''
              }`}
            >
              Leaderboard
            </Link>
            {user ? (
              <Link
                to="/profile"
                className="flex items-center space-x-2 bg-white text-green-600 rounded-full py-1 px-3 hover:bg-green-50 transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="font-medium">{user.username}</span>
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                  {user.points} pts
                </span>
              </Link>
            ) : (
              <Link
                to="/"
                className="bg-white text-green-600 font-semibold py-2 px-4 rounded-full hover:bg-green-50 transition-colors"
              >
                Start Quest
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col space-y-4">
            <Link
              to="/location"
              className="text-white hover:text-green-100 transition-colors py-2"
              onClick={closeMenu}
            >
              Find Deeds
            </Link>
            <Link
              to="/leaderboard"
              className="text-white hover:text-green-100 transition-colors py-2"
              onClick={closeMenu}
            >
              Leaderboard
            </Link>
            {user ? (
              <Link
                to="/profile"
                className="flex items-center space-x-2 bg-white text-green-600 rounded-full py-2 px-3 hover:bg-green-50 transition-colors"
                onClick={closeMenu}
              >
                <User className="w-4 h-4" />
                <span className="font-medium">{user.username}</span>
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                  {user.points} pts
                </span>
              </Link>
            ) : (
              <Link
                to="/"
                className="bg-white text-green-600 font-semibold py-2 px-4 rounded-full hover:bg-green-50 transition-colors"
                onClick={closeMenu}
              >
                Start Quest
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;