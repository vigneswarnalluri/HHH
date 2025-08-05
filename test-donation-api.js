const fetch = require('node-fetch');

async function testDonationAPI() {
  const API_URL = 'https://hhh-1z4h.onrender.com';
  
  console.log('🧪 Testing donation API...');
  console.log('API URL:', API_URL);
  
  try {
    // Test health endpoint
    console.log('\n1. Testing health endpoint...');
    const healthResponse = await fetch(`${API_URL}/api/health`);
    console.log('Health status:', healthResponse.status);
    
    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      console.log('Health data:', healthData);
    }
    
    // Test donation endpoint
    console.log('\n2. Testing donation endpoint...');
    const donationData = {
      amount: 500,
      donor_name: 'Test Donor',
      donor_email: 'test@example.com',
      donor_phone: '+91-9876543210',
      payment_method: 'card',
      message: 'Test donation'
    };
    
    const donationResponse = await fetch(`${API_URL}/api/donations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(donationData)
    });
    
    console.log('Donation status:', donationResponse.status);
    
    if (donationResponse.ok) {
      const donationResult = await donationResponse.json();
      console.log('Donation result:', donationResult);
    } else {
      const errorText = await donationResponse.text();
      console.log('Donation error:', errorText);
    }
    
  } catch (error) {
    console.error('❌ API test failed:', error.message);
  }
}

testDonationAPI(); 