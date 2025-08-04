import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FiMenu } from 'react-icons/fi';
import { FiX } from 'react-icons/fi';
import { FiHeart } from 'react-icons/fi';
import { FiUsers } from 'react-icons/fi';
import { FiHome } from 'react-icons/fi';
import { FiInfo } from 'react-icons/fi';
import { FiCalendar } from 'react-icons/fi';
import { FiGift } from 'react-icons/fi';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg border-b border-indigo-blue border-opacity-10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 hero-gradient rounded-lg flex items-center justify-center">
                <FiHeart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-charcoal-gray font-display">
                BharatCares
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 ml-8">
            <div>
              <Link 
                to="/" 
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                  isActive('/') 
                    ? 'text-white bg-indigo-blue' 
                    : 'text-charcoal-gray hover:text-white hover:bg-indigo-blue'
                }`}
              >
                <FiHome className="w-4 h-4" />
                <span>Home</span>
              </Link>
            </div>
            
            <div>
              <Link 
                to="/about" 
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                  isActive('/about') 
                    ? 'text-white bg-indigo-blue' 
                    : 'text-charcoal-gray hover:text-white hover:bg-indigo-blue'
                }`}
              >
                <FiInfo className="w-4 h-4" />
                <span>About Us</span>
              </Link>
            </div>
            
            <div>
              <Link 
                to="/programs" 
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                  isActive('/programs') 
                    ? 'text-white bg-indigo-blue' 
                    : 'text-charcoal-gray hover:text-white hover:bg-indigo-blue'
                }`}
              >
                <FiUsers className="w-4 h-4" />
                <span>Our Programs</span>
              </Link>
            </div>
            
            <div>
              <Link 
                to="/stories" 
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                  isActive('/stories') 
                    ? 'text-white bg-indigo-blue' 
                    : 'text-charcoal-gray hover:text-white hover:bg-indigo-blue'
                }`}
              >
                <FiHeart className="w-4 h-4" />
                <span>Impact Stories</span>
              </Link>
            </div>
            
            <div>
              <Link 
                to="/events" 
                className={`flex items-center space-x-4 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                  isActive('/events') 
                    ? 'text-white bg-indigo-blue' 
                    : 'text-charcoal-gray hover:text-white hover:bg-indigo-blue'
                }`}
              >
                <FiCalendar className="w-4 h-4" />
                <span>Events</span>
              </Link>
            </div>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {user?.role === 'admin' && (
                  <div>
                    <Link 
                      to="/admin" 
                      className="text-charcoal-gray hover:text-indigo-blue px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                    >
                      Admin Dashboard
                    </Link>
                  </div>
                )}
                {user?.role === 'volunteer' && (
                  <div>
                    <Link 
                      to="/volunteer" 
                      className="text-charcoal-gray hover:text-indigo-blue px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                    >
                      Volunteer Portal
                    </Link>
                  </div>
                )}
                <div>
                  <button 
                    onClick={handleLogout} 
                    className="text-charcoal-gray hover:text-crimson-red px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <div>
                  <Link 
                    to="/login" 
                    className="text-charcoal-gray hover:text-indigo-blue px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap"
                  >
                    Sign In
                  </Link>
                </div>
                
                <div>
                  <Link 
                    to="/register" 
                    className="bg-indigo-blue hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 shadow-md hover:shadow-lg whitespace-nowrap"
                  >
                    Get Involved
                  </Link>
                </div>
                
                <div>
                  <Link 
                    to="/donate" 
                    className="bg-bright-orange hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-1 shadow-md hover:shadow-lg whitespace-nowrap"
                  >
                    <FiGift className="w-4 h-4" />
                    <span>Donate</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-charcoal-gray hover:text-indigo-blue p-2 rounded-md transition-colors"
            >
              {isMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-indigo-blue border-opacity-10 backdrop-blur-sm">
              <div>
                <Link 
                  to="/" 
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive('/') ? 'text-white bg-indigo-blue' : 'text-charcoal-gray hover:text-indigo-blue hover:underline'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </div>
              
              <div>
                <Link 
                  to="/about" 
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive('/about') ? 'text-white bg-indigo-blue' : 'text-charcoal-gray hover:text-indigo-blue hover:underline'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
              </div>
              
              <div>
                <Link 
                  to="/programs" 
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive('/programs') ? 'text-white bg-indigo-blue' : 'text-charcoal-gray hover:text-indigo-blue hover:underline'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Our Programs
                </Link>
              </div>
              
              <div>
                <Link 
                  to="/stories" 
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive('/stories') ? 'text-white bg-indigo-blue' : 'text-charcoal-gray hover:text-indigo-blue hover:underline'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Impact Stories
                </Link>
              </div>
              
              <div>
                <Link 
                  to="/events" 
                  className={`block px-2 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive('/events') ? 'text-white bg-indigo-blue' : 'text-charcoal-gray hover:text-indigo-blue hover:underline'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Events
                </Link>
              </div>
              
              {isAuthenticated ? (
                <div className="pt-4 border-t border-light-cool-gray">
                  {user?.role === 'admin' && (
                    <Link 
                      to="/admin" 
                      className="block px-3 py-2 rounded-md text-base font-medium text-charcoal-gray hover:text-indigo-blue hover:underline transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  {user?.role === 'volunteer' && (
                    <Link 
                      to="/volunteer" 
                      className="block px-3 py-2 rounded-md text-base font-medium text-charcoal-gray hover:text-indigo-blue hover:bg-indigo-blue hover:bg-opacity-5 transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Volunteer Portal
                    </Link>
                  )}
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }} 
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-charcoal-gray hover:text-crimson-red hover:bg-crimson-red hover:bg-opacity-5 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-light-cool-gray space-y-2">
                  <Link 
                    to="/login" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-charcoal-gray hover:text-indigo-blue hover:bg-indigo-blue hover:bg-opacity-5 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/register" 
                    className="block px-3 py-2 rounded-md text-base font-medium bg-indigo-blue text-white hover:bg-indigo-700 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Involved
                  </Link>
                  <Link 
                    to="/donate" 
                    className="block px-3 py-2 rounded-md text-base font-medium bg-bright-orange text-white hover:bg-orange-600 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Donate
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 