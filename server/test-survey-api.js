const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:5000/api';

async function testSurveyAPI() {
  try {
    console.log('Testing Survey API endpoints...\n');

    // First, we need to get a valid token by logging in
    console.log('1. Testing login to get token...');
    const loginResponse = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      })
    });

    if (!loginResponse.ok) {
      console.log('Login failed. Please make sure you have a test user account.');
      console.log('You can create one by running the registration endpoint first.');
      return;
    }

    const loginData = await loginResponse.json();
    const token = loginData.token;
    console.log('✓ Login successful, token obtained\n');

    // Test creating a survey
    console.log('2. Testing survey creation...');
    const surveyData = {
      beggar_name: 'Test Beggar',
      beggar_age: 45,
      beggar_gender: 'male',
      beggar_photo_url: 'https://example.com/photo.jpg',
      location_coordinates: [12.9716, 77.5946], // Bangalore coordinates
      location_address: 'Test Location, Bangalore',
      survey_notes: 'This is a test survey for API testing'
    };

    const createResponse = await fetch(`${BASE_URL}/volunteer/surveys`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(surveyData)
    });

    if (createResponse.ok) {
      const createData = await createResponse.json();
      console.log('✓ Survey created successfully');
      console.log('Survey ID:', createData.survey.id);
      console.log('Message:', createData.message);
    } else {
      const errorData = await createResponse.json();
      console.log('✗ Survey creation failed:', errorData);
    }
    console.log('');

    // Test getting surveys
    console.log('3. Testing survey retrieval...');
    const getResponse = await fetch(`${BASE_URL}/volunteer/surveys`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (getResponse.ok) {
      const getData = await getResponse.json();
      console.log('✓ Surveys retrieved successfully');
      console.log('Total surveys:', getData.surveyCount);
      console.log('Surveys:', getData.surveys.length);
    } else {
      const errorData = await getResponse.json();
      console.log('✗ Survey retrieval failed:', errorData);
    }
    console.log('');

    console.log('Survey API test completed!');
    console.log('\nTo test the frontend:');
    console.log('1. Start the server: npm start');
    console.log('2. Start the client: cd ../client && npm start');
    console.log('3. Navigate to /volunteer/surveys to see the survey dashboard');
    console.log('4. Navigate to /volunteer/survey/new to create a new survey');

  } catch (error) {
    console.error('Test failed:', error);
  }
}

testSurveyAPI(); 