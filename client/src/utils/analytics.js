// Analytics utility for tracking user interactions and conversions
class Analytics {
  constructor() {
    this.isProduction = process.env.NODE_ENV === 'production';
    this.userId = null;
    this.sessionId = this.generateSessionId();
  }

  // Generate unique session ID
  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Set user ID for tracking
  setUserId(userId) {
    this.userId = userId;
    this.track('user_identified', { userId });
  }

  // Track page views
  trackPageView(pageName, pageData = {}) {
    const eventData = {
      page: pageName,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      userId: this.userId,
      ...pageData
    };

    this.track('page_view', eventData);
  }

  // Track user interactions
  trackInteraction(action, element, data = {}) {
    const eventData = {
      action,
      element,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      userId: this.userId,
      ...data
    };

    this.track('interaction', eventData);
  }

  // Track donations
  trackDonation(amount, paymentMethod, data = {}) {
    const eventData = {
      amount,
      paymentMethod,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      userId: this.userId,
      ...data
    };

    this.track('donation', eventData);
  }

  // Track volunteer registrations
  trackVolunteerRegistration(program, data = {}) {
    const eventData = {
      program,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      userId: this.userId,
      ...data
    };

    this.track('volunteer_registration', eventData);
  }

  // Track form submissions
  trackFormSubmission(formName, data = {}) {
    const eventData = {
      formName,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      userId: this.userId,
      ...data
    };

    this.track('form_submission', eventData);
  }

  // Track event registrations
  trackEventRegistration(eventName, eventData = {}) {
    const data = {
      eventName,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      userId: this.userId,
      ...eventData
    };

    this.track('event_registration', data);
  }

  // Track social media clicks
  trackSocialClick(platform, data = {}) {
    const eventData = {
      platform,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      userId: this.userId,
      ...data
    };

    this.track('social_click', eventData);
  }

  // Track email subscriptions
  trackEmailSubscription(email, source, data = {}) {
    const eventData = {
      email,
      source,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      userId: this.userId,
      ...data
    };

    this.track('email_subscription', eventData);
  }

  // Track conversion goals
  trackConversion(goal, value = 0, data = {}) {
    const eventData = {
      goal,
      value,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      userId: this.userId,
      ...data
    };

    this.track('conversion', eventData);
  }

  // Main tracking function
  track(eventName, eventData) {
    // In production, send to analytics service
    if (this.isProduction) {
      // Send to Google Analytics 4
      if (window.gtag) {
        window.gtag('event', eventName, eventData);
      }

      // Send to custom analytics endpoint
      this.sendToAnalytics(eventName, eventData);
    }

    // Log in development
    if (!this.isProduction) {
      console.log('Analytics Event:', eventName, eventData);
    }
  }

  // Send data to analytics endpoint
  async sendToAnalytics(eventName, eventData) {
    try {
      const response = await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event: eventName,
          data: eventData,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          referrer: document.referrer,
          url: window.location.href
        })
      });

      if (!response.ok) {
        console.error('Analytics tracking failed:', response.status);
      }
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  }

  // Initialize analytics
  init() {
    // Track initial page view
    this.trackPageView(window.location.pathname, {
      referrer: document.referrer,
      userAgent: navigator.userAgent
    });

    // Track navigation changes
    if (window.history && window.history.pushState) {
      const originalPushState = window.history.pushState;
      window.history.pushState = (...args) => {
        originalPushState.apply(window.history, args);
        this.trackPageView(window.location.pathname);
      };
    }
  }
}

// Create singleton instance
const analytics = new Analytics();

// Initialize on load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    analytics.init();
  });
}

export default analytics; 