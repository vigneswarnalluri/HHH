import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { AnimatedRoute } from './components/common/AnimatedRoute';
import { useAuth } from './contexts/AuthContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import LoadingSpinner from './components/common/LoadingSpinner';
import ProtectedRoute from './components/common/ProtectedRoute';
import ErrorBoundary from './components/common/ErrorBoundary';

const HomePage = lazy(() => import('./components/home/HomePage'));
const AboutPage = lazy(() => import('./components/about/AboutPage'));
const ProgramsPage = lazy(() => import('./components/programs/ProgramsPage'));
const StoriesPage = lazy(() => import('./components/stories/StoriesPage'));
const EventsPage = lazy(() => import('./components/events/EventsPage'));
const Login = lazy(() => import('./components/auth/Login'));
const Register = lazy(() => import('./components/auth/Register'));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard'));
const VolunteerForm = lazy(() => import('./components/volunteer/VolunteerForm'));
const SurveyDashboard = lazy(() => import('./components/volunteer/SurveyDashboard'));
const NewSurveyForm = lazy(() => import('./components/volunteer/NewSurveyForm'));
const VolunteerPortal = lazy(() => import('./components/volunteer/VolunteerPortal'));
const DonatePage = lazy(() => import('./components/donate/DonatePage'));

// Debug: Log environment variable
console.log('🔍 Environment check:', {
  REACT_APP_API_URL: process.env.REACT_APP_API_URL,
  NODE_ENV: process.env.NODE_ENV,
  currentUrl: window.location.href
});

function App() {
  const pageTitles = {
    '/': 'Home | Volunteer App',
    '/about': 'About | Volunteer App',
    '/programs': 'Programs | Volunteer App',
    '/stories': 'Stories | Volunteer App',
    '/events': 'Events | Volunteer App',
    '/login': 'Login | Volunteer App',
    '/register': 'Register | Volunteer App',
    '/donate': 'Donate | Volunteer App',
    '/admin': 'Admin Dashboard | Volunteer App',
    '/volunteer': 'Volunteer Portal | Volunteer App'
  };
  const location = useLocation();
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  const currentPath = location.pathname;
  const basePath = currentPath.split('/')[1];
  const pageTitle = pageTitles[`/${basePath}`] || pageTitles['/'];

  return (
    <HelmetProvider>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content="Volunteer management application" />
      </Helmet>
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Skip Navigation Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:bg-white focus:p-4 focus:z-50"
      >
        Skip to main content
      </a>
      
      <Header />
      <main id="main-content" className="flex-1" role="main">
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <AnimatedRoute>
              <Routes location={location} key={location.pathname}>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/stories" element={<StoriesPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/login" element={
              isAuthenticated ? <Navigate to="/" replace /> : <Login />
            } />
            <Route path="/register" element={
              isAuthenticated ? <Navigate to="/" replace /> : <Register />
            } />
            <Route path="/donate" element={<DonatePage />} />

            {/* Protected routes */}
            <Route path="/admin/*" element={
              <ProtectedRoute requireAdmin>
                <AdminDashboard />
              </ProtectedRoute>
            } />

            <Route path="/volunteer" element={
              <ProtectedRoute requireVolunteer>
                <VolunteerPortal />
              </ProtectedRoute>
            } />
            <Route path="/volunteer/surveys" element={
              <ProtectedRoute requireVolunteer>
                <SurveyDashboard />
              </ProtectedRoute>
            } />
            <Route path="/volunteer/survey/new" element={
              <ProtectedRoute requireVolunteer>
                <NewSurveyForm />
              </ProtectedRoute>
            } />
            <Route path="/volunteer/register" element={
              <ProtectedRoute requireVolunteer>
                <VolunteerForm />
              </ProtectedRoute>
            } />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatedRoute>
        </Suspense>
      </ErrorBoundary>
    </main>
    <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App; 