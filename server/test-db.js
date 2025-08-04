require('dotenv').config();
const { supabase, supabaseAdmin } = require('./config/supabase');

async function testDatabase() {
  console.log('Testing Supabase database connection...');
  
  try {
    // Test 1: Check if we can connect to users table
    console.log('\n1. Testing users table connection...');
    const { data: users, error: usersError } = await supabaseAdmin
      .from('users')
      .select('count')
      .limit(1);
    
    if (usersError) {
      console.error('❌ Users table error:', usersError);
    } else {
      console.log('✅ Users table connection successful');
    }

    // Test 2: Check if we can connect to volunteer_profiles table
    console.log('\n2. Testing volunteer_profiles table connection...');
    const { data: profiles, error: profilesError } = await supabaseAdmin
      .from('volunteer_profiles')
      .select('count')
      .limit(1);
    
    if (profilesError) {
      console.error('❌ Volunteer profiles table error:', profilesError);
    } else {
      console.log('✅ Volunteer profiles table connection successful');
    }

    // Test 3: Check if we can read existing data
    console.log('\n3. Testing data retrieval...');
    const { data: userData, error: userDataError } = await supabaseAdmin
      .from('users')
      .select('*')
      .limit(5);
    
    if (userDataError) {
      console.error('❌ Data retrieval error:', userDataError);
    } else {
      console.log(`✅ Data retrieval successful. Found ${userData.length} users`);
      if (userData.length > 0) {
        console.log('Sample user:', {
          id: userData[0].id,
          email: userData[0].email,
          role: userData[0].role
        });
      }
    }

    // Test 4: Check volunteer profiles data
    console.log('\n4. Testing volunteer profiles data...');
    const { data: profileData, error: profileDataError } = await supabaseAdmin
      .from('volunteer_profiles')
      .select('*')
      .limit(5);
    
    if (profileDataError) {
      console.error('❌ Profile data retrieval error:', profileDataError);
    } else {
      console.log(`✅ Profile data retrieval successful. Found ${profileData.length} profiles`);
    }

    console.log('\n🎉 Database connection test completed!');
    
  } catch (error) {
    console.error('❌ Database test failed:', error);
  }
}

testDatabase(); 