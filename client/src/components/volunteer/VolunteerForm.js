import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Step1Aadhaar from './Step1Aadhaar';
import Step2Location from './Step2Location';
import Step3Description from './Step3Description';
import Step4Review from './Step4Review';
import { FiUser, FiMapPin, FiFileText, FiCheckCircle } from 'react-icons/fi';

const VolunteerForm = () => {
  const { user, logout } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    aadhaar: null,
    location: null,
    description: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const steps = [
    { id: 1, title: 'Aadhaar Information', icon: FiUser },
    { id: 2, title: 'Location', icon: FiMapPin },
    { id: 3, title: 'Description', icon: FiFileText },
    { id: 4, title: 'Review & Submit', icon: FiCheckCircle }
  ];

  const updateFormData = (step, data) => {
    setFormData(prev => ({
      ...prev,
      [step]: data
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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Aadhaar
            data={formData.aadhaar}
            onNext={nextStep}
            onUpdate={(data) => updateFormData('aadhaar', data)}
          />
        );
      case 2:
        return (
          <Step2Location
            data={formData.location}
            onNext={nextStep}
            onPrev={prevStep}
            onUpdate={(data) => updateFormData('location', data)}
          />
        );
      case 3:
        return (
          <Step3Description
            data={formData.description}
            onNext={nextStep}
            onPrev={prevStep}
            onUpdate={(data) => updateFormData('description', data)}
          />
        );
      case 4:
        return (
          <Step4Review
            formData={formData}
            onPrev={prevStep}
            onComplete={() => {
              setIsLoading(true);
              // Handle form completion
              setTimeout(() => {
                setIsLoading(false);
                // Redirect to survey dashboard after successful profile completion
                window.location.href = '/volunteer/surveys';
              }, 2000);
            }}
          />
        );
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
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Volunteer Portal
              </h1>
              <p className="text-sm text-gray-600">
                Welcome, {user?.email}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.location.href = '/volunteer/surveys'}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Survey Dashboard
              </button>
              <button
                onClick={() => window.location.href = '/volunteer/survey/new'}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                New Survey
              </button>
              <button
                onClick={logout}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Sign out
              </button>
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
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Processing your submission...</p>
              </div>
            </div>
          ) : (
            renderStep()
          )}
        </div>
      </div>
    </div>
  );
};

export default VolunteerForm; 