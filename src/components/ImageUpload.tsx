import React, { useState } from 'react';
import { Camera, Upload, X, Check } from 'lucide-react';

interface ImageUploadProps {
  onImageSelect: (dataUrl: string) => void; // Callback function to handle the selected image
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // State to store the selected image
  const [isDragging, setIsDragging] = useState(false); // State to track drag-and-drop interaction

  // Handles file input change event
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the first selected file
    if (file) {
      processFile(file); // Process the selected file
    }
  };

  // Reads the file and converts it to a data URL
  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string; // Get the file's data URL
      setSelectedImage(result); // Update the selected image state
      onImageSelect(result); // Trigger the callback with the image data URL
    };
    reader.readAsDataURL(file); // Read the file as a data URL
  };

  // Handles drag-over event to indicate dragging state
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevent default behavior
    setIsDragging(true); // Set dragging state to true
  };

  // Handles drag-leave event to reset dragging state
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevent default behavior
    setIsDragging(false); // Set dragging state to false
  };

  // Handles drop event to process the dropped file
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevent default behavior
    setIsDragging(false); // Reset dragging state

    const file = e.dataTransfer.files?.[0]; // Get the first dropped file
    if (file && file.type.startsWith('image/')) {
      processFile(file); // Process the dropped file if it's an image
    }
  };


  const removeImage = () => {
    setSelectedImage(null); 
  };

  return (
    <div className="w-full">
      {!selectedImage ? (
        <div
          className={`border-2 border-dashed ${
            isDragging ? 'border-green-500 bg-green-50' : 'border-gray-300'
          } rounded-lg p-6 transition-colors duration-200 cursor-pointer`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('fileInput')?.click()}
        >
          <div className="flex flex-col items-center text-center">
            <div className="mb-3 bg-green-100 p-3 rounded-full">
              <Camera className="h-8 w-8 text-green-600" />
            </div>
            <p className="mb-2 text-sm font-semibold text-gray-700">
              Drag and drop your image, or click to select
            </p>
            <p className="text-xs text-gray-500">PNG, JPG or JPEG (max 5MB)</p>
          </div>
          <input
            id="fileInput"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="rounded-lg overflow-hidden relative">
          <img 
            src={selectedImage} 
            alt="Selected preview" 
            className="w-full h-auto object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
              onClick={removeImage}
              className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors"
              aria-label="Remove image"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-2 flex justify-between items-center p-2 bg-green-50 rounded">
            <div className="flex items-center">
              <Check className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-sm text-green-800">Image selected</span>
            </div>
            <button 
              className="text-xs text-blue-600 hover:text-blue-800"
              onClick={() => document.getElementById('fileInput')?.click()}
            >
              Change
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;