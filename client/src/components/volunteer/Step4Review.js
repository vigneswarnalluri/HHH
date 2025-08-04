import React, { useState } from 'react';
import { FiUser, FiMapPin, FiFileText, FiCheckCircle } from 'react-icons/fi';
import axios from 'axios';
import toast from 'react-hot-toast';

const Step4Review = ({ formData, onPrev, onComplete }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Check if profile already exists and is complete
      const profileResponse = await axios.get('/api/volunteer/profile');
      const existingProfile = profileResponse.data.profile;
      
      if (existingProfile && existingProfile.is_complete) {
        toast.error('Profile has already been submitted');
        onComplete();
        return;
      }

      // Only submit steps if they haven't been completed yet
      if (!existingProfile || !existingProfile.aadhaar) {
        await axios.post('/api/volunteer/profile/step1', {
          aadhaar: formData.aadhaar,
          phoneIfNoAadhaar: formData.aadhaar.phoneIfNoAadhaar
        });
      }

      if (!existingProfile || !existingProfile.location) {
        await axios.post('/api/volunteer/profile/step2', {
          location: formData.location
        });
      }

      if (!existingProfile || !existingProfile.description) {
        await axios.post('/api/volunteer/profile/step3', {
          description: formData.description
        });
      }

      // Final submission
      const submitResponse = await axios.post('/api/volunteer/profile/submit');
      
      if (submitResponse.data.message) {
        toast.success('Profile submitted successfully!');
        onComplete();
      } else {
        toast.error('Failed to submit profile');
      }
    } catch (error) {
      console.error('Submission error:', error);
      
      // Handle specific error cases
      if (error.response?.data?.error === 'Profile already submitted') {
        toast.error('Profile has already been submitted');
        onComplete();
      } else if (error.response?.data?.error === 'Profile is incomplete') {
        toast.error('Please complete all required information before submitting');
      } else {
        toast.error(error.response?.data?.error || 'Failed to submit profile');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getAadhaarStatusText = (status) => {
    switch (status) {
      case 'yes': return 'Yes, I have an Aadhaar card';
      case 'no': return 'No, I don\'t have an Aadhaar card';
      case 'unknown': return 'I\'m not sure';
      default: return 'Not specified';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Review Your Information
        </h2>
        <p className="text-gray-600">
          Please review all the information you've provided before submitting your profile.
        </p>
      </div>

      <div className="space-y-6">
        {/* Aadhaar Information */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <FiUser className="w-5 h-5 mr-2" />
              Aadhaar Information
            </h3>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Status:</span>
              <span className="text-sm font-medium">
                {getAadhaarStatusText(formData.aadhaar?.status)}
              </span>
            </div>
            
            {formData.aadhaar?.photoUrl && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Photo:</span>
                <span className="text-sm font-medium text-green-600">✓ Uploaded</span>
              </div>
            )}
            
            {formData.aadhaar?.status === 'no' && formData.aadhaar?.phoneIfNoAadhaar && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Phone Number:</span>
                <span className="text-sm font-medium">{formData.aadhaar.phoneIfNoAadhaar}</span>
              </div>
            )}
          </div>
        </div>

        {/* Location Information */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <FiMapPin className="w-5 h-5 mr-2" />
              Location Information
            </h3>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
          
          <div className="space-y-2">
            {formData.location?.coordinates && (
              <>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Longitude:</span>
                  <span className="text-sm font-medium">
                    {formData.location.coordinates[0].toFixed(6)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Latitude:</span>
                  <span className="text-sm font-medium">
                    {formData.location.coordinates[1].toFixed(6)}
                  </span>
                </div>
              </>
            )}
            
            {formData.location?.address && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Address:</span>
                <span className="text-sm font-medium max-w-xs text-right">
                  {formData.location.address}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <FiFileText className="w-5 h-5 mr-2" />
              Description
            </h3>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm text-gray-700">
              {formData.description || 'No description provided'}
            </p>
          </div>
        </div>

        {/* Submission Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <FiCheckCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-blue-900 mb-1">
                Ready to Submit
              </h3>
              <p className="text-sm text-blue-800">
                By clicking "Submit Profile", you confirm that all the information provided is accurate and complete. 
                You can update your profile later if needed.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={onPrev}
            disabled={isSubmitting}
            className="btn btn-secondary disabled:opacity-50"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="btn btn-primary flex items-center space-x-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <FiCheckCircle className="w-4 h-4" />
                <span>Submit Profile</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step4Review; 