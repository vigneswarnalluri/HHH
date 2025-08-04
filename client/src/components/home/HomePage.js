import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiHeart, FiUsers, FiBookOpen, FiHome, FiSmile, FiTarget, FiTrendingUp, FiGift, FiArrowRight,
  FiChevronDown, FiChevronUp, FiStar, FiCalendar, FiMapPin
} from 'react-icons/fi';
import AnimatedSection from '../common/AnimatedSection';
import AnimatedButton from '../common/AnimatedButton';

const HomePage = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterName, setNewsletterName] = useState('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const programs = [
    {
      icon: FiHome,
      title: "Emergency Shelter",
      description: "Safe, temporary housing for individuals and families in crisis",
      color: "indigo-blue",
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=300&h=200&fit=crop"
    },
    {
      icon: FiBookOpen,
      title: "Education & Skills",
      description: "Literacy programs, vocational training, and life skills development",
      color: "leaf-green",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop"
    },
    {
      icon: FiTrendingUp,
      title: "Job Placement",
      description: "Connecting individuals with employment opportunities",
      color: "bright-orange",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop"
    },
    {
      icon: FiHeart,
      title: "Health & Wellness",
      description: "Healthcare access, mental health support, and wellness programs",
      color: "aqua-blue",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=200&fit=crop"
    },
    {
      icon: FiUsers,
      title: "Community Building",
      description: "Creating supportive networks and fostering social connections",
      color: "sunshine-yellow",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=300&h=200&fit=crop"
    },
    {
      icon: FiGift,
      title: "Food Security",
      description: "Providing nutritious meals and food assistance",
      color: "crimson-red",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop"
    }
  ];

  const impactStats = [
    { number: "500+", label: "Meals Served Daily", color: "indigo-blue" },
    { number: "200+", label: "Shelters Provided", color: "leaf-green" },
    { number: "150+", label: "Students Supported", color: "bright-orange" },
    { number: "50+", label: "Jobs Created", color: "aqua-blue" }
  ];

  const transformations = [
    { aspect: "Daily Earnings", before: "₹0–₹50/day", after: "₹6,000–₹15,000/month" },
    { aspect: "Housing", before: "Pavement/shelters", after: "Rental/NGO homes" },
    { aspect: "Education", before: "No formal education", after: "Skills training & certification" },
    { aspect: "Health", before: "No healthcare access", after: "Regular medical checkups" }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Former Beneficiary",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      quote: "BharatCares gave me not just food and shelter, but the skills and confidence to rebuild my life.",
      story: "Read Priya's Story"
    },
    {
      name: "Rajesh Kumar",
      role: "Volunteer",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      quote: "Seeing the transformation in people's lives through our programs is the most rewarding experience.",
      story: "Read Rajesh's Story"
    },
    {
      name: "Meera Patel",
      role: "Donor",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      quote: "I've been donating for 3 years and the transparency in how funds are used gives me complete confidence.",
      story: "Read Meera's Story"
    }
  ];

  const latestNews = [
    {
      title: "New Vocational Training Center Opens",
      date: "July 15, 2024",
      excerpt: "Our latest initiative to provide job-ready skills to 100+ individuals.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop",
      link: "/programs"
    },
    {
      title: "Summer Food Drive Success",
      date: "July 10, 2024",
      excerpt: "Community support helps us serve 10,000+ meals this summer.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop",
      link: "/stories"
    },
    {
      title: "Volunteer Recognition Ceremony",
      date: "July 5, 2024",
      excerpt: "Celebrating our amazing volunteers who make everything possible.",
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=300&h=200&fit=crop",
      link: "/events"
    }
  ];

  const upcomingEvents = [
    {
      title: "Community Health Camp",
      date: "August 5, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "Central Park, Mumbai",
      registration: "Register Now"
    },
    {
      title: "Skill Development Workshop",
      date: "August 12, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Training Center",
      registration: "Register Now"
    },
    {
      title: "Donor Appreciation Dinner",
      date: "August 20, 2024",
      time: "7:00 PM - 10:00 PM",
      location: "Grand Hotel",
      registration: "RSVP Now"
    }
  ];

  const volunteerSpotlight = {
    name: "Anita Desai",
    role: "Education Coordinator",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
    story: "Anita has been with us for 5 years, helping over 200 children access quality education. Her dedication to ensuring every child has the opportunity to learn has transformed countless lives.",
    impact: "200+ children educated, 15 schools partnered, 50+ volunteers mentored"
  };

  const faqs = [
    {
      question: "How can I donate?",
      answer: "You can donate online through our secure payment gateway, via bank transfer, or by visiting our office. All donations are tax-deductible under section 80G."
    },
    {
      question: "Where are you located?",
      answer: "Our main office is in Mumbai, with outreach centers across Maharashtra. We serve communities in Mumbai, Pune, Nagpur, and surrounding areas."
    },
    {
      question: "What volunteer roles are available?",
      answer: "We have various volunteer opportunities including teaching, mentoring, event coordination, fundraising, and administrative support. Training is provided for all roles."
    },
    {
      question: "How do you ensure transparency?",
      answer: "We publish detailed financial reports quarterly, share impact stories regularly, and provide donors with updates on how their contributions are being used."
    },
    {
      question: "Can I sponsor a specific program?",
      answer: "Yes, you can choose to support specific programs like education, healthcare, or food security. We'll provide regular updates on your sponsored program."
    }
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter signup:', { email: newsletterEmail, name: newsletterName });
    setNewsletterEmail('');
    setNewsletterName('');
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-24 overflow-hidden relative min-h-screen">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://media.assettype.com/deccanherald%2Fimport%2Fsites%2Fdh%2Ffiles%2Farticleimages%2F2021%2F07%2F27%2Fistock-12235827791-1013319-1627392954.jpg?w=900&auto=format%2Ccompress&fit=max" 
            alt="Community helping hands"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-blue/85 to-bright-orange/85"></div>
        </div>
        
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-20 right-20 w-32 h-32 bg-white rounded-full"
        />
        
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 1.3, 1],
            opacity: [0.08, 0.25, 0.08],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute bottom-20 left-20 w-24 h-24 bg-white rounded-full"
        />

        <motion.div
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.05, 0.2, 0.05],
            y: [0, -20, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"
        />

        <motion.div
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.06, 0.22, 0.06],
            x: [0, 30, 0],
            rotate: [0, -180, -360]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-1/3 right-1/3 w-20 h-20 bg-white rounded-full"
        />

        {/* Additional dynamic elements */}
        <motion.div
          animate={{ 
            scale: [1, 1.25, 1],
            opacity: [0.04, 0.18, 0.04],
            y: [0, -15, 0],
            x: [0, 20, 0]
          }}
          transition={{ 
            duration: 16, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-1/4 left-1/3 w-12 h-12 bg-white rounded-full"
        />

        <motion.div
          animate={{ 
            scale: [1, 1.35, 1],
            opacity: [0.05, 0.2, 0.05],
            y: [0, 25, 0],
            x: [0, -25, 0]
          }}
          transition={{ 
            duration: 14, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute bottom-1/3 right-1/4 w-14 h-14 bg-white rounded-full"
        />

        {/* Floating particles */}
        <motion.div
          animate={{ 
            scale: [0.5, 1, 0.5],
            opacity: [0.02, 0.15, 0.02],
            y: [0, -40, 0],
            x: [0, 60, 0]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-1/3 left-1/6 w-8 h-8 bg-white rounded-full"
        />

        <motion.div
          animate={{ 
            scale: [0.8, 1.2, 0.8],
            opacity: [0.03, 0.12, 0.03],
            y: [0, 35, 0],
            x: [0, -45, 0]
          }}
          transition={{ 
            duration: 22, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute bottom-1/4 right-1/6 w-10 h-10 bg-white rounded-full"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 z-10">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center"
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 font-display"
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
              whileHover={{ 
                scale: 1.05, 
                textShadow: "0 0 20px rgba(255,255,255,0.5)",
                transition: { duration: 0.3 }
              }}
            >
              From Street to Stability
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 50, x: -30 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
              whileHover={{ 
                scale: 1.02,
                x: 5,
                transition: { duration: 0.3 }
              }}
            >
              Providing food, shelter, education & skills so every life thrives
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div>
                <AnimatedButton
                  variant="primary"
                  size="lg"
                  as={Link}
                  to="/donate"
                  className="group bg-bright-orange hover:bg-orange-600 shadow-2xl"
                >
                  <FiGift className="w-5 h-5 mr-2 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                  <span>Donate Now</span>
                </AnimatedButton>
              </div>
              
              <div>
                <AnimatedButton
                  variant="outline"
                  size="lg"
                  as={Link}
                  to="/register"
                  className="group bg-white text-indigo-blue hover:bg-indigo-blue hover:text-white shadow-2xl"
                >
                  <FiUsers className="w-5 h-5 mr-2 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                  <span>Get Involved</span>
                </AnimatedButton>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <AnimatedSection className="py-16 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-gray mb-4">Our Purpose</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe every individual deserves dignity, opportunity, and hope. Our mission is to transform lives through comprehensive support and sustainable solutions.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8 mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="text-center">
              <div 
                className="w-20 h-20 bg-indigo-blue rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
              >
                <FiTarget className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-charcoal-gray mb-2">Vision</h3>
              <p className="text-gray-600">
                A world where every person has access to basic needs, education, and opportunities to build a better future.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <div 
                className="w-20 h-20 bg-leaf-green rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
              >
                <FiHeart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-charcoal-gray mb-2">Mission</h3>
              <p className="text-gray-600">
                To provide comprehensive support and sustainable solutions that empower individuals and families.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <div 
                className="w-20 h-20 bg-bright-orange rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
              >
                <FiSmile className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-charcoal-gray mb-2">Values</h3>
              <p className="text-gray-600">
                Compassion, integrity, innovation, and collaboration guide everything we do.
              </p>
            </motion.div>
          </motion.div>

          {/* Impact Statistics */}
          <motion.div 
            className="bg-indigo-blue rounded-2xl p-8 text-white shadow-xl border-4 border-bright-orange"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-2 text-white">Our Impact in Numbers</h3>
              <p className="text-xl text-white font-medium">Real change, measurable results</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              <motion.div 
                className="text-center bg-white bg-opacity-20 rounded-lg p-4 border-2 border-white border-opacity-30"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="text-5xl font-bold mb-2 text-white">15,000+</div>
                <div className="text-base text-white font-semibold">Lives Transformed</div>
              </motion.div>
              
              <motion.div 
                className="text-center bg-white bg-opacity-20 rounded-lg p-4 border-2 border-white border-opacity-30"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="text-5xl font-bold mb-2 text-white">500+</div>
                <div className="text-base text-white font-semibold">Families Supported</div>
              </motion.div>
              
              <motion.div 
                className="text-center bg-white bg-opacity-20 rounded-lg p-4 border-2 border-white border-opacity-30"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="text-5xl font-bold mb-2 text-white">200+</div>
                <div className="text-base text-white font-semibold">Volunteers Active</div>
              </motion.div>
              
              <motion.div 
                className="text-center bg-white bg-opacity-20 rounded-lg p-4 border-2 border-white border-opacity-30"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="text-5xl font-bold mb-2 text-white">95%</div>
                <div className="text-base text-white font-semibold">Success Rate</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Success Stories Preview */}
          <motion.div 
            className="mt-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-charcoal-gray mb-2">Success Stories</h3>
              <p className="text-xl text-gray-600 mb-4">Real people, real transformations</p>
              <div className="w-24 h-1 bg-gradient-to-r from-indigo-blue to-bright-orange mx-auto rounded-full"></div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div 
                className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-indigo-blue hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-blue to-blue-600 rounded-full flex items-center justify-center mr-4 shadow-md overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
                      alt="Rajesh Kumar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-gray text-lg">Rajesh Kumar</h4>
                    <p className="text-sm text-gray-600">Former Street Vendor</p>
                    <div className="flex items-center mt-1">
                      <div className="flex text-yellow-400">
                        <FiStar className="w-4 h-4 fill-current" />
                        <FiStar className="w-4 h-4 fill-current" />
                        <FiStar className="w-4 h-4 fill-current" />
                        <FiStar className="w-4 h-4 fill-current" />
                        <FiStar className="w-4 h-4 fill-current" />
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic text-lg leading-relaxed mb-4">"BharatCares helped me start my own food stall. Now I earn ₹15,000 monthly and can support my family."</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-indigo-blue font-medium">2 years ago</span>
                  <Link to="/stories" className="text-indigo-blue hover:text-indigo-700 font-medium text-sm flex items-center">
                    Read Full Story <FiArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-bright-orange hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-bright-orange to-orange-600 rounded-full flex items-center justify-center mr-4 shadow-md overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" 
                      alt="Priya Sharma"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-gray text-lg">Priya Sharma</h4>
                    <p className="text-sm text-gray-600">Education Beneficiary</p>
                    <div className="flex items-center mt-1">
                      <div className="flex text-yellow-400">
                        <FiStar className="w-4 h-4 fill-current" />
                        <FiStar className="w-4 h-4 fill-current" />
                        <FiStar className="w-4 h-4 fill-current" />
                        <FiStar className="w-4 h-4 fill-current" />
                        <FiStar className="w-4 h-4 fill-current" />
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic text-lg leading-relaxed mb-4">"I learned computer skills and got a job at a call center. My children now go to school regularly."</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-bright-orange font-medium">1 year ago</span>
                  <Link to="/stories" className="text-bright-orange hover:text-orange-700 font-medium text-sm flex items-center">
                    Read Full Story <FiArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </motion.div>

              <motion.div 
                className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-leaf-green hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-leaf-green to-green-600 rounded-full flex items-center justify-center mr-4 shadow-md overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
                      alt="Amit Patel"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-gray text-lg">Amit Patel</h4>
                    <p className="text-sm text-gray-600">Shelter Beneficiary</p>
                    <div className="flex items-center mt-1">
                      <div className="flex text-yellow-400">
                        <FiStar className="w-4 h-4 fill-current" />
                        <FiStar className="w-4 h-4 fill-current" />
                        <FiStar className="w-4 h-4 fill-current" />
                        <FiStar className="w-4 h-4 fill-current" />
                        <FiStar className="w-4 h-4 fill-current" />
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic text-lg leading-relaxed mb-4">"BharatCares provided me with shelter and job training. Now I have a stable home and work as a security guard."</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-leaf-green font-medium">6 months ago</span>
                  <Link to="/stories" className="text-leaf-green hover:text-green-700 font-medium text-sm flex items-center">
                    Read Full Story <FiArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </motion.div>
            </div>

            <motion.div 
              className="text-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Link 
                to="/stories" 
                className="inline-flex items-center px-8 py-4 bg-indigo-blue text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-lg border-2 border-white"
              >
                <FiHeart className="w-5 h-5 mr-2" />
                View All Success Stories
                <FiArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Programs Section */}
      <AnimatedSection className="py-16 bg-light-cool-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-gray mb-4">Our Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive support programs designed to address the root causes of poverty and create lasting change.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {programs.map((program, index) => {
              const IconComponent = program.icon;
              return (
                <motion.div 
                  key={program.title}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-light-cool-gray overflow-hidden"
                >
                  <div className="relative mb-4">
                    <img 
                      src={program.image} 
                      alt={program.title}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div className="absolute top-2 right-2">
                      <div className={`w-10 h-10 bg-${program.color} bg-opacity-10 rounded-lg flex items-center justify-center`}>
                        <IconComponent className={`w-5 h-5 text-${program.color}`} />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-charcoal-gray mb-2">{program.title}</h3>
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link 
                      to="/programs" 
                      className="inline-flex items-center text-indigo-blue hover:text-indigo-700 font-medium"
                    >
                      Learn More <FiArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Impact Stats */}
      <AnimatedSection className="py-16 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-gray mb-4">Our Impact</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories of transformation and the measurable difference we're making in communities.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div 
              className="bg-light-cool-gray rounded-lg p-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-charcoal-gray mb-4">Before & After</h3>
              <div className="space-y-4">
                {transformations.map((item, index) => (
                  <motion.div 
                    key={item.aspect}
                    className="flex items-center space-x-4"
                    whileHover={{ x: 10 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="w-3 h-3 bg-crimson-red rounded-full"></div>
                    <span className="text-gray-600">{item.aspect}</span>
                    <FiArrowRight className="w-4 h-4 text-gray-400" />
                    <span className="text-charcoal-gray font-medium">{item.after}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="bg-light-cool-gray rounded-lg p-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-charcoal-gray mb-4">Quick Facts</h3>
              <div className="grid grid-cols-2 gap-4">
                {impactStats.map((stat, index) => (
                  <motion.div 
                    key={stat.label}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className={`text-3xl font-bold text-${stat.color} mb-1`}>
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonials */}
      <AnimatedSection className="py-16 bg-light-cool-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-gray mb-4">Stories of Transformation</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real people, real impact. Hear from those whose lives have been changed through our programs.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                variants={itemVariants}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.photo} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-indigo-blue"
                  />
                  <div>
                    <h4 className="font-semibold text-charcoal-gray">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <div className="flex items-center mt-1">
                      <div className="flex text-yellow-400">
                        <FiStar className="w-3 h-3 fill-current" />
                        <FiStar className="w-3 h-3 fill-current" />
                        <FiStar className="w-3 h-3 fill-current" />
                        <FiStar className="w-3 h-3 fill-current" />
                        <FiStar className="w-3 h-3 fill-current" />
                      </div>
                    </div>
                  </div>
                </div>
                <blockquote className="text-gray-700 mb-4 italic leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <Link 
                  to="/stories" 
                  className="text-indigo-blue hover:text-indigo-700 font-medium text-sm flex items-center"
                >
                  {testimonial.story} <FiArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Partners Section */}
      <AnimatedSection className="py-16 bg-light-cool-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-gray mb-4">Our Partners</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Working together with leading organizations to create lasting positive change in our community.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-blue to-bright-orange mx-auto mt-4 rounded-full"></div>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div 
              className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop" 
                  alt="Government Partnership"
                  className="w-12 h-12 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-lg font-semibold text-charcoal-gray mb-2">Government</h3>
              <p className="text-gray-600 text-sm">Official support and collaboration</p>
            </motion.div>

            <motion.div 
              className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=150&h=150&fit=crop" 
                  alt="Corporate Partnership"
                  className="w-12 h-12 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-lg font-semibold text-charcoal-gray mb-2">Corporate</h3>
              <p className="text-gray-600 text-sm">Business partnerships for impact</p>
            </motion.div>

            <motion.div 
              className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=150&h=150&fit=crop" 
                  alt="NGO Partnership"
                  className="w-12 h-12 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-lg font-semibold text-charcoal-gray mb-2">NGOs</h3>
              <p className="text-gray-600 text-sm">Non-profit organizations network</p>
            </motion.div>

            <motion.div 
              className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=150&h=150&fit=crop" 
                  alt="Educational Partnership"
                  className="w-12 h-12 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-lg font-semibold text-charcoal-gray mb-2">Education</h3>
              <p className="text-gray-600 text-sm">Schools and training institutions</p>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* News & Events */}
      <AnimatedSection className="py-16 bg-light-cool-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid lg:grid-cols-2 gap-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Latest News */}
            <div>
              <h2 className="text-3xl font-bold text-charcoal-gray mb-8">Latest News</h2>
              <div className="space-y-6">
                {latestNews.map((news, index) => (
                  <motion.div
                    key={news.title}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                    whileHover={{ y: -2 }}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <img 
                      src={news.image} 
                      alt={news.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-6">
                      <p className="text-sm text-gray-500 mb-2">{news.date}</p>
                      <h3 className="text-lg font-semibold text-charcoal-gray mb-2">{news.title}</h3>
                      <p className="text-gray-600 mb-4">{news.excerpt}</p>
                      <Link 
                        to={news.link}
                        className="text-indigo-blue hover:text-indigo-700 font-medium"
                      >
                        Read More →
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div>
              <h2 className="text-3xl font-bold text-charcoal-gray mb-8">Upcoming Events</h2>
              <div className="space-y-6">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={event.title}
                    className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                    whileHover={{ y: -2 }}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-bright-orange bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FiCalendar className="w-6 h-6 text-bright-orange" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-charcoal-gray mb-1">{event.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{event.date} • {event.time}</p>
                        <p className="text-sm text-gray-600 mb-3 flex items-center">
                          <FiMapPin className="w-4 h-4 mr-1" />
                          {event.location}
                        </p>
                        <AnimatedButton
                          variant="outline"
                          size="sm"
                          as={Link}
                          to="/register"
                          className="border-bright-orange text-bright-orange hover:bg-bright-orange hover:text-white"
                        >
                          {event.registration}
                        </AnimatedButton>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Volunteer Spotlight */}
      <AnimatedSection className="py-16 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-gray mb-4">Volunteer Spotlight</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the incredible people who make our mission possible.
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-light-cool-gray rounded-lg p-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={volunteerSpotlight.photo} 
                  alt={volunteerSpotlight.name}
                  className="w-32 h-32 rounded-full object-cover"
                />
              </motion.div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-charcoal-gray mb-2">{volunteerSpotlight.name}</h3>
                <p className="text-lg text-indigo-blue mb-4">{volunteerSpotlight.role}</p>
                <p className="text-gray-700 mb-4">{volunteerSpotlight.story}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <FiStar className="w-4 h-4 text-bright-orange" />
                    <span>{volunteerSpotlight.impact}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* FAQ Section */}
      <AnimatedSection className="py-16 bg-light-cool-gray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-gray mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quick answers to common questions about our work and how you can get involved.
            </p>
          </motion.div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-semibold text-charcoal-gray">{faq.question}</span>
                  {activeFAQ === index ? (
                    <FiChevronUp className="w-5 h-5 text-indigo-blue" />
                  ) : (
                    <FiChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {activeFAQ === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4"
                  >
                    <p className="text-gray-600">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Newsletter Signup */}
      <AnimatedSection className="py-16 accent-gradient text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Stay Connected
          </motion.h2>
          
          <motion.p 
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Stay updated on our impact, events, and success stories. Join our community of changemakers.
          </motion.p>
          
          <motion.form 
            onSubmit={handleNewsletterSubmit}
            className="max-w-md mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Your Name"
                value={newsletterName}
                onChange={(e) => setNewsletterName(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <AnimatedButton
                type="submit"
                variant="outline"
                size="md"
                className="bg-white text-indigo-blue hover:bg-indigo-blue hover:text-white"
              >
                Subscribe
              </AnimatedButton>
            </div>
            <p className="text-sm mt-3 opacity-90">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </motion.form>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-16 hero-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Join Us in Making a Difference
          </motion.h2>
          
          <motion.p 
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Every contribution, whether time, skills, or resources, helps us create lasting positive change in our community.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <AnimatedButton
              variant="outline"
              size="lg"
              as={Link}
              to="/register"
              className="group bg-white text-indigo-blue hover:bg-indigo-blue hover:text-white"
            >
              <FiUsers className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              <span>Become a Volunteer</span>
            </AnimatedButton>
            
            <AnimatedButton
              variant="primary"
              size="lg"
              as={Link}
              to="/donate"
              className="group bg-bright-orange hover:bg-orange-600"
            >
              <FiGift className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              <span>Make a Donation</span>
            </AnimatedButton>
          </motion.div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default HomePage; 