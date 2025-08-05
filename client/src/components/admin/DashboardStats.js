import React from 'react';
import { FiUsers, FiCheckCircle, FiClock, FiMapPin, FiCalendar, FiBarChart, FiDollarSign } from 'react-icons/fi';
import { format } from 'date-fns';

const DashboardStats = ({ stats }) => {
  if (!stats) {
    return (
      <div className="text-center py-12">
        <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading statistics...</p>
      </div>
    );
  }

  const getAadhaarStats = () => {
    return stats.aadhaarStats || { haveAadhaar: 0, noAadhaar: 0, unknown: 0 };
  };

  const aadhaarStats = getAadhaarStats();

  return (
    <div className="space-y-6">
      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FiUsers className="h-8 w-8 text-primary-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total Volunteers
                </dt>
                <dd className="text-2xl font-bold text-gray-900">
                  {stats.totalVolunteers || 0}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FiCheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Complete Profiles
                </dt>
                <dd className="text-2xl font-bold text-gray-900">
                  {stats.completeProfiles || 0}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FiClock className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Incomplete Profiles
                </dt>
                <dd className="text-2xl font-bold text-gray-900">
                  {stats.incompleteProfiles || 0}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FiBarChart className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total Surveys
                </dt>
                <dd className="text-2xl font-bold text-gray-900">
                  {stats.totalSurveys || 0}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FiDollarSign className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total Donations
                </dt>
                <dd className="text-2xl font-bold text-gray-900">
                  ₹{stats.totalDonations || 0}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Survey Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FiCalendar className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Surveys This Month
                </dt>
                <dd className="text-lg font-semibold text-gray-900">
                  {stats.surveysThisMonth || 0}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FiCalendar className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Surveys This Week
                </dt>
                <dd className="text-lg font-semibold text-gray-900">
                  {stats.surveysThisWeek || 0}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FiMapPin className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  With Location
                </dt>
                <dd className="text-lg font-semibold text-gray-900">
                  {stats.totalVolunteers - (stats.incompleteProfiles || 0)}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Aadhaar Status Breakdown */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Aadhaar Status Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center">
              <FiCheckCircle className="h-5 w-5 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">Have Aadhaar</p>
                <p className="text-2xl font-bold text-green-900">{aadhaarStats.haveAadhaar || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 rounded-lg p-4">
            <div className="flex items-center">
              <FiUsers className="h-5 w-5 text-red-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">No Aadhaar</p>
                <p className="text-2xl font-bold text-red-900">{aadhaarStats.noAadhaar || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              <FiClock className="h-5 w-5 text-gray-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800">Unknown</p>
                <p className="text-2xl font-bold text-gray-900">{aadhaarStats.unknown || 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Submissions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Recent Submissions</h3>
          <a href="/admin/volunteers" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            View all →
          </a>
        </div>
        
        {stats.recentSubmissions && stats.recentSubmissions.length > 0 ? (
          <div className="space-y-3">
            {stats.recentSubmissions.map((submission, index) => (
              <div key={submission.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary-600">
                        {submission.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{submission.name}</p>
                    <p className="text-sm text-gray-500">{submission.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    submission.status === 'Complete' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {submission.status}
                  </span>
                  <span className="text-xs text-gray-500">
                    {format(new Date(submission.created_at), 'MMM dd, yyyy')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <FiUsers className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No recent submissions</h3>
            <p className="mt-1 text-sm text-gray-500">New volunteer submissions will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardStats; 