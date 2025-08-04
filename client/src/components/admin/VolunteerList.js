import React, { useState, useEffect } from 'react';
import { FiUsers, FiMapPin, FiCalendar, FiEye, FiTrash2, FiAward } from 'react-icons/fi';
import { format } from 'date-fns';

const VolunteerList = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/volunteers', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch volunteers');
      }

      const data = await response.json();
      setVolunteers(data.volunteers || []);
    } catch (error) {
      console.error('Error fetching volunteers:', error);
      setError('Failed to load volunteers');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVolunteer = async (volunteerId) => {
    if (!window.confirm('Are you sure you want to delete this volunteer? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/volunteers/${volunteerId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete volunteer');
      }

      // Remove the volunteer from the list
      setVolunteers(volunteers.filter(volunteer => volunteer.id !== volunteerId));
      alert('Volunteer deleted successfully');
    } catch (error) {
      console.error('Error deleting volunteer:', error);
      alert('Failed to delete volunteer');
    }
  };

  const handleViewDetails = async (volunteerId) => {
    try {
      const response = await fetch(`/api/admin/volunteers/${volunteerId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch volunteer details');
      }

      const data = await response.json();
      setSelectedVolunteer(data);
      setShowDetailsModal(true);
    } catch (error) {
      console.error('Error fetching volunteer details:', error);
      alert('Failed to fetch volunteer details');
    }
  };



  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading volunteers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-red-200 border-t-red-600 rounded-full mx-auto mb-4"></div>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Volunteer Management</h1>
          <p className="text-sm text-gray-600">
            Manage all volunteer profiles and their activities
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            {volunteers.length} volunteers
          </span>
        </div>
      </div>

      {/* Volunteers List */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg">
        {volunteers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Volunteer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Profile Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Surveys
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {volunteers.map((volunteer) => (
                  <tr key={volunteer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-primary-600">
                              {volunteer.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {volunteer.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {volunteer.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          volunteer.profile 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {volunteer.profile ? 'Complete' : 'Incomplete'}
                        </span>
                        {volunteer.profile && (
                          <div className="text-xs text-gray-500">
                            Aadhaar: {volunteer.profile.aadhaar_number ? '✓' : '✗'}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <FiAward className="h-4 w-4 text-blue-600 mr-1" />
                        {volunteer.survey_count || 0} surveys
                      </div>
                      {volunteer.last_survey && (
                        <div className="text-xs text-gray-500">
                          Last: {format(new Date(volunteer.last_survey), 'MMM dd, yyyy')}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {volunteer.profile?.location_coordinates ? (
                        <div className="flex items-center">
                          <FiMapPin className="h-4 w-4 text-green-600 mr-1" />
                          <span>Available</span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <FiMapPin className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-gray-500">Not set</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {format(new Date(volunteer.created_at), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewDetails(volunteer.id)}
                          className="text-primary-600 hover:text-primary-900"
                          title="View Details"
                        >
                          <FiEye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteVolunteer(volunteer.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete Volunteer"
                        >
                          <FiTrash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <FiUsers className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No volunteers found</h3>
            <p className="mt-1 text-sm text-gray-500">Volunteers will appear here once they register.</p>
          </div>
        )}
      </div>

      {/* Volunteer Details Modal */}
      {showDetailsModal && selectedVolunteer && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Volunteer Details</h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-3">Basic Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedVolunteer.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedVolunteer.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Role</label>
                      <p className="mt-1 text-sm text-gray-900 capitalize">{selectedVolunteer.role}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Joined</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {format(new Date(selectedVolunteer.created_at), 'MMM dd, yyyy HH:mm')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Profile Information */}
                {selectedVolunteer.profile && (
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-3">Profile Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Aadhaar Number</label>
                        <p className="mt-1 text-sm text-gray-900">
                          {selectedVolunteer.profile.aadhaar_number || 'Not provided'}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Location Address</label>
                        <p className="mt-1 text-sm text-gray-900">
                          {selectedVolunteer.profile.location_address || 'Not provided'}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Location Coordinates</label>
                        <p className="mt-1 text-sm text-gray-900">
                          {selectedVolunteer.profile.location_coordinates || 'Not provided'}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
                        {selectedVolunteer.profile.photo_url ? (
                          <img 
                            src={selectedVolunteer.profile.photo_url} 
                            alt="Profile" 
                            className="mt-1 w-20 h-20 rounded-lg object-cover"
                          />
                        ) : (
                          <p className="mt-1 text-sm text-gray-500">No photo provided</p>
                        )}
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <p className="mt-1 text-sm text-gray-900">
                          {selectedVolunteer.profile.description || 'No description provided'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Survey Information */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-3">Survey Activity</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-700">Total Surveys</span>
                      <span className="text-lg font-bold text-primary-600">{selectedVolunteer.survey_count || 0}</span>
                    </div>
                    {selectedVolunteer.surveys && selectedVolunteer.surveys.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">Recent Surveys:</p>
                        {selectedVolunteer.surveys.slice(0, 3).map((survey, index) => (
                          <div key={survey.id} className="bg-white rounded p-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-900">
                                {survey.beggar_name || 'Unknown'} ({survey.beggar_gender || 'N/A'})
                              </span>
                              <span className="text-gray-500">
                                {format(new Date(survey.survey_date), 'MMM dd, yyyy')}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerList; 