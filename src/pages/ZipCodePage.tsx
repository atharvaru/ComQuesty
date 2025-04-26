import React from 'react';
import ZipCodeForm from '../components/ZipCodeForm';
import { MapPin } from 'lucide-react';

const ZipCodePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
          <MapPin className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Find Deeds In Your Area</h1>
        <p className="text-gray-600 text-lg">
          Enter your zip code and we'll show you opportunities to make a positive impact in your community.
        </p>
      </div>
      
      <div className="flex justify-center">
        <ZipCodeForm />
      </div>
      
      <div className="mt-16 max-w-3xl mx-auto bg-green-50 rounded-lg p-6 border border-green-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Why Your Location Matters</h2>
        <p className="text-gray-700 mb-4">
          ComQuest uses your zip code to find meaningful opportunities for you to help your local community. 
          We focus on connecting you with needs that are close to home, where your impact can be felt directly.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-green-100 rounded-full p-2 mr-3">
              <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800">Community Focus</h3>
              <p className="text-gray-600">Find ways to help that directly impact your neighborhood and those around you.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-green-100 rounded-full p-2 mr-3">
              <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800">Practical Impact</h3>
              <p className="text-gray-600">We suggest deeds that are actually needed in your specific location.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-green-100 rounded-full p-2 mr-3">
              <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800">Convenience</h3>
              <p className="text-gray-600">Find opportunities that fit into your daily routine without extensive travel.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-green-100 rounded-full p-2 mr-3">
              <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800">Local Network</h3>
              <p className="text-gray-600">Connect with others in your area who are also making a difference.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZipCodePage;