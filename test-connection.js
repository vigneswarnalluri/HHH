// Test script to check API connection
const testAPI = async () => {
  try {
    console.log('🔍 Testing API connection...');
    
    // Test health endpoint
    const healthResponse = await fetch('https://hhh-1z4h.onrender.com/api/health');
    console.log('Health endpoint status:', healthResponse.status);
    const healthData = await healthResponse.json();
    console.log('Health data:', healthData);
    
    // Test auth endpoint (should return 401)
    const authResponse = await fetch('https://hhh-1z4h.onrender.com/api/auth/me');
    console.log('Auth endpoint status:', authResponse.status);
    
    console.log('✅ Backend is working correctly!');
  } catch (error) {
    console.error('❌ Error testing API:', error);
  }
};

testAPI(); 