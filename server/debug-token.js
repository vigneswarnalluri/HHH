const jwt = require('jsonwebtoken');
const userService = require('./services/userService');

async function debugToken() {
  try {
    console.log('🔍 Debugging JWT token issues...\n');

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
    console.log('Token:', token.substring(0, 50) + '...');

    // Decode the token to verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Token decoded successfully');
    console.log('Decoded payload:', decoded);

    // Test if the user exists in database
    const user = await userService.findById(decoded.userId);
    if (user) {
      console.log('✅ User found in database:', user.email);
    } else {
      console.error('❌ User not found in database');
    }

    // Test the auth middleware manually
    console.log('\n🔍 Testing auth middleware...');
    const { auth } = require('./middleware/auth');
    
    // Create a mock request object
    const mockReq = {
      header: (name) => {
        if (name === 'Authorization') {
          return `Bearer ${token}`;
        }
        return null;
      }
    };
    
    const mockRes = {
      status: (code) => ({
        json: (data) => {
          console.log('Response status:', code);
          console.log('Response data:', data);
        }
      })
    };

    let nextCalled = false;
    const mockNext = () => {
      nextCalled = true;
      console.log('✅ Auth middleware passed');
      console.log('User in req.user:', mockReq.user);
    };

    // Test the auth middleware
    await auth(mockReq, mockRes, mockNext);

    if (!nextCalled) {
      console.log('❌ Auth middleware failed');
    }

  } catch (error) {
    console.error('❌ Debug error:', error);
  }
}

debugToken(); 