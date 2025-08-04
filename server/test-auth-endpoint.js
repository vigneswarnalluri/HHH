const jwt = require('jsonwebtoken');
const userService = require('./services/userService');

async function testAuthEndpoint() {
  try {
    console.log('🔍 Testing authentication endpoint...\n');

    // Get a real user
    const users = await userService.getAllUsers();
    const testUser = users.find(user => user.role === 'volunteer');
    
    if (!testUser) {
      console.error('❌ No volunteer users found');
      return;
    }

    console.log('✅ Found test user:', testUser.email);
    console.log('User ID:', testUser.id);

    // Create a JWT token
    const token = jwt.sign(
      { userId: testUser.id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('✅ JWT token created');

    // Test the /api/auth/me endpoint
    const fetch = require('node-fetch');
    
    const response = await fetch('http://localhost:5000/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    console.log('Response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Auth endpoint working');
      console.log('User data:', data.user);
    } else {
      const error = await response.text();
      console.error('❌ Auth endpoint failed:', error);
    }

  } catch (error) {
    console.error('❌ Test error:', error);
  }
}

testAuthEndpoint(); 