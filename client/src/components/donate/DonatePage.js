import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGift, FiShield, FiHeart, FiUsers, FiTrendingUp, FiCheckCircle, FiCreditCard, FiSmartphone, FiGlobe, FiCheck, FiX } from 'react-icons/fi';
import AnimatedButton from '../common/AnimatedButton';
import AnimatedCard from '../common/AnimatedCard';
import { apiPost } from '../../utils/api';

const DonatePage = () => {
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successData, setSuccessData] = useState(null);

  const presetAmounts = [
    { value: '500', label: '₹500' },
    { value: '1000', label: '₹1,000' },
    { value: '2500', label: '₹2,500' },
    { value: '5000', label: '₹5,000' },
    { value: '10000', label: '₹10,000' },
    { value: 'custom', label: 'Custom' }
  ];

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: FiCreditCard },
    { id: 'upi', name: 'UPI', icon: FiSmartphone },
    { id: 'netbanking', name: 'Net Banking', icon: FiGlobe }
  ];

  const impactAreas = [
    { icon: FiHeart, title: 'Emergency Relief', description: 'Immediate support for families in crisis' },
    { icon: FiUsers, title: 'Education Programs', description: 'Literacy and skill development initiatives' },
    { icon: FiTrendingUp, title: 'Job Training', description: 'Vocational training and placement support' }
  ];

  const trustSignals = [
    { icon: FiShield, title: 'Secure Payments', description: 'Bank-grade security for all transactions' },
    { icon: FiCheckCircle, title: 'Transparent Impact', description: 'Regular updates on how your donation is used' },
    { icon: FiHeart, title: 'Tax Deductible', description: '80G tax exemption for all donations' }
  ];

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    if (amount !== 'custom') {
      setCustomAmount('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedAmount || (selectedAmount === 'custom' && !customAmount)) {
      setErrorMessage('Please select or enter a donation amount');
      setShowError(true);
      return;
    }

    if (!donorInfo.name || !donorInfo.email) {
      setErrorMessage('Please provide your name and email');
      setShowError(true);
      return;
    }

    setIsLoading(true);
    setShowError(false);
    setShowSuccess(false);

    try {
      const amount = selectedAmount === 'custom' ? customAmount : selectedAmount;
      
      const donationData = {
        amount: parseFloat(amount),
        donor_name: donorInfo.name,
        donor_email: donorInfo.email,
        donor_phone: donorInfo.phone || null,
        payment_method: paymentMethod,
        message: `Donation via ${paymentMethod}`
      };

      console.log('🔍 Environment check:', {
        REACT_APP_API_URL: process.env.REACT_APP_API_URL,
        NODE_ENV: process.env.NODE_ENV
      });
      console.log('Submitting donation:', donationData);

      const result = await apiPost('/api/donations', donationData);

      console.log('Donation result:', result);

      if (result.success) {
        setSuccessData(result.donation);
        setShowSuccess(true);
        
        // Reset form
        setSelectedAmount('');
        setCustomAmount('');
        setDonorInfo({ name: '', email: '', phone: '' });
        setPaymentMethod('card');
      } else {
        setErrorMessage(result.error || 'Donation failed. Please try again.');
        setShowError(true);
      }
    } catch (error) {
      console.error('Donation error:', error);
      setErrorMessage(error.message || 'Donation failed. Please try again.');
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-16 overflow-hidden">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute top-20 right-20 w-32 h-32 bg-white opacity-10 rounded-full"
        />
        
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute bottom-20 left-20 w-24 h-24 bg-white opacity-10 rounded-full"
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Make a Difference Today
          </motion.h1>
          
          <motion.p 
            className="text-xl mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Your donation helps provide food, shelter, education, and hope to those who need it most.
          </motion.p>
        </div>
      </section>

      {/* Main Donation Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Donation Form */}
            <div className="lg:col-span-2">
              <AnimatedCard className="p-8">
                <h2 className="text-2xl font-bold text-charcoal-gray mb-6">Your Donation</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Amount Selection */}
                  <motion.div 
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <label className="block text-sm font-medium text-charcoal-gray mb-3">
                      Select Amount
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {presetAmounts.map((amount, index) => (
                        <motion.button
                          key={amount.value}
                          onClick={() => handleAmountSelect(amount.value)}
                          className={`p-4 rounded-lg border-2 font-medium transition-all duration-300 ${
                            selectedAmount === amount.value
                              ? 'border-bright-orange bg-bright-orange bg-opacity-10 text-bright-orange'
                              : 'border-light-cool-gray text-charcoal-gray hover:border-indigo-blue hover:text-indigo-blue'
                          }`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                        >
                          {amount.label}
                        </motion.button>
                      ))}
                    </div>
                    
                    {selectedAmount === 'custom' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4"
                      >
                        <input
                          type="number"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          placeholder="Enter custom amount"
                          className="w-full px-4 py-3 border border-light-cool-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-blue focus:border-transparent"
                        />
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Donor Information */}
                  <motion.div 
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <h3 className="text-lg font-semibold text-charcoal-gray">Your Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={donorInfo.name}
                        onChange={(e) => setDonorInfo({...donorInfo, name: e.target.value})}
                        className="px-4 py-3 border border-light-cool-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-blue focus:border-transparent"
                        required
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={donorInfo.email}
                        onChange={(e) => setDonorInfo({...donorInfo, email: e.target.value})}
                        className="px-4 py-3 border border-light-cool-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-blue focus:border-transparent"
                        required
                      />
                    </div>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={donorInfo.phone}
                      onChange={(e) => setDonorInfo({...donorInfo, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-light-cool-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-blue focus:border-transparent"
                    />
                  </motion.div>

                  {/* Payment Method */}
                  <motion.div 
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <h3 className="text-lg font-semibold text-charcoal-gray">Payment Method</h3>
                    <div className="space-y-3">
                      {paymentMethods.map((method, index) => {
                        const IconComponent = method.icon;
                        return (
                          <motion.label
                            key={method.id}
                            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                              paymentMethod === method.id
                                ? 'border-bright-orange bg-bright-orange bg-opacity-10'
                                : 'border-light-cool-gray hover:border-indigo-blue'
                            }`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                          >
                            <input
                              type="radio"
                              name="paymentMethod"
                              value={method.id}
                              checked={paymentMethod === method.id}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              className="sr-only"
                            />
                            <IconComponent className={`w-5 h-5 mr-3 ${
                              paymentMethod === method.id ? 'text-bright-orange' : 'text-charcoal-gray'
                            }`} />
                            <span className={`font-medium ${
                              paymentMethod === method.id ? 'text-bright-orange' : 'text-charcoal-gray'
                            }`}>
                              {method.name}
                            </span>
                          </motion.label>
                        );
                      })}
                    </div>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <AnimatedButton
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full bg-bright-orange hover:bg-orange-600"
                      disabled={!selectedAmount || (selectedAmount === 'custom' && !customAmount) || isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <FiGift className="w-5 h-5 mr-2" />
                          <span>Complete Donation</span>
                        </>
                      )}
                    </AnimatedButton>
                  </motion.div>
                </form>
              </AnimatedCard>
            </div>

            {/* Trust Signals */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h3 className="text-lg font-semibold text-charcoal-gray mb-4">Secure & Trusted</h3>
                <div className="space-y-4">
                  {trustSignals.map((signal, index) => {
                    const IconComponent = signal.icon;
                    return (
                      <motion.div
                        key={signal.title}
                        className="flex items-start space-x-3 p-4 bg-light-cool-gray rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      >
                        <IconComponent className="w-5 h-5 text-indigo-blue mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-charcoal-gray">{signal.title}</h4>
                          <p className="text-sm text-gray-600">{signal.description}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="bg-accent-gradient text-white p-6 rounded-lg"
              >
                <h3 className="text-lg font-semibold mb-4">Your Impact</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <FiHeart className="w-5 h-5" />
                    <span className="text-sm">₹500 provides 10 nutritious meals</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FiUsers className="w-5 h-5" />
                    <span className="text-sm">₹1,000 supports education for 1 month</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FiTrendingUp className="w-5 h-5" />
                    <span className="text-sm">₹2,500 funds job training for 1 person</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Areas */}
      <section className="py-16 bg-light-cool-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-charcoal-gray mb-4">How Your Donation Helps</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your generous contribution supports multiple programs that create lasting positive change in our community.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {impactAreas.map((area, index) => {
              const IconComponent = area.icon;
              return (
                                  <motion.div
                    key={area.title}
                    className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  >
                  <div 
                    className="w-16 h-16 bg-indigo-blue bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <IconComponent className="w-8 h-8 text-indigo-blue" />
                  </div>
                  <h3 className="text-xl font-semibold text-charcoal-gray mb-2">{area.title}</h3>
                  <p className="text-gray-600">{area.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Success Modal */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCheck className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600 mb-4">
              Your donation of ₹{successData?.amount} has been processed successfully.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-4 text-sm">
              <p><strong>Transaction ID:</strong> {successData?.payment_id}</p>
              <p><strong>Status:</strong> {successData?.status}</p>
            </div>
            <button
              onClick={() => setShowSuccess(false)}
              className="bg-bright-orange text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Continue
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Error Modal */}
      {showError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center"
          >
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiX className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Donation Failed</h3>
            <p className="text-gray-600 mb-4">{errorMessage}</p>
            <button
              onClick={() => setShowError(false)}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default DonatePage; 