const axios = require('axios');

async function testSimpleLogin() {
  try {
    console.log('🔍 Testing simple login...');

    // Test login
    const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'vigneswarnalluri10@gmail.com',
      password: 'password123'
    });

    console.log('✅ Login successful!');
    console.log('User data:', loginResponse.data.user);
    console.log('Token received:', !!loginResponse.data.token);

  } catch (error) {
    console.error('❌ Login failed:', error.response?.data || error.message);
  }
}

testSimpleLogin(); 