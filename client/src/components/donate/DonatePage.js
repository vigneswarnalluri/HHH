import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGift, FiShield, FiHeart, FiUsers, FiTrendingUp, FiCheckCircle, FiCreditCard, FiSmartphone, FiGlobe } from 'react-icons/fi';
import AnimatedButton from '../common/AnimatedButton';
import AnimatedCard from '../common/AnimatedCard';

const DonatePage = () => {
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = selectedAmount === 'custom' ? customAmount : selectedAmount;
    console.log('Donation submitted:', { amount, paymentMethod, donorInfo });
    // Handle donation submission
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
                      disabled={!selectedAmount || (selectedAmount === 'custom' && !customAmount)}
                    >
                      <FiGift className="w-5 h-5 mr-2" />
                      <span>Complete Donation</span>
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
    </div>
  );
};

export default DonatePage; 