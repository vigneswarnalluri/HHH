const axios = require('axios');
const jwt = require('jsonwebtoken');
const userService = require('./services/userService');

async function testExactData() {
  try {
    console.log('🔍 Testing with exact frontend data...\n');

    // Get a real user
    const users = await userService.getAllUsers();
    const testUser = users.find(user => user.role === 'volunteer');
    
    if (!testUser) {
      console.error('❌ No volunteer users found');
      return;
    }

    // Create a JWT token
    const token = jwt.sign(
      { userId: testUser.id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Test survey data that matches exactly what the frontend sends
    const testSurveyData = {
      beggar_name: 'hanif',
      beggar_age: null, // "Not provided" becomes null
      beggar_gender: 'male',
      beggar_photo_url: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...', // Base64 image
      location_coordinates: [16.316632, 80.425160],
      location_address: 'Not provided',
      survey_notes: null // If no notes provided
    };

    console.log('📋 Exact survey data being sent:');
    console.log('- beggar_name:', testSurveyData.beggar_name);
    console.log('- beggar_age:', testSurveyData.beggar_age);
    console.log('- beggar_gender:', testSurveyData.beggar_gender);
    console.log('- beggar_photo_url length:', testSurveyData.beggar_photo_url.length);
    console.log('- location_coordinates:', testSurveyData.location_coordinates);
    console.log('- location_address:', testSurveyData.location_address);
    console.log('- survey_notes:', testSurveyData.survey_notes);

    console.log('\n🔍 Sending request to server...');

    try {
      const response = await axios.post('http://localhost:5000/api/volunteer/surveys', testSurveyData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('✅ Survey created successfully!');
      console.log('Response:', response.data);
    } catch (error) {
      console.log('❌ Survey creation failed');
      console.log('Status:', error.response?.status);
      console.log('Error data:', error.response?.data);
      
      if (error.response?.data?.errors) {
        console.log('\n📋 Validation errors:');
        error.response.data.errors.forEach((err, index) => {
          console.log(`${index + 1}. Field: ${err.path}`);
          console.log(`   Value: ${err.value}`);
          console.log(`   Message: ${err.msg}`);
        });
      }
    }

  } catch (error) {
    console.error('❌ Test error:', error);
  }
}

testExactData(); 