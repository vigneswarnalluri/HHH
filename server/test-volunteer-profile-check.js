const axios = require('axios');

async function testVolunteerProfileCheck() {
  try {
    console.log('🔍 Testing volunteer profile check...');

    // First, login as a volunteer
    const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'vigneswarnalluri10@gmail.com',
      password: 'password123'
    });

    const token = loginResponse.data.token;
    console.log('✅ Login successful, token received');

    // Test the profile check endpoint
    const profileResponse = await axios.get('http://localhost:5000/api/volunteer/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    console.log('✅ Profile check successful!');
    console.log('Profile data:', profileResponse.data);
    console.log('Has profile:', !!profileResponse.data.profile);

  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

testVolunteerProfileCheck(); 