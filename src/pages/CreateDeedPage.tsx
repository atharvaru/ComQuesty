import React from 'react';
import { PlusCircle } from 'lucide-react';
import CreateDeedForm from '../components/CreateDeedForm';

const CreateDeedPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <div className="bg-green-100 rounded-full p-2 mr-3">
            <PlusCircle className="h-6 w-6 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Create a New Deed</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <CreateDeedForm />
        </div>

        <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Guidelines for Creating Deeds</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Be specific about what needs to be done and how to complete the deed
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Choose an appropriate difficulty level based on time, effort, and complexity
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Provide clear location details to help others find where the deed needs to be done
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Ensure the deed benefits the community and is safe to complete
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateDeedPage;