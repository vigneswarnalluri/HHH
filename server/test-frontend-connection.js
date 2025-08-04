const axios = require('axios');

async function testFrontendConnection() {
  try {
    console.log('🔍 Testing frontend connection to backend...\n');

    // Test 1: Check if server is responding
    console.log('1. Testing server connectivity...');
    try {
      const response = await axios.get('http://localhost:5000/api/auth/me');
      console.log('Server response status:', response.status);
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✅ Server is responding (401 is expected without token)');
      } else {
        console.log('Server error:', error.message);
      }
    }

    // Test 2: Test with a valid token
    console.log('\n2. Testing with valid token...');
    
    // Create a test token (this is just for testing the connection)
    const jwt = require('jsonwebtoken');
    const userService = require('./services/userService');
    
    const users = await userService.getAllUsers();
    const testUser = users.find(user => user.role === 'volunteer');
    
    if (testUser) {
      const token = jwt.sign(
        { userId: testUser.id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      const authResponse = await axios.get('http://localhost:5000/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Auth response status:', authResponse.status);
      console.log('✅ Authentication working');
      console.log('User:', authResponse.data.user.email);

      // Test 3: Test survey endpoint
      console.log('\n3. Testing survey endpoint...');
      try {
        const surveyResponse = await axios.get('http://localhost:5000/api/volunteer/surveys', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('Survey endpoint status:', surveyResponse.status);
        console.log('✅ Survey endpoint working');
        console.log('Surveys count:', surveyResponse.data.surveyCount);
      } catch (error) {
        console.log('❌ Survey endpoint failed');
        console.log('Error:', error.response?.data || error.message);
      }
    }

    console.log('\n🎯 Connection test completed!');
    console.log('If all tests pass, the issue is likely in the frontend code.');

  } catch (error) {
    console.error('❌ Connection test failed:', error);
  }
}

testFrontendConnection(); 