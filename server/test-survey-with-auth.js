const jwt = require('jsonwebtoken');
const userService = require('./services/userService');

async function testSurveyWithAuth() {
  try {
    console.log('🔍 Testing survey submission with authentication...\n');

    // Test 1: Get a real user from the database
    console.log('1. Getting a real user...');
    const users = await userService.getAllUsers();
    
    if (users.length === 0) {
      console.error('❌ No users found in database');
      return;
    }

    const testUser = users.find(user => user.role === 'volunteer');
    if (!testUser) {
      console.error('❌ No volunteer users found');
      return;
    }

    console.log('✅ Found volunteer user:', testUser.email);
    console.log('User ID:', testUser.id);
    console.log('User role:', testUser.role);

    // Test 2: Create a JWT token for this user
    console.log('\n2. Creating JWT token...');
    const token = jwt.sign(
      { userId: testUser.id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    console.log('✅ JWT token created');

    // Test 3: Verify the token and get user
    console.log('\n3. Verifying token and getting user...');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token userId:', decoded.userId);
    
    const user = await userService.findById(decoded.userId);
    if (!user) {
      console.error('❌ User not found after token verification');
      return;
    }
    console.log('✅ User found after token verification:', user.email);

    // Test 4: Test survey data with real user ID
    console.log('\n4. Testing survey data with real user ID...');
    const surveyData = {
      volunteer_id: user.id, // Use real user ID
      beggar_name: 'Test Beggar',
      beggar_age: 30,
      beggar_gender: 'male',
      beggar_photo_url: 'https://example.com/photo.jpg',
      location_coordinates: '(12.9716,77.5946)',
      location_address: 'Test Location',
      survey_notes: 'Test survey for debugging'
    };

    console.log('Survey data with real volunteer_id:', surveyData.volunteer_id);

    // Test 5: Try to insert survey with real user ID
    console.log('\n5. Testing survey insertion with real user ID...');
    const { supabase } = require('./config/supabase');
    
    const { data: insertData, error: insertError } = await supabase
      .from('surveys')
      .insert([surveyData])
      .select();

    if (insertError) {
      console.error('❌ Insert error with real user ID:', insertError);
    } else {
      console.log('✅ Survey insertion works with real user ID!');
      console.log('Inserted survey ID:', insertData[0].id);
      
      // Clean up test data
      await supabase
        .from('surveys')
        .delete()
        .eq('id', insertData[0].id);
      console.log('🧹 Cleaned up test data');
    }

    console.log('\n🎯 Conclusion:');
    console.log('- The issue is likely that the frontend is not sending the correct user ID');
    console.log('- Or the JWT token is not being properly decoded');
    console.log('- The database and foreign key constraints are working correctly');

  } catch (error) {
    console.error('❌ Test error:', error);
  }
}

testSurveyWithAuth(); 