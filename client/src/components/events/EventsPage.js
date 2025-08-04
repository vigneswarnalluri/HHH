import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiMapPin, FiClock, FiUsers, FiHeart, FiExternalLink } from 'react-icons/fi';

const EventsPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('upcoming');

  const events = [
    {
      id: 1,
      title: "Community Health Camp",
      type: "health",
      date: "2024-04-15",
      time: "9:00 AM - 5:00 PM",
      location: "Community Center, Hyderabad",
      description: "Free health check-ups, consultations, and awareness programs for the community.",
      status: "upcoming",
      registration: true,
      maxParticipants: 200,
      currentParticipants: 150,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Skill Development Workshop",
      type: "education",
      date: "2024-04-20",
      time: "10:00 AM - 4:00 PM",
      location: "Training Center, Hyderabad",
      description: "Computer literacy and digital skills training for job seekers.",
      status: "upcoming",
      registration: true,
      maxParticipants: 50,
      currentParticipants: 35,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Food Distribution Drive",
      type: "food",
      date: "2024-04-25",
      time: "8:00 AM - 2:00 PM",
      location: "Multiple Locations, Hyderabad",
      description: "Large-scale food distribution to vulnerable communities across the city.",
      status: "upcoming",
      registration: true,
      maxParticipants: 100,
      currentParticipants: 75,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      title: "Annual Fundraising Gala",
      type: "fundraising",
      date: "2024-05-10",
      time: "7:00 PM - 11:00 PM",
      location: "Grand Hotel, Hyderabad",
      description: "Annual fundraising event with dinner, entertainment, and silent auction.",
      status: "upcoming",
      registration: true,
      maxParticipants: 300,
      currentParticipants: 250,
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      title: "Mental Health Awareness Seminar",
      type: "health",
      date: "2024-03-20",
      time: "2:00 PM - 5:00 PM",
      location: "Conference Hall, Hyderabad",
      description: "Educational seminar on mental health awareness and support resources.",
      status: "past",
      registration: false,
      maxParticipants: 100,
      currentParticipants: 85,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      title: "Job Fair 2024",
      type: "employment",
      date: "2024-03-15",
      time: "10:00 AM - 6:00 PM",
      location: "Exhibition Center, Hyderabad",
      description: "Job fair connecting job seekers with potential employers from various industries.",
      status: "past",
      registration: false,
      maxParticipants: 500,
      currentParticipants: 450,
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop"
    }
  ];

  const getTypeColor = (type) => {
    const colorMap = {
      health: "blue",
      education: "green",
      food: "orange",
      employment: "purple",
      fundraising: "red",
      community: "teal"
    };
    return colorMap[type] || "gray";
  };

  const getTypeIcon = (type) => {
    const iconMap = {
      health: FiHeart,
      education: FiUsers,
      food: FiCalendar,
      employment: FiUsers,
      fundraising: FiHeart,
      community: FiUsers
    };
    return iconMap[type] || FiCalendar;
  };

  const filteredEvents = events.filter(event => {
    if (selectedFilter === 'upcoming') return event.status === 'upcoming';
    if (selectedFilter === 'past') return event.status === 'past';
    return true;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Events & Activities
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Join us in our mission to create positive change through community events, workshops, and awareness programs.
          </p>
        </div>
      </section>

      {/* Event Filter */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setSelectedFilter('upcoming')}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedFilter === 'upcoming'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setSelectedFilter('past')}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedFilter === 'past'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Past Events
            </button>
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedFilter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Events
            </button>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {selectedFilter === 'upcoming' ? 'Upcoming Events' : 
               selectedFilter === 'past' ? 'Past Events' : 'All Events'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {selectedFilter === 'upcoming' ? 'Join us for these upcoming events and make a difference in your community.' :
               selectedFilter === 'past' ? 'Take a look at our recent events and the impact we\'ve made together.' :
               'Browse through all our events, both upcoming and past, to see the full scope of our community engagement.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => {
              const IconComponent = getTypeIcon(event.type);
              const typeColor = getTypeColor(event.type);
              const colorClasses = {
                blue: "bg-blue-100 text-blue-800",
                green: "bg-green-100 text-green-800",
                orange: "bg-orange-100 text-orange-800",
                purple: "bg-purple-100 text-purple-800",
                red: "bg-red-100 text-red-800",
                teal: "bg-teal-100 text-teal-800",
                gray: "bg-gray-100 text-gray-800"
              };

              return (
                <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <IconComponent className="w-16 h-16 text-gray-400" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`inline-block text-xs font-medium px-2 py-1 rounded ${colorClasses[typeColor]}`}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </span>
                      {event.registration && event.status === 'upcoming' && (
                        <span className="text-xs text-green-600 font-medium">
                          Registration Open
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    
                    <div className="space-y-2 text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-2">
                        <FiCalendar className="w-4 h-4" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FiClock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FiMapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      {event.registration && event.status === 'upcoming' && (
                        <div className="flex items-center space-x-2">
                          <FiUsers className="w-4 h-4" />
                          <span>{event.currentParticipants}/{event.maxParticipants} participants</span>
                        </div>
                      )}
                    </div>

                    {event.registration && event.status === 'upcoming' ? (
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                        <FiExternalLink className="w-4 h-4" />
                        <span>Register Now</span>
                      </button>
                    ) : (
                      <div className="text-center text-gray-500 text-sm">
                        {event.status === 'past' ? 'Event Completed' : 'Registration Closed'}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <FiCalendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Events Found</h3>
              <p className="text-gray-600">
                {selectedFilter === 'upcoming' ? 'No upcoming events at the moment. Check back soon!' :
                 selectedFilter === 'past' ? 'No past events to display.' :
                 'No events found with the current filter.'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Event Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Event Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We organize various types of events to address different community needs and create maximum impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiHeart className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Health & Wellness</h3>
              <p className="text-gray-600 text-sm">
                Health camps, awareness programs, and wellness workshops to promote community health.
              </p>
            </div>

            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUsers className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Education & Skills</h3>
              <p className="text-gray-600 text-sm">
                Workshops, training programs, and skill development sessions for personal and professional growth.
              </p>
            </div>

            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCalendar className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Food Security</h3>
              <p className="text-gray-600 text-sm">
                Food distribution drives, nutrition awareness, and community kitchen initiatives.
              </p>
            </div>

            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUsers className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Employment</h3>
              <p className="text-gray-600 text-sm">
                Job fairs, career counseling, and employment support programs for job seekers.
              </p>
            </div>

            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiHeart className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fundraising</h3>
              <p className="text-gray-600 text-sm">
                Galas, charity events, and fundraising campaigns to support our programs.
              </p>
            </div>

            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUsers className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Community Building</h3>
              <p className="text-gray-600 text-sm">
                Community gatherings, cultural events, and social integration activities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get Involved in Our Events
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you want to attend, volunteer, or organize an event, there are many ways to participate and make a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Become a Volunteer
            </Link>
            <Link
              to="/donate"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Support Our Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventsPage; 