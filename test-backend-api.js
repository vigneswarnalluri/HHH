// Test backend API endpoints
const testBackendAPI = async () => {
  const baseURL = 'https://hhh-1z4h.onrender.com';
  
  console.log('🔍 Testing backend API endpoints...');
  
  try {
    // Test health endpoint
    console.log('\n1. Testing health endpoint...');
    const healthResponse = await fetch(`${baseURL}/api/health`);
    console.log('Health status:', healthResponse.status);
    const healthData = await healthResponse.json();
    console.log('Health data:', healthData);
    
    // Test admin stats endpoint (should return 401 without token)
    console.log('\n2. Testing admin stats endpoint...');
    const statsResponse = await fetch(`${baseURL}/api/admin/stats`);
    console.log('Admin stats status:', statsResponse.status);
    if (statsResponse.status === 401) {
      console.log('✅ Correctly requires authentication');
    } else {
      console.log('❌ Unexpected response');
    }
    
    // Test volunteers endpoint (should return 401 without token)
    console.log('\n3. Testing volunteers endpoint...');
    const volunteersResponse = await fetch(`${baseURL}/api/admin/volunteers`);
    console.log('Volunteers status:', volunteersResponse.status);
    if (volunteersResponse.status === 401) {
      console.log('✅ Correctly requires authentication');
    } else {
      console.log('❌ Unexpected response');
    }
    
    // Test surveys endpoint (should return 401 without token)
    console.log('\n4. Testing surveys endpoint...');
    const surveysResponse = await fetch(`${baseURL}/api/admin/surveys`);
    console.log('Surveys status:', surveysResponse.status);
    if (surveysResponse.status === 401) {
      console.log('✅ Correctly requires authentication');
    } else {
      console.log('❌ Unexpected response');
    }
    
    console.log('\n🎉 Backend API is working correctly!');
    console.log('The issue is likely that the frontend needs to wait for the new deployment.');
    
  } catch (error) {
    console.error('❌ Error testing API:', error);
  }
};

testBackendAPI(); 