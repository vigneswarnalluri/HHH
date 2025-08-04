const axios = require('axios');

async function testPostRegistration() {
  console.log('Testing post-registration flow...');
  
  try {
    // Step 1: Register a new user
    console.log('\n1. Registering new user...');
    const registerResponse = await axios.post('http://localhost:5000/api/auth/register', {
      email: 'posttest@example.com',
      password: 'posttest123',
      phone: '9876543210',
      role: 'volunteer'
    });
    
    console.log('✅ Registration successful:', registerResponse.data.message);
    const token = registerResponse.data.token;
    const user = registerResponse.data.user;
    
    console.log('User created:', {
      id: user.id,
      email: user.email,
      role: user.role
    });
    
    // Step 2: Test /api/auth/me endpoint
    console.log('\n2. Testing /api/auth/me endpoint...');
    const meResponse = await axios.get('http://localhost:5000/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('✅ /api/auth/me successful');
    console.log('User from /me:', {
      id: meResponse.data.user.id,
      email: meResponse.data.user.email,
      role: meResponse.data.user.role
    });
    
    // Step 3: Test volunteer profile endpoint
    console.log('\n3. Testing volunteer profile endpoint...');
    const profileResponse = await axios.get('http://localhost:5000/api/volunteer/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('✅ Volunteer profile endpoint successful');
    console.log('Profile data:', profileResponse.data);
    
    console.log('\n🎉 Post-registration test completed successfully!');
    console.log('✅ The user should be able to access the volunteer form');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data?.error || error.message);
    if (error.response?.data) {
      console.error('Response data:', error.response.data);
    }
  }
}

testPostRegistration(); 