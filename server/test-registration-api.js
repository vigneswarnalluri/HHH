const axios = require('axios');

async function testRegistrationAPI() {
  console.log('Testing registration API endpoint...');
  
  try {
    // Test registration
    console.log('\n1. Testing user registration...');
    const registerResponse = await axios.post('http://localhost:5000/api/auth/register', {
      email: 'newuser@example.com',
      password: 'newuser123',
      phone: '9876543210',
      role: 'volunteer'
    });
    
    console.log('✅ Registration successful:', registerResponse.data.message);
    console.log('Token received:', !!registerResponse.data.token);
    console.log('User created:', {
      id: registerResponse.data.user.id,
      email: registerResponse.data.user.email,
      role: registerResponse.data.user.role
    });
    
    // Test login with the new user
    console.log('\n2. Testing login with new user...');
    const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'newuser@example.com',
      password: 'newuser123'
    });
    
    console.log('✅ Login successful:', loginResponse.data.message);
    console.log('Login token received:', !!loginResponse.data.token);
    
    console.log('\n🎉 Registration API test completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data?.error || error.message);
    if (error.response?.data) {
      console.error('Response data:', error.response.data);
    }
  }
}

testRegistrationAPI(); 