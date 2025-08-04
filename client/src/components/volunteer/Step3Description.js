import React, { useState } from 'react';
import { FiFileText, FiUser, FiMapPin } from 'react-icons/fi';

const Step3Description = ({ data, onNext, onPrev, onUpdate }) => {
  const [description, setDescription] = useState(data || '');
  const [charCount, setCharCount] = useState(description.length);

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescription(value);
    setCharCount(value.length);
  };

  const handleSubmit = () => {
    if (description.trim().length < 10) {
      alert('Please provide a description with at least 10 characters');
      return;
    }

    onUpdate(description);
    onNext();
  };

  const canProceed = description.trim().length >= 10;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Tell us about yourself
        </h2>
        <p className="text-gray-600">
          Please provide some information about yourself and your area. This helps us understand how you can contribute.
        </p>
      </div>

      <div className="space-y-6">
        {/* Description Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Tell us about yourself, your background, interests, and how you'd like to contribute to the community..."
            className="input resize-none"
            rows="6"
            maxLength="1000"
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-gray-500">
              Minimum 10 characters, maximum 1000 characters
            </p>
            <p className={`text-xs ${charCount > 900 ? 'text-red-500' : 'text-gray-500'}`}>
              {charCount}/1000
            </p>
          </div>
        </div>

        {/* Helpful Tips */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Helpful tips:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li className="flex items-start space-x-2">
              <FiUser className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>Mention your background, skills, or experience</span>
            </li>
            <li className="flex items-start space-x-2">
              <FiMapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>Describe your local area and community</span>
            </li>
            <li className="flex items-start space-x-2">
              <FiFileText className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>Share how you'd like to help or contribute</span>
            </li>
          </ul>
        </div>

        {/* Example Description */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Example:</h3>
          <p className="text-sm text-gray-600 italic">
            "I'm a retired teacher from Guntur, Andhra Pradesh. I have 25 years of experience in education and love working with children. 
            I'm passionate about community service and have organized several educational programs in my area. 
            I'm available during weekdays and would like to help with educational initiatives or community outreach programs."
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={onPrev}
            className="btn btn-secondary"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canProceed}
            className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue to Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step3Description; 