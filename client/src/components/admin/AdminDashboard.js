import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FiLogOut } from 'react-icons/fi';
import VolunteerList from './VolunteerList';
import VolunteerDetail from './VolunteerDetail';
import DashboardStats from './DashboardStats';
import SurveyList from './SurveyList';
import LoadingSpinner from '../common/LoadingSpinner';
import { apiGet } from '../../utils/api';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      console.log('🔍 Fetching admin stats...');
      const token = localStorage.getItem('token');
      const data = await apiGet('/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('📊 Admin stats received:', data);
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-600">
                Welcome back, {user?.email}
              </p>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <FiLogOut className="w-4 h-4" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <Link
              to="/admin"
              className={`border-b-2 py-4 px-1 text-sm font-medium ${
                isActive('/admin') 
                  ? 'border-primary-500 text-primary-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </Link>
            <Link
              to="/admin/volunteers"
              className={`border-b-2 py-4 px-1 text-sm font-medium ${
                isActive('/admin/volunteers') 
                  ? 'border-primary-500 text-primary-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Volunteers
            </Link>
            <Link
              to="/admin/surveys"
              className={`border-b-2 py-4 px-1 text-sm font-medium ${
                isActive('/admin/surveys') 
                  ? 'border-primary-500 text-primary-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Surveys
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<DashboardStats stats={stats} />} />
          <Route path="/volunteers" element={<VolunteerList />} />
          <Route path="/volunteers/:id" element={<VolunteerDetail />} />
          <Route path="/surveys" element={<SurveyList />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard; 