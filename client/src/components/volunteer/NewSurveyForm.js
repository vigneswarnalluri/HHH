import React, { useState } from 'react';
import { FiUser, FiMapPin, FiCamera, FiCheckCircle, FiArrowLeft } from 'react-icons/fi';
import { apiPost } from '../../utils/api';

const NewSurveyForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    beggar_name: '',
    beggar_age: '',
    beggar_gender: '',
    beggar_photo: null,
    location_coordinates: null,
    location_address: '',
    survey_notes: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const steps = [
    { id: 1, title: 'Beggar Details', icon: FiUser },
    { id: 2, title: 'Location', icon: FiMapPin },
    { id: 3, title: 'Photo & Notes', icon: FiCamera },
    { id: 4, title: 'Review & Submit', icon: FiCheckCircle }
  ];

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          updateFormData('location_coordinates', [latitude, longitude]);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please enter coordinates manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateFormData('beggar_photo', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const surveyData = {
        beggar_name: formData.beggar_name || undefined,
        beggar_age: formData.beggar_age ? parseInt(formData.beggar_age) : undefined,
        beggar_gender: formData.beggar_gender || undefined,
        beggar_photo_url: formData.beggar_photo || undefined,
        location_coordinates: formData.location_coordinates,
        location_address: formData.location_address || undefined,
        survey_notes: formData.survey_notes || undefined
      };

      // Debug: Log the survey data
      console.log('🔍 Debug: Survey data:', surveyData);

      const result = await apiPost('/api/volunteer/surveys', surveyData);
      console.log('🔍 Debug: Success result:', result);
      alert('Survey created successfully!');
      window.location.href = '/volunteer/surveys';
    } catch (error) {
      console.error('Error creating survey:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Beggar Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name (if known)
            </label>
            <input
              type="text"
              value={formData.beggar_name}
              onChange={(e) => updateFormData('beggar_name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter name if known"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age (if known)
            </label>
            <input
              type="number"
              value={formData.beggar_age}
              onChange={(e) => updateFormData('beggar_age', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter age"
              min="0"
              max="120"
            />
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender
          </label>
          <select
            value={formData.beggar_gender}
            onChange={(e) => updateFormData('beggar_gender', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={nextStep}
          className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700"
        >
          Next
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Location Information</h3>
        
        <div className="mb-4">
          <button
            type="button"
            onClick={getCurrentLocation}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mb-4"
          >
            Get Current Location
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Latitude
            </label>
            <input
              type="number"
              step="any"
              value={formData.location_coordinates ? formData.location_coordinates[0] : ''}
              onChange={(e) => {
                const lat = parseFloat(e.target.value);
                const lng = formData.location_coordinates ? formData.location_coordinates[1] : null;
                updateFormData('location_coordinates', lng !== null ? [lat, lng] : null);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter latitude"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Longitude
            </label>
            <input
              type="number"
              step="any"
              value={formData.location_coordinates ? formData.location_coordinates[1] : ''}
              onChange={(e) => {
                const lng = parseFloat(e.target.value);
                const lat = formData.location_coordinates ? formData.location_coordinates[0] : null;
                updateFormData('location_coordinates', lat !== null ? [lat, lng] : null);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter longitude"
            />
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address (optional)
          </label>
          <textarea
            value={formData.location_address}
            onChange={(e) => updateFormData('location_address', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            rows="3"
            placeholder="Enter address or landmark"
          />
        </div>
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400"
        >
          Previous
        </button>
        <button
          onClick={nextStep}
          disabled={!formData.location_coordinates}
          className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Photo & Additional Notes</h3>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Photo (optional)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
              id="photo-upload"
            />
            <label htmlFor="photo-upload" className="cursor-pointer">
              {formData.beggar_photo ? (
                <div>
                  <img
                    src={formData.beggar_photo}
                    alt="Uploaded"
                    className="w-32 h-32 object-cover rounded-lg mx-auto mb-2"
                  />
                  <p className="text-sm text-gray-600">Click to change photo</p>
                </div>
              ) : (
                <div>
                  <FiCamera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload photo</p>
                </div>
              )}
            </label>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Notes (optional)
          </label>
          <textarea
            value={formData.survey_notes}
            onChange={(e) => updateFormData('survey_notes', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            rows="4"
            placeholder="Enter any additional observations or notes..."
          />
        </div>
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400"
        >
          Previous
        </button>
        <button
          onClick={nextStep}
          className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700"
        >
          Next
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Review & Submit</h3>
        
        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <div>
            <h4 className="font-medium text-gray-900">Beggar Information</h4>
            <p className="text-sm text-gray-600">
              Name: {formData.beggar_name || 'Not provided'}<br/>
              Age: {formData.beggar_age || 'Not provided'}<br/>
              Gender: {formData.beggar_gender || 'Not provided'}
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900">Location</h4>
            <p className="text-sm text-gray-600">
              Coordinates: {formData.location_coordinates ? 
                `${formData.location_coordinates[0].toFixed(6)}, ${formData.location_coordinates[1].toFixed(6)}` : 
                'Not provided'}<br/>
              Address: {formData.location_address || 'Not provided'}
            </p>
          </div>
          
          {formData.beggar_photo && (
            <div>
              <h4 className="font-medium text-gray-900">Photo</h4>
              <img
                src={formData.beggar_photo}
                alt="Beggar"
                className="w-32 h-32 object-cover rounded-lg"
              />
            </div>
          )}
          
          {formData.survey_notes && (
            <div>
              <h4 className="font-medium text-gray-900">Notes</h4>
              <p className="text-sm text-gray-600">{formData.survey_notes}</p>
            </div>
          )}
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}
      
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400"
        >
          Previous
        </button>
        <button
          onClick={handleSubmit}
          disabled={isLoading || !formData.location_coordinates}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Submitting...' : 'Submit Survey'}
        </button>
      </div>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button
                onClick={() => window.location.href = '/volunteer/surveys'}
                className="mr-4 text-gray-600 hover:text-gray-900"
              >
                <FiArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  New Survey
                </h1>
                <p className="text-sm text-gray-600">
                  Create a new survey for a beggar
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Stepper */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    isActive 
                      ? 'border-primary-600 bg-primary-600 text-white'
                      : isCompleted
                      ? 'border-green-600 bg-green-600 text-white'
                      : 'border-gray-300 bg-white text-gray-400'
                  }`}>
                    {isCompleted ? (
                      <FiCheckCircle className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${
                      isActive ? 'text-primary-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-4 ${
                      isCompleted ? 'bg-green-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="card">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default NewSurveyForm; 