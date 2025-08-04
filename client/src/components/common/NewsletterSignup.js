import React, { useState } from 'react';
import { FiMail, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import emailService from '../../utils/emailService';
import analytics from '../../utils/analytics';

const NewsletterSignup = ({ 
  title = "Stay Updated", 
  subtitle = "Get the latest news, impact stories, and ways to help",
  placeholder = "Enter your email address",
  buttonText = "Subscribe",
  className = "",
  onSuccess = null,
  onError = null
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'success', 'error', null
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setStatus('error');
      setMessage('Please enter your email address');
      return;
    }

    if (!emailService.validateEmail(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setStatus(null);
    setMessage('');

    try {
      const result = await emailService.subscribeToNewsletter(email, {
        source: 'newsletter_signup',
        page: window.location.pathname
      });

      if (result.success) {
        setStatus('success');
        setMessage('Thank you for subscribing! Please check your email to confirm.');
        setEmail('');
        
        // Track analytics
        analytics.trackEmailSubscription(email, 'newsletter_signup', {
          page: window.location.pathname
        });
        
        // Call success callback
        if (onSuccess) {
          onSuccess(email);
        }
      } else {
        setStatus('error');
        setMessage(result.error || 'Subscription failed. Please try again.');
        
        // Call error callback
        if (onError) {
          onError(result.error);
        }
      }
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
      
      // Call error callback
      if (onError) {
        onError(error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // Clear status when user starts typing
    if (status) {
      setStatus(null);
      setMessage('');
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiMail className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <div className="relative">
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder={placeholder}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                status === 'error' 
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300'
              }`}
              disabled={isSubmitting}
            />
            {status === 'success' && (
              <FiCheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
            )}
            {status === 'error' && (
              <FiAlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
            )}
          </div>
        </div>

        {message && (
          <div className={`text-sm ${
            status === 'success' ? 'text-green-600' : 'text-red-600'
          }`}>
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Subscribing...</span>
            </div>
          ) : (
            buttonText
          )}
        </button>
      </form>

      <div className="mt-4 text-xs text-gray-500 text-center">
        By subscribing, you agree to receive updates from BharatCares. 
        You can unsubscribe at any time.
      </div>
    </div>
  );
};

export default NewsletterSignup; 