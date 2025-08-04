import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiCalendar, FiMapPin, FiArrowRight, FiMessageSquare } from 'react-icons/fi';

const StoriesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const stories = [
    {
      id: 1,
      title: "From Street to Software Engineer",
      category: "education",
      author: "Rahul Kumar",
      date: "March 2024",
      location: "Hyderabad",
      excerpt: "Rahul's journey from living on the streets to becoming a successful software engineer shows the transformative power of education and support.",
      fullStory: "Rahul was just 12 years old when he found himself living on the streets of Hyderabad. With no family support and limited education, his future seemed bleak. Through our Education & Skills program, Rahul received basic literacy training, computer skills, and eventually enrolled in our vocational training program. Today, he works as a software engineer at a leading tech company, earning ₹50,000 per month and supporting his family.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      impact: "Education & Skills"
    },
    {
      id: 2,
      title: "A New Beginning for Priya's Family",
      category: "shelter",
      author: "Priya Sharma",
      date: "February 2024",
      location: "Hyderabad",
      excerpt: "Priya and her children found safety and stability through our emergency shelter program, leading to permanent housing and employment.",
      fullStory: "When Priya and her three children were evicted from their home, they had nowhere to go. Our Emergency Shelter program provided them with safe accommodation, basic amenities, and case management support. Within three months, Priya secured a job as a teacher, and the family moved into their own apartment. Today, all three children are back in school and thriving.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop",
      impact: "Emergency Shelter"
    },
    {
      id: 3,
      title: "Building a Community Kitchen",
      category: "community",
      author: "Amit Patel",
      date: "January 2024",
      location: "Hyderabad",
      excerpt: "Amit's initiative to start a community kitchen has provided meals to over 200 people daily while creating employment opportunities.",
      fullStory: "Amit, a former beneficiary of our programs, wanted to give back to his community. With our support, he started a community kitchen that serves nutritious meals to vulnerable populations. The kitchen now employs 8 people and serves over 200 meals daily. Amit's story demonstrates how our programs create ripple effects of positive change throughout communities.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      impact: "Community Building"
    },
    {
      id: 4,
      title: "Mental Health Support Transforms Lives",
      category: "health",
      author: "Dr. Meera Reddy",
      date: "December 2023",
      location: "Hyderabad",
      excerpt: "Our mental health program has helped hundreds of individuals overcome trauma and build resilience.",
      fullStory: "Through our Health & Wellness program, we provide mental health counseling and support to individuals who have experienced trauma, homelessness, or other challenging circumstances. Dr. Meera Reddy, our lead counselor, has helped over 300 people access the support they need to rebuild their lives. The program includes individual counseling, group therapy, and community support networks.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      impact: "Health & Wellness"
    },
    {
      id: 5,
      title: "Job Placement Success Story",
      category: "employment",
      author: "Suresh Kumar",
      date: "November 2023",
      location: "Hyderabad",
      excerpt: "Suresh's journey from unemployment to a successful career in hospitality demonstrates the power of targeted job training.",
      fullStory: "Suresh struggled to find stable employment after losing his job during the pandemic. Through our Job Placement program, he received training in hospitality management, resume building, and interview preparation. Today, Suresh works as a restaurant manager, earning ₹35,000 per month and mentoring other program participants.",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
      impact: "Job Placement"
    },
    {
      id: 6,
      title: "Food Security Initiative Impact",
      category: "food",
      author: "Community Report",
      date: "October 2023",
      location: "Hyderabad",
      excerpt: "Our food security program has provided over 100,000 meals and created sustainable food systems in vulnerable communities.",
      fullStory: "Our Food Security program addresses hunger through multiple approaches: daily meal programs, food bank services, nutrition education, and community kitchen initiatives. We've served over 100,000 meals and helped establish 15 community kitchens that provide employment while addressing food insecurity. The program also includes nutrition education to promote healthy eating habits.",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
      impact: "Food Security"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Stories' },
    { id: 'education', name: 'Education & Skills' },
    { id: 'shelter', name: 'Emergency Shelter' },
    { id: 'community', name: 'Community Building' },
    { id: 'health', name: 'Health & Wellness' },
    { id: 'employment', name: 'Job Placement' },
    { id: 'food', name: 'Food Security' }
  ];

  const filteredStories = selectedCategory === 'all' 
    ? stories 
    : stories.filter(story => story.category === selectedCategory);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Impact Stories
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Real stories of transformation and the measurable difference we're making in communities.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Stories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Stories of Transformation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These are just a few of the thousands of lives we've touched through our comprehensive programs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStories.map((story) => (
              <div key={story.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <FiUser className="w-16 h-16 text-gray-400" />
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                      {story.impact}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{story.title}</h3>
                  <p className="text-gray-600 mb-4">{story.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <FiUser className="w-4 h-4" />
                      <span>{story.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FiCalendar className="w-4 h-4" />
                      <span>{story.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500 mb-4">
                    <FiMapPin className="w-4 h-4" />
                    <span>{story.location}</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
                    Read Full Story <FiArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Beneficiaries Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear directly from the people whose lives have been transformed through our programs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <FiMessageSquare className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-gray-600 mb-4">
                "BharatCares didn't just give me a place to stay; they gave me hope and the tools to build a better future for my family."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                  <FiUser className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Priya Sharma</p>
                  <p className="text-sm text-gray-500">Former beneficiary</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <FiMessageSquare className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-gray-600 mb-4">
                "The education program changed my life. I went from being illiterate to working as a software engineer."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                  <FiUser className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Rahul Kumar</p>
                  <p className="text-sm text-gray-500">Software Engineer</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <FiMessageSquare className="w-8 h-8 text-orange-600" />
              </div>
              <p className="text-gray-600 mb-4">
                "The job placement program helped me find not just a job, but a career I'm passionate about."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                  <FiUser className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Suresh Kumar</p>
                  <p className="text-sm text-gray-500">Restaurant Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-xl max-w-3xl mx-auto">
              Every number represents a life changed, a family supported, and a community strengthened.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-sm opacity-90">Lives Touched</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-sm opacity-90">Meals Daily</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">200+</div>
              <div className="text-sm opacity-90">Shelters Provided</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-sm opacity-90">Students Supported</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Be Part of These Stories
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Every volunteer, donor, and supporter helps us create more stories of transformation and hope.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Become a Volunteer
            </Link>
            <Link
              to="/donate"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Support Our Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StoriesPage; 