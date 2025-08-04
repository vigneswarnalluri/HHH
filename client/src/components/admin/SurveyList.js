import React, { useState, useEffect } from 'react';
import { FiMapPin, FiUser, FiEye, FiTrash2 } from 'react-icons/fi';
import { format } from 'date-fns';
import { apiGet, apiDelete } from '../../utils/api';

const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [filters, setFilters] = useState({
    volunteer: '',
    dateFrom: '',
    dateTo: '',
    gender: ''
  });

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      setLoading(true);
      console.log('🔍 Fetching surveys...');
      const token = localStorage.getItem('token');
      const data = await apiGet('/api/admin/surveys', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('📊 Surveys received:', data.surveys?.length || 0);
      setSurveys(data.surveys || []);
    } catch (error) {
      console.error('Error fetching surveys:', error);
      setError('Failed to load surveys');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSurvey = async (surveyId) => {
    if (!window.confirm('Are you sure you want to delete this survey?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await apiDelete(`/api/volunteer/surveys/${surveyId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setSurveys(surveys.filter(survey => survey.id !== surveyId));
      alert('Survey deleted successfully');
    } catch (error) {
      console.error('Error deleting survey:', error);
      alert('Failed to delete survey');
    }
  };

  const handleViewDetails = (survey) => {
    setSelectedSurvey(survey);
    setShowDetailsModal(true);
  };



  const filteredSurveys = surveys.filter(survey => {
    if (filters.volunteer && !survey.volunteer_email?.toLowerCase().includes(filters.volunteer.toLowerCase())) {
      return false;
    }
    if (filters.gender && survey.beggar_gender !== filters.gender) {
      return false;
    }
    if (filters.dateFrom && new Date(survey.survey_date) < new Date(filters.dateFrom)) {
      return false;
    }
    if (filters.dateTo && new Date(survey.survey_date) > new Date(filters.dateTo)) {
      return false;
    }
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading surveys...</p>
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
          <h1 className="text-2xl font-bold text-gray-900">Survey Management</h1>
          <p className="text-sm text-gray-600">
            View and manage all beggar surveys with detailed information
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            {filteredSurveys.length} surveys
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Volunteer</label>
            <input
              type="text"
              placeholder="Search by volunteer email..."
              value={filters.volunteer}
              onChange={(e) => setFilters({...filters, volunteer: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              value={filters.gender}
              onChange={(e) => setFilters({...filters, gender: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date From</label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date To</label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>

      {/* Surveys List */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg">
        {filteredSurveys.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Beggar Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Volunteer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Survey Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSurveys.map((survey) => (
                  <tr key={survey.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {survey.beggar_photo_url ? (
                            <img 
                              src={survey.beggar_photo_url} 
                              alt="Beggar" 
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <FiUser className="h-5 w-5 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {survey.beggar_name || 'Unknown'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {survey.beggar_age ? `${survey.beggar_age} years` : 'Age not provided'} • {survey.beggar_gender || 'Unknown'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {survey.volunteer_email || 'Unknown'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {survey.location_coordinates ? (
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
                      {format(new Date(survey.survey_date), 'MMM dd, yyyy HH:mm')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewDetails(survey)}
                          className="text-primary-600 hover:text-primary-900"
                          title="View Details"
                        >
                          <FiEye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteSurvey(survey.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete Survey"
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
            <FiUser className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No surveys found</h3>
            <p className="mt-1 text-sm text-gray-500">Surveys will appear here once volunteers submit them.</p>
          </div>
        )}
      </div>

      {/* Survey Details Modal */}
      {showDetailsModal && selectedSurvey && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Survey Details</h3>
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
                {/* Beggar Information */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-3">Beggar Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedSurvey.beggar_name || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Age</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedSurvey.beggar_age || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Gender</label>
                      <p className="mt-1 text-sm text-gray-900 capitalize">{selectedSurvey.beggar_gender || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Survey Date</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {format(new Date(selectedSurvey.survey_date), 'MMM dd, yyyy HH:mm')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Photo */}
                {selectedSurvey.beggar_photo_url && (
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-3">Photo</h4>
                    <div className="flex justify-center">
                      <img 
                        src={selectedSurvey.beggar_photo_url} 
                        alt="Beggar" 
                        className="max-w-xs rounded-lg shadow-sm"
                      />
                    </div>
                  </div>
                )}

                {/* Location Information */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-3">Location Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Address</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {selectedSurvey.location_address || 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Coordinates</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {selectedSurvey.location_coordinates || 'Not provided'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Volunteer Information */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-3">Volunteer Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Volunteer Email</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedSurvey.volunteer_email || 'Unknown'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Volunteer Name</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedSurvey.volunteer_name || 'Unknown'}</p>
                    </div>
                  </div>
                </div>

                {/* Survey Notes */}
                {selectedSurvey.survey_notes && (
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-3">Survey Notes</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-900">{selectedSurvey.survey_notes}</p>
                    </div>
                  </div>
                )}
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

export default SurveyList; 