import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiBookOpen, FiTrendingUp, FiHeart, FiUsers, FiGift, FiArrowRight } from 'react-icons/fi';

const ProgramsPage = () => {
  const programs = [
    {
      id: 1,
      title: "Emergency Shelter",
      description: "Providing safe, temporary housing for individuals and families in crisis situations.",
      icon: FiHome,
      color: "blue",
      impact: "200+ shelters provided",
      details: [
        "24/7 emergency shelter access",
        "Safe and clean accommodation",
        "Basic amenities and hygiene facilities",
        "Case management and support services",
        "Transition planning and follow-up"
      ]
    },
    {
      id: 2,
      title: "Education & Skills",
      description: "Offering literacy programs, vocational training, and life skills development.",
      icon: FiBookOpen,
      color: "green",
      impact: "150+ students supported",
      details: [
        "Basic literacy and numeracy programs",
        "Vocational training in high-demand skills",
        "Computer literacy and digital skills",
        "Life skills and personal development",
        "Career counseling and guidance"
      ]
    },
    {
      id: 3,
      title: "Job Placement",
      description: "Connecting individuals with employment opportunities and career development support.",
      icon: FiTrendingUp,
      color: "orange",
      impact: "50+ jobs created",
      details: [
        "Job readiness training and workshops",
        "Resume building and interview preparation",
        "Employer partnerships and networking",
        "Ongoing career support and mentoring",
        "Entrepreneurship training and support"
      ]
    },
    {
      id: 4,
      title: "Health & Wellness",
      description: "Access to healthcare, mental health support, and wellness programs.",
      icon: FiHeart,
      color: "purple",
      impact: "300+ health consultations",
      details: [
        "Primary healthcare services",
        "Mental health counseling and support",
        "Health education and awareness programs",
        "Nutrition and wellness workshops",
        "Referral services to specialized care"
      ]
    },
    {
      id: 5,
      title: "Community Building",
      description: "Creating supportive networks and fostering social connections.",
      icon: FiUsers,
      color: "teal",
      impact: "25+ community groups",
      details: [
        "Support group formation and facilitation",
        "Community events and activities",
        "Peer mentoring programs",
        "Social integration initiatives",
        "Community leadership development"
      ]
    },
    {
      id: 6,
      title: "Food Security",
      description: "Providing nutritious meals and food assistance to those in need.",
      icon: FiGift,
      color: "red",
      impact: "500+ meals served daily",
      details: [
        "Daily meal programs for vulnerable populations",
        "Food bank and distribution services",
        "Nutrition education and cooking classes",
        "Community kitchen initiatives",
        "Emergency food assistance"
      ]
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: "from-blue-500 to-blue-600",
      green: "from-green-500 to-green-600",
      orange: "from-orange-500 to-orange-600",
      purple: "from-purple-500 to-purple-600",
      teal: "from-teal-500 to-teal-600",
      red: "from-red-500 to-red-600"
    };
    return colorMap[color] || "from-gray-500 to-gray-600";
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Programs
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Comprehensive support programs designed to address the root causes of poverty and create lasting change.
          </p>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Support Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our programs are designed to work together, providing holistic support that addresses immediate needs while building long-term capacity and resilience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => {
              const IconComponent = program.icon;
              return (
                <div key={program.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className={`h-48 bg-gradient-to-r ${getColorClasses(program.color)} flex items-center justify-center`}>
                    <IconComponent className="w-16 h-16 text-white" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{program.title}</h3>
                    <p className="text-gray-600 mb-4">{program.description}</p>
                    <div className="text-sm text-gray-500 mb-4">
                      <strong>Impact:</strong> {program.impact}
                    </div>
                    <Link 
                      to={`/programs/${program.id}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Learn More <FiArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Program Details
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each program is carefully designed to address specific needs while contributing to our overall mission of creating lasting positive change.
            </p>
          </div>

          <div className="space-y-12">
            {programs.map((program, index) => {
              const IconComponent = program.icon;
              return (
                <div key={program.id} className={`bg-white rounded-lg shadow-md p-8 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className="lg:flex lg:items-center lg:space-x-8">
                    <div className="lg:w-1/3 mb-6 lg:mb-0">
                      <div className={`w-24 h-24 bg-gradient-to-r ${getColorClasses(program.color)} rounded-lg flex items-center justify-center mx-auto lg:mx-0`}>
                        <IconComponent className="w-12 h-12 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mt-4 text-center lg:text-left">{program.title}</h3>
                      <p className="text-gray-600 mt-2 text-center lg:text-left">{program.description}</p>
                      <div className="mt-4 text-center lg:text-left">
                        <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                          {program.impact}
                        </span>
                      </div>
                    </div>
                    <div className="lg:w-2/3">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">What We Provide:</h4>
                      <ul className="space-y-2">
                        {program.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-600">{detail}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6">
                        <Link
                          to="/register"
                          className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                          Get Involved <FiArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Impact Across Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real numbers that demonstrate the difference our programs make in people's lives.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-sm text-gray-600">Meals Served Daily</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">200+</div>
              <div className="text-sm text-gray-600">Shelters Provided</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">150+</div>
              <div className="text-sm text-gray-600">Students Supported</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-sm text-gray-600">Jobs Created</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Us in Making a Difference
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Every program needs dedicated volunteers and supporters to reach its full potential. Find your way to contribute.
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
              Support Our Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgramsPage; 