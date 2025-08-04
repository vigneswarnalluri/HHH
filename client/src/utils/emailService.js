// Email service for handling newsletter subscriptions and contact forms
class EmailService {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  }

  // Subscribe to newsletter
  async subscribeToNewsletter(email, preferences = {}) {
    try {
      const response = await fetch(`${this.baseURL}/api/email/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          preferences,
          source: 'website',
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error('Newsletter subscription failed');
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      return { success: false, error: error.message };
    }
  }

  // Send contact form
  async sendContactForm(formData) {
    try {
      const response = await fetch(`${this.baseURL}/api/email/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: 'website'
        })
      });

      if (!response.ok) {
        throw new Error('Contact form submission failed');
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Contact form error:', error);
      return { success: false, error: error.message };
    }
  }

  // Send volunteer inquiry
  async sendVolunteerInquiry(formData) {
    try {
      const response = await fetch(`${this.baseURL}/api/email/volunteer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: 'website'
        })
      });

      if (!response.ok) {
        throw new Error('Volunteer inquiry submission failed');
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Volunteer inquiry error:', error);
      return { success: false, error: error.message };
    }
  }

  // Send donation receipt
  async sendDonationReceipt(donationData) {
    try {
      const response = await fetch(`${this.baseURL}/api/email/donation-receipt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...donationData,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error('Donation receipt email failed');
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Donation receipt error:', error);
      return { success: false, error: error.message };
    }
  }

  // Send event confirmation
  async sendEventConfirmation(eventData) {
    try {
      const response = await fetch(`${this.baseURL}/api/email/event-confirmation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...eventData,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error('Event confirmation email failed');
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Event confirmation error:', error);
      return { success: false, error: error.message };
    }
  }

  // Validate email format
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validate form data
  validateContactForm(formData) {
    const errors = [];

    if (!formData.name || formData.name.trim().length < 2) {
      errors.push('Name is required and must be at least 2 characters');
    }

    if (!formData.email || !this.validateEmail(formData.email)) {
      errors.push('Valid email address is required');
    }

    if (!formData.message || formData.message.trim().length < 10) {
      errors.push('Message is required and must be at least 10 characters');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Validate volunteer form
  validateVolunteerForm(formData) {
    const errors = [];

    if (!formData.name || formData.name.trim().length < 2) {
      errors.push('Name is required and must be at least 2 characters');
    }

    if (!formData.email || !this.validateEmail(formData.email)) {
      errors.push('Valid email address is required');
    }

    if (!formData.phone || formData.phone.trim().length < 10) {
      errors.push('Valid phone number is required');
    }

    if (!formData.interests || formData.interests.length === 0) {
      errors.push('Please select at least one area of interest');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// Create singleton instance
const emailService = new EmailService();

export default emailService; 