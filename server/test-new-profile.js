require('dotenv').config();
const axios = require('axios');

async function testNewProfileRegistration() {
  console.log('Testing new profile registration...');
  
  try {
    // Step 1: Register a new user
    console.log('\n1. Registering new user...');
    const registerResponse = await axios.post('http://localhost:5000/api/auth/register', {
      email: 'newvolunteer@example.com',
      password: 'newvolunteer123',
      phone: '9876543210',
      role: 'volunteer'
    });
    
    console.log('✅ User registration successful:', registerResponse.data.message);
    const token = registerResponse.data.token;
    
    // Step 2: Login with the new user
    console.log('\n2. Logging in with new user...');
    const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'newvolunteer@example.com',
      password: 'newvolunteer123'
    });
    
    console.log('✅ Login successful:', loginResponse.data.message);
    const loginToken = loginResponse.data.token;
    
    // Step 3: Submit step 1 (Aadhaar)
    console.log('\n3. Submitting step 1 (Aadhaar)...');
    const step1Response = await axios.post('http://localhost:5000/api/volunteer/profile/step1', {
      aadhaar: {
        status: 'yes',
        photoUrl: 'https://example.com/aadhaar-photo.jpg'
      }
    }, {
      headers: {
        'Authorization': `Bearer ${loginToken}`
      }
    });
    
    console.log('✅ Step 1 successful:', step1Response.data.message);
    
    // Step 4: Submit step 2 (Location)
    console.log('\n4. Submitting step 2 (Location)...');
    const step2Response = await axios.post('http://localhost:5000/api/volunteer/profile/step2', {
      location: {
        coordinates: [78.358118, 17.465344],
        address: 'Test Address, Hyderabad, Telangana'
      }
    }, {
      headers: {
        'Authorization': `Bearer ${loginToken}`
      }
    });
    
    console.log('✅ Step 2 successful:', step2Response.data.message);
    
    // Step 5: Submit step 3 (Description)
    console.log('\n5. Submitting step 3 (Description)...');
    const step3Response = await axios.post('http://localhost:5000/api/volunteer/profile/step3', {
      description: 'I am a new volunteer ready to help the community.'
    }, {
      headers: {
        'Authorization': `Bearer ${loginToken}`
      }
    });
    
    console.log('✅ Step 3 successful:', step3Response.data.message);
    
    // Step 6: Final submission
    console.log('\n6. Final profile submission...');
    const submitResponse = await axios.post('http://localhost:5000/api/volunteer/profile/submit', {}, {
      headers: {
        'Authorization': `Bearer ${loginToken}`
      }
    });
    
    console.log('✅ Profile submission successful:', submitResponse.data.message);
    
    // Step 7: Verify the profile was created
    console.log('\n7. Verifying profile creation...');
    const profileResponse = await axios.get('http://localhost:5000/api/volunteer/profile', {
      headers: {
        'Authorization': `Bearer ${loginToken}`
      }
    });
    
    const profile = profileResponse.data.profile;
    console.log('✅ Profile verification successful');
    console.log('Profile details:', {
      id: profile.id,
      is_complete: profile.is_complete,
      has_aadhaar: !!profile.aadhaar,
      has_location: !!profile.location,
      has_description: !!profile.description,
      submitted_at: profile.submitted_at
    });
    
    console.log('\n🎉 New profile registration test completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data?.error || error.message);
    if (error.response?.data) {
      console.error('Response data:', error.response.data);
    }
  }
}

testNewProfileRegistration(); 