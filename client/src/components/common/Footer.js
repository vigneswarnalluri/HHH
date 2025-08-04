import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <FiHeart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">BharatCares</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Transforming lives through comprehensive support and sustainable solutions. 
              We believe every individual deserves dignity, opportunity, and hope.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-gray-300 hover:text-white transition-colors">
                  Our Programs
                </Link>
              </li>
              <li>
                <Link to="/stories" className="text-gray-300 hover:text-white transition-colors">
                  Impact Stories
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-300 hover:text-white transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-gray-300 hover:text-white transition-colors">
                  Donate
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <FiMapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">
                  Hyderabad, Telangana, India
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <FiPhone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">
                  +91 98765 43210
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <FiMail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">
                  info@bharatcares.org
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Facts */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <h3 className="text-lg font-semibold mb-6 text-center">Our Impact in Numbers</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">500+</div>
              <div className="text-sm text-gray-400">Meals Served Daily</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">200+</div>
              <div className="text-sm text-gray-400">Shelters Provided</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">150+</div>
              <div className="text-sm text-gray-400">Students Supported</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">50+</div>
              <div className="text-sm text-gray-400">Jobs Created</div>
            </div>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2024 BharatCares. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Transparency Report
              </a>
            </div>
          </div>
        </div>

        {/* Accreditation */}
        <div className="mt-6 pt-6 border-t border-gray-800">
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-2">
              Accredited by Government of India • 80G Tax Exempt • FCRA Registered
            </p>
            <div className="flex justify-center space-x-4">
              <div className="text-xs text-gray-500 bg-gray-800 px-3 py-1 rounded">
                ISO 9001:2015
              </div>
              <div className="text-xs text-gray-500 bg-gray-800 px-3 py-1 rounded">
                NGO Darpan
              </div>
              <div className="text-xs text-gray-500 bg-gray-800 px-3 py-1 rounded">
                CSR Partner
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 