import React, { useState, useEffect, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';

const VolunteerPortal = () => {
  const { user } = useAuth();
  const [hasProfile, setHasProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkVolunteerProfile = useCallback(async () => {
    try {
      console.log('🔍 Checking volunteer profile for user:', user?.id);
      const response = await fetch('/api/volunteer/profile', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('📊 Profile check result:', data);
        setHasProfile(!!data.profile);
      } else {
        console.log('❌ No profile found');
        setHasProfile(false);
      }
    } catch (error) {
      console.error('Error checking volunteer profile:', error);
      setHasProfile(false);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    checkVolunteerProfile();
  }, [checkVolunteerProfile]);

  if (loading) {
    return <LoadingSpinner />;
  }

  // If volunteer doesn't have a profile, redirect to registration form
  if (!hasProfile) {
    console.log('🔄 Redirecting to volunteer registration');
    return <Navigate to="/volunteer/register" replace />;
  }

  // If volunteer has a profile, redirect to survey dashboard
  console.log('🔄 Redirecting to survey dashboard');
  return <Navigate to="/volunteer/surveys" replace />;
};

export default VolunteerPortal; 