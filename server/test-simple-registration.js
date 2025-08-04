require('dotenv').config();
const userService = require('./services/userService');

async function testSimpleRegistration() {
  console.log('Testing simple user registration...');
  
  try {
    // Test 1: Check if we can create a user directly
    console.log('\n1. Testing direct user creation...');
    
    const newUserData = {
      email: 'testuser@example.com',
      password: 'testpassword123',
      phone: '9876543210',
      role: 'volunteer'
    };
    
    const newUser = await userService.createUser(newUserData);
    
    if (newUser) {
      console.log('✅ User creation successful:', {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role
      });
    } else {
      console.log('❌ User creation failed');
    }
    
    // Test 2: Check if we can find the user
    console.log('\n2. Testing user lookup...');
    const foundUser = await userService.findByEmail('testuser@example.com');
    
    if (foundUser) {
      console.log('✅ User lookup successful:', {
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role
      });
    } else {
      console.log('❌ User lookup failed');
    }
    
    console.log('\n🎉 Simple registration test completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.message.includes('already exists')) {
      console.log('✅ User already exists (this is expected for repeated tests)');
    }
  }
}

testSimpleRegistration(); 