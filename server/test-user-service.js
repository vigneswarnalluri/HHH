require('dotenv').config();
const userService = require('./services/userService');
const { supabaseAdmin } = require('./config/supabase');

async function testUserService() {
  console.log('Testing userService.findByEmail...');
  
  try {
    // Test with existing user
    const testEmail = 'volunteer2@example.com';
    console.log(`\n1. Testing findByEmail with: ${testEmail}`);
    
    const user = await userService.findByEmail(testEmail);
    
    if (user) {
      console.log('✅ User found by userService:', {
        id: user.id,
        email: user.email,
        role: user.role
      });
    } else {
      console.log('❌ User not found by userService');
      
      // Let's check what's in the database directly
      console.log('\n2. Checking database directly...');
      const { data: directUser, error } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('email', testEmail)
        .single();
      
      if (error) {
        console.error('❌ Direct database query error:', error);
      } else if (directUser) {
        console.log('✅ User found in direct query:', {
          id: directUser.id,
          email: directUser.email,
          role: directUser.role
        });
      } else {
        console.log('❌ User not found in direct query either');
      }
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testUserService(); 