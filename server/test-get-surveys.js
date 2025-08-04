const axios = require('axios');
const jwt = require('jsonwebtoken');
const userService = require('./services/userService');

async function testGetSurveys() {
  try {
    console.log('🔍 Testing GET surveys endpoint...\n');

    // Get a real user
    const users = await userService.getAllUsers();
    const testUser = users.find(user => user.role === 'volunteer');
    
    if (!testUser) {
      console.error('❌ No volunteer users found');
      return;
    }

    console.log('✅ Found volunteer user:', testUser.email);

    // Create a JWT token
    const token = jwt.sign(
      { userId: testUser.id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('🔍 Sending GET request to /api/volunteer/surveys...');

    try {
      const response = await axios.get('http://localhost:5000/api/volunteer/surveys', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('✅ GET surveys successful!');
      console.log('Status:', response.status);
      console.log('Response data:', response.data);
      
      if (response.data.surveys) {
        console.log(`📊 Found ${response.data.surveys.length} surveys`);
        response.data.surveys.forEach((survey, index) => {
          console.log(`${index + 1}. Survey ID: ${survey.id}`);
          console.log(`   Beggar: ${survey.beggar_name || 'N/A'}`);
          console.log(`   Date: ${survey.survey_date}`);
        });
      }
      
      if (response.data.surveyCount !== undefined) {
        console.log(`📈 Survey count: ${response.data.surveyCount}`);
      }
    } catch (error) {
      console.log('❌ GET surveys failed');
      console.log('Status:', error.response?.status);
      console.log('Error data:', error.response?.data);
    }

  } catch (error) {
    console.error('❌ Test error:', error);
  }
}

testGetSurveys(); 