require('dotenv').config();
const userService = require('./services/userService');

async function testAuthentication() {
  console.log('Testing authentication functionality...');
  
  try {
    // Test 1: Check if we can find a user by email
    console.log('\n1. Testing user lookup...');
    const testUser = await userService.findByEmail('volunteer1@example.com');
    
    if (testUser) {
      console.log('✅ User lookup successful');
      console.log('User found:', {
        id: testUser.id,
        email: testUser.email,
        role: testUser.role,
        is_active: testUser.is_active
      });
    } else {
      console.log('❌ User lookup failed');
    }

    // Test 2: Check password comparison
    console.log('\n2. Testing password comparison...');
    if (testUser) {
      const isPasswordValid = await userService.comparePassword(testUser, 'volunteer123');
      console.log('✅ Password comparison test:', isPasswordValid ? 'PASSED' : 'FAILED');
    }

    // Test 3: Check admin user
    console.log('\n3. Testing admin user...');
    const adminUser = await userService.findByEmail('admin@example.com');
    
    if (adminUser) {
      console.log('✅ Admin user found');
      console.log('Admin user:', {
        id: adminUser.id,
        email: adminUser.email,
        role: adminUser.role
      });
    } else {
      console.log('❌ Admin user not found');
    }

    // Test 4: Check public JSON conversion
    console.log('\n4. Testing public JSON conversion...');
    if (testUser) {
      const publicUser = userService.toPublicJSON(testUser);
      console.log('✅ Public JSON conversion successful');
      console.log('Public user data:', {
        id: publicUser.id,
        email: publicUser.email,
        role: publicUser.role,
        hasPassword: !!publicUser.password
      });
    }

    console.log('\n🎉 Authentication test completed!');
    
  } catch (error) {
    console.error('❌ Authentication test failed:', error);
  }
}

testAuthentication(); 