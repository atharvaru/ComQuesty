import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Clock, Award, ArrowLeft, Check, Camera } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import ImageUpload from '../components/ImageUpload';

const DeedDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { deeds, user, completeDeed } = useAppContext();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const deed = deeds.find(d => d.id === id);

  if (!deed) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Deed not found</h1>
        <p className="text-gray-600 mb-6">The deed you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => navigate('/deeds')}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-md transition-colors inline-flex items-center"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Deeds
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Please log in</h1>
        <p className="text-gray-600 mb-6">You need to be logged in to complete deeds.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-md transition-colors"
        >
          Log In to Continue
        </button>
      </div>
    );
  }

  const difficultyColor = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800',
  }[deed.difficulty];

  const handleImageSelect = (dataUrl: string) => {
    setSelectedImage(dataUrl);
  };

  const handleSubmit = () => {
    if (!selectedImage) return;
    
    setIsSubmitting(true);
    

    setTimeout(() => {
      completeDeed(deed.id, selectedImage);
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Redirect after showing success message
      setTimeout(() => {
        navigate('/profile');
      }, 3000);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/deeds')}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back to Deeds
      </button>
      
      {isSubmitted ? (
        <div className="max-w-2xl mx-auto bg-green-50 p-8 rounded-lg text-center">
          <div className="bg-green-100 rounded-full p-4 inline-flex mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Deed Completed!</h2>
          <p className="text-gray-700 mb-2">
            Thank you for making a difference! You've earned {deed.points} points.
          </p>
          <p className="text-gray-600 mb-6">
            You'll be redirected to your profile to see your updated score...
          </p>
          <div className="inline-block animate-pulse">
            <div className="w-8 h-1 bg-green-300 mx-auto rounded-full"></div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-3 bg-green-600"></div>
              <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{deed.title}</h1>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`text-sm font-semibold px-3 py-1 rounded-full ${difficultyColor}`}>
                    {deed.difficulty.charAt(0).toUpperCase() + deed.difficulty.slice(1)}
                  </span>
                  <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                    {deed.category.charAt(0).toUpperCase() + deed.category.slice(1)}
                  </span>
                </div>
                
                <div className="flex flex-wrap items-center text-gray-600 mb-6 gap-6">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-gray-500" />
                    <span>{deed.estimatedTime}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                    <span>{deed.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-5 h-5 mr-2 text-purple-600" />
                    <span className="font-medium text-purple-600">{deed.points} points</span>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
                  <p className="text-gray-700 mb-4">{deed.description}</p>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">How to Complete</h2>
                  <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                    <li>Read the description carefully to understand what is needed.</li>
                    <li>Gather any supplies or materials you might need.</li>
                    <li>Complete the deed as described.</li>
                    <li>Take a clear photo showing your completed deed.</li>
                    <li>Upload the photo to verify your completion.</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Complete This Deed</h2>
              
              <div className="mb-6">
                <p className="text-gray-700 mb-2">
                  Ready to make a difference? Take a photo showing your completed deed.
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Your photo helps verify completion and inspires others to join in.
                </p>
                
                <ImageUpload onImageSelect={handleImageSelect} />
              </div>
              
              <button
                onClick={handleSubmit}
                disabled={!selectedImage || isSubmitting}
                className={`w-full flex justify-center items-center py-3 px-4 rounded-md font-semibold transition-colors ${
                  !selectedImage
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Camera className="mr-2 h-5 w-5" />
                    {selectedImage ? 'Submit Completion' : 'Upload a Photo'}
                  </>
                )}
              </button>
              
              <div className="mt-6 bg-purple-50 p-4 rounded-md border border-purple-100">
                <div className="flex items-center">
                  <Award className="h-6 w-6 text-purple-600 mr-2" />
                  <p className="text-sm font-medium text-purple-800">
                    You'll earn {deed.points} points for completing this deed!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeedDetailPage;