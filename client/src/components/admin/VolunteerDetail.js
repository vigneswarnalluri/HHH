import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiUser, FiMapPin, FiFileText, FiCheckCircle, FiX, FiEdit } from 'react-icons/fi';
import { format } from 'date-fns';
import axios from 'axios';
import LoadingSpinner from '../common/LoadingSpinner';

const VolunteerDetail = () => {
  const { id } = useParams();
  const [volunteer, setVolunteer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVolunteer = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/admin/volunteers/${id}`);
        setVolunteer(response.data.volunteer);
      } catch (error) {
        console.error('Error fetching volunteer:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchVolunteer();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!volunteer) {
    return (
      <div className="text-center py-12">
        <FiX className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Volunteer not found</h3>
        <p className="mt-1 text-sm text-gray-500">
          The volunteer you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link
            to="/admin/volunteers"
            className="btn btn-primary"
          >
            Back to Volunteers
          </Link>
        </div>
      </div>
    );
  }

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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/admin/volunteers"
            className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>Back to Volunteers</span>
          </Link>
          <h2 className="text-2xl font-bold text-gray-900">
            Volunteer Profile
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* User Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FiUser className="w-6 h-6 text-primary-600" />
              <h3 className="text-lg font-medium text-gray-900">User Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-sm text-gray-900">{volunteer.userId?.email}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <p className="mt-1 text-sm text-gray-900">
                  {volunteer.userId?.phone || 'Not provided'}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <p className="mt-1 text-sm text-gray-900 capitalize">{volunteer.userId?.role}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Login</label>
                <p className="mt-1 text-sm text-gray-900">
                  {volunteer.userId?.lastLogin ? format(new Date(volunteer.userId.lastLogin), 'MMM dd, yyyy HH:mm') : 'Never'}
                </p>
              </div>
            </div>
          </div>

          {/* Aadhaar Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FiCheckCircle className="w-6 h-6 text-primary-600" />
              <h3 className="text-lg font-medium text-gray-900">Aadhaar Information</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <p className="mt-1 text-sm text-gray-900">
                  {getAadhaarStatusText(volunteer.aadhaar?.status)}
                </p>
              </div>
              
              {volunteer.aadhaar?.photoUrl && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Photo</label>
                  <img
                    src={volunteer.aadhaar.photoUrl}
                    alt="Aadhaar card"
                    className="w-32 h-20 object-cover rounded-lg border border-gray-200"
                  />
                </div>
              )}
              
              {volunteer.aadhaar?.status === 'no' && volunteer.phoneIfNoAadhaar && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone (if no Aadhaar)</label>
                  <p className="mt-1 text-sm text-gray-900">{volunteer.phoneIfNoAadhaar}</p>
                </div>
              )}
            </div>
          </div>

          {/* Location Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FiMapPin className="w-6 h-6 text-primary-600" />
              <h3 className="text-lg font-medium text-gray-900">Location Information</h3>
            </div>
            
            <div className="space-y-4">
              {volunteer.location?.coordinates && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Longitude</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {volunteer.location.coordinates[0].toFixed(6)}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Latitude</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {volunteer.location.coordinates[1].toFixed(6)}
                    </p>
                  </div>
                </div>
              )}
              
              {volunteer.location?.address && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <p className="mt-1 text-sm text-gray-900">{volunteer.location.address}</p>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FiFileText className="w-6 h-6 text-primary-600" />
              <h3 className="text-lg font-medium text-gray-900">Description</h3>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                {volunteer.description || 'No description provided'}
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Status */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Status</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Profile Complete</span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  volunteer.isComplete ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {volunteer.isComplete ? 'Complete' : 'Incomplete'}
                </span>
              </div>
              
              {volunteer.submittedAt && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Submitted</span>
                  <span className="text-sm text-gray-900">
                    {format(new Date(volunteer.submittedAt), 'MMM dd, yyyy')}
                  </span>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Created</span>
                <span className="text-sm text-gray-900">
                  {format(new Date(volunteer.createdAt), 'MMM dd, yyyy')}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
            
            <div className="space-y-3">
              <button className="w-full btn btn-secondary text-left">
                <FiEdit className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
              
              <button className="w-full btn btn-danger text-left">
                <FiX className="w-4 h-4 mr-2" />
                Delete Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDetail; 