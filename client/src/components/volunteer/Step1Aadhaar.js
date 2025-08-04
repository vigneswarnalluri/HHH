import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiX, FiCheck } from 'react-icons/fi';
import axios from 'axios';
import toast from 'react-hot-toast';

const Step1Aadhaar = ({ data, onNext, onUpdate }) => {
  const [uploadedFile, setUploadedFile] = useState(data?.photoUrl ? { url: data.photoUrl } : null);
  const [isUploading, setIsUploading] = useState(false);
  const [aadhaarStatus, setAadhaarStatus] = useState(data?.status || '');
  const [phoneNumber, setPhoneNumber] = useState(data?.phoneIfNoAadhaar || '');

  const {
    handleSubmit
  } = useForm({
    mode: 'onChange'
  });

  const onDrop = async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('aadhaarPhoto', file);

      const response = await axios.post('/api/upload/aadhaar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setUploadedFile({
        name: file.name,
        size: file.size,
        url: response.data.file.url
      });

      toast.success('File uploaded successfully!');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false
  });

  const removeFile = () => {
    setUploadedFile(null);
  };

  const handleStatusChange = (status) => {
    setAadhaarStatus(status);
    if (status !== 'no') {
      setPhoneNumber('');
    }
  };

  const onSubmit = (formData) => {
    const stepData = {
      photoUrl: uploadedFile?.url,
      status: aadhaarStatus,
      phoneIfNoAadhaar: aadhaarStatus === 'no' ? phoneNumber : undefined
    };

    onUpdate(stepData);
    onNext();
  };

  const canProceed = uploadedFile && aadhaarStatus && (aadhaarStatus !== 'no' || phoneNumber);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Aadhaar Information
        </h2>
        <p className="text-gray-600">
          Please upload your Aadhaar card photo and confirm your status.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Aadhaar Card Photo
          </label>
          
          {!uploadedFile ? (
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? 'border-primary-400 bg-primary-50'
                  : 'border-gray-300 hover:border-primary-400'
              }`}
            >
              <input {...getInputProps()} />
              <FiUpload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              {isUploading ? (
                <div className="space-y-2">
                  <div className="w-6 h-6 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto"></div>
                  <p className="text-sm text-gray-600">Uploading...</p>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-600">
                    {isDragActive
                      ? 'Drop the file here'
                      : 'Drag and drop your Aadhaar photo here, or click to select'}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    JPEG, PNG up to 5MB
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <FiCheck className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {uploadedFile.name || 'Aadhaar photo uploaded'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {uploadedFile.size ? `${(uploadedFile.size / 1024 / 1024).toFixed(2)} MB` : 'File uploaded'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Aadhaar Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Do you have an Aadhaar card?
          </label>
          <div className="space-y-3">
            {[
              { value: 'yes', label: 'Yes, I have an Aadhaar card' },
              { value: 'no', label: 'No, I don\'t have an Aadhaar card' },
              { value: 'unknown', label: 'I\'m not sure' }
            ].map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="radio"
                  name="aadhaarStatus"
                  value={option.value}
                  checked={aadhaarStatus === option.value}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <span className="ml-3 text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Phone Number (if Aadhaar = No) */}
        {aadhaarStatus === 'no' && (
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your 10-digit phone number"
              className="input"
              pattern="[0-9]{10}"
              maxLength="10"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Phone number is required when you don't have an Aadhaar card
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-end pt-6">
          <button
            type="submit"
            disabled={!canProceed || isUploading}
            className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue to Location
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step1Aadhaar; 