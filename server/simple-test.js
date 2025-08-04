const axios = require('axios');

async function simpleTest() {
  try {
    console.log('🔍 Simple server test...');
    
    const response = await axios.get('http://localhost:5000/api/auth/me');
    console.log('✅ Server is responding');
    console.log('Status:', response.status);
  } catch (error) {
    console.log('❌ Server test failed');
    console.log('Error:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('Server is not running on port 5000');
    }
  }
}

simpleTest(); 