import React from 'react';
import { Link } from 'react-router-dom';
import {Github} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">ComQuest</h3>
            <p className="text-gray-300">Turning everyday kindness into an adventure.</p>
            <div className="flex space-x-4">
              // my tuff github
              <a href="https://github.com/atharvaru" className="text-gray-300 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/location" className="text-gray-300 hover:text-white transition-colors">
                  Find Deeds
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-gray-300 hover:text-white transition-colors">
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>
          
          
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            // 100% copy righed
            &copy; {new Date().getFullYear()} ComQuest. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0 text-gray-400 text-sm">

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;