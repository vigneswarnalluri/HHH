const axios = require('axios');

async function testAPIEndpoint() {
  console.log('Testing API endpoint...');
  
  try {
    // Test 1: Check if server is responding
    console.log('\n1. Testing server health...');
    try {
      const healthResponse = await axios.get('http://localhost:5000/api/health');
      console.log('✅ Server health check:', healthResponse.status);
    } catch (error) {
      console.log('❌ Server health check failed:', error.message);
    }
    
    // Test 2: Test login endpoint
    console.log('\n2. Testing login endpoint...');
    try {
      const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
        email: 'volunteer1@example.com',
        password: 'volunteer123'
      });
      console.log('✅ Login successful:', loginResponse.data.message);
      console.log('Token received:', !!loginResponse.data.token);
      
      const token = loginResponse.data.token;
      
      // Test 3: Test profile submission with token
      console.log('\n3. Testing profile submission endpoint...');
      try {
        const submitResponse = await axios.post('http://localhost:5000/api/volunteer/profile/submit', {}, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        console.log('✅ Profile submission successful:', submitResponse.data.message);
      } catch (submitError) {
        console.log('❌ Profile submission failed:', submitError.response?.data?.error || submitError.message);
      }
      
    } catch (loginError) {
      console.log('❌ Login failed:', loginError.response?.data?.error || loginError.message);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAPIEndpoint(); 