import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FiMapPin, FiUser, FiCalendar, FiPlus, FiEye, FiEdit, FiTrash2 } from 'react-icons/fi';
import { apiGet, apiDelete } from '../../utils/api';

const SurveyDashboard = () => {
  const { user } = useAuth();
  const [surveys, setSurveys] = useState([]);
  const [surveyCount, setSurveyCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [showSurveyModal, setShowSurveyModal] = useState(false);

  console.log('🔍 Current user:', user);
  console.log('🔍 User ID:', user?.id);

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      setLoading(true);
      console.log('🔍 Fetching surveys...');
      
      const data = await apiGet('/api/volunteer/surveys');
      console.log('🔍 Response data:', data);
      console.log('🔍 Surveys count:', data.surveys?.length || 0);
      console.log('🔍 Survey count from server:', data.surveyCount || 0);
      
      setSurveys(data.surveys || []);
      setSurveyCount(data.surveyCount || 0);
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
      await apiDelete(`/api/volunteer/surveys/${surveyId}`);

      // Remove the survey from the list
      setSurveys(surveys.filter(survey => survey.id !== surveyId));
      setSurveyCount(prev => prev - 1);
    } catch (error) {
      console.error('Error deleting survey:', error);
      alert('Failed to delete survey');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const parseCoordinates = (coordString) => {
    if (!coordString) return null;
    const match = coordString.match(/\(([^,]+),([^)]+)\)/);
    if (match) {
      return [parseFloat(match[1]), parseFloat(match[2])];
    }
    return null;
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Survey Dashboard
              </h1>
              <p className="text-sm text-gray-600">
                Welcome, {user?.email}
              </p>
            </div>
            <button
              onClick={() => window.location.href = '/volunteer/survey/new'}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center gap-2"
            >
              <FiPlus className="w-4 h-4" />
              New Survey
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <FiUser className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Surveys</p>
                <p className="text-2xl font-bold text-gray-900">{surveyCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <FiMapPin className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">
                  {surveys.filter(s => {
                    const surveyDate = new Date(s.survey_date);
                    const now = new Date();
                    return surveyDate.getMonth() === now.getMonth() && 
                           surveyDate.getFullYear() === now.getFullYear();
                  }).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <FiCalendar className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-gray-900">
                  {surveys.filter(s => {
                    const surveyDate = new Date(s.survey_date);
                    const now = new Date();
                    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                    return surveyDate >= weekAgo;
                  }).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Surveys List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Surveys</h2>
          </div>
          
          {error && (
            <div className="p-6">
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <p className="text-red-800">{error}</p>
              </div>
            </div>
          )}

          {surveys.length === 0 ? (
            <div className="p-6 text-center">
              <FiUser className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No surveys yet</h3>
              <p className="text-gray-600 mb-4">Start by creating your first survey</p>
              <button
                onClick={() => window.location.href = '/volunteer/survey/new'}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
              >
                Create Survey
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Beggar Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {surveys.map((survey) => (
                    <tr key={survey.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {survey.beggar_photo_url && (
                            <img
                              src={survey.beggar_photo_url}
                              alt="Beggar"
                              className="w-10 h-10 rounded-full object-cover mr-3"
                            />
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {survey.beggar_name || 'Unknown'}
                            </div>
                            <div className="text-sm text-gray-500">
                              {survey.beggar_age && `${survey.beggar_age} years`}
                              {survey.beggar_gender && ` • ${survey.beggar_gender}`}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {survey.location_address || 'Location recorded'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {(() => {
                            const coords = parseCoordinates(survey.location_coordinates);
                            return coords ? `${coords[0].toFixed(4)}, ${coords[1].toFixed(4)}` : 'Coordinates available';
                          })()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(survey.survey_date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setSelectedSurvey(survey);
                              setShowSurveyModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <FiEye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => window.location.href = `/volunteer/survey/edit/${survey.id}`}
                            className="text-green-600 hover:text-green-900"
                          >
                            <FiEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteSurvey(survey.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Survey Detail Modal */}
      {showSurveyModal && selectedSurvey && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Survey Details</h3>
                <button
                  onClick={() => setShowSurveyModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                {selectedSurvey.beggar_photo_url && (
                  <div>
                    <img
                      src={selectedSurvey.beggar_photo_url}
                      alt="Beggar"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
                
                <div>
                  <h4 className="font-medium text-gray-900">Beggar Information</h4>
                  <p className="text-sm text-gray-600">
                    Name: {selectedSurvey.beggar_name || 'Unknown'}<br/>
                    Age: {selectedSurvey.beggar_age || 'Unknown'}<br/>
                    Gender: {selectedSurvey.beggar_gender || 'Unknown'}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900">Location</h4>
                  <p className="text-sm text-gray-600">
                    {selectedSurvey.location_address || 'Address not provided'}<br/>
                    {(() => {
                      const coords = parseCoordinates(selectedSurvey.location_coordinates);
                      return coords ? `Coordinates: ${coords[0].toFixed(6)}, ${coords[1].toFixed(6)}` : 'Coordinates not available';
                    })()}
                  </p>
                </div>

                {selectedSurvey.survey_notes && (
                  <div>
                    <h4 className="font-medium text-gray-900">Notes</h4>
                    <p className="text-sm text-gray-600">{selectedSurvey.survey_notes}</p>
                  </div>
                )}

                <div>
                  <h4 className="font-medium text-gray-900">Survey Date</h4>
                  <p className="text-sm text-gray-600">{formatDate(selectedSurvey.survey_date)}</p>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowSurveyModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowSurveyModal(false);
                    window.location.href = `/volunteer/survey/edit/${selectedSurvey.id}`;
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveyDashboard; 