const { supabase } = require('./config/supabase');

async function debugSurveySubmission() {
  try {
    console.log('🔍 Debugging survey submission...\n');

    // Test 1: Check if surveys table exists
    console.log('1. Checking surveys table...');
    const { data: tableCheck, error: tableError } = await supabase
      .from('surveys')
      .select('*')
      .limit(1);
    
    if (tableError) {
      console.error('❌ Table error:', tableError);
      return;
    }
    console.log('✅ Surveys table exists\n');

    // Test 2: Check if we can insert a test survey
    console.log('2. Testing survey insertion...');
    const testSurveyData = {
      volunteer_id: '00000000-0000-0000-0000-000000000000', // dummy UUID
      beggar_name: 'Test Beggar',
      beggar_age: 30,
      beggar_gender: 'male',
      beggar_photo_url: 'https://example.com/photo.jpg',
      location_coordinates: '(12.9716,77.5946)',
      location_address: 'Test Location',
      survey_notes: 'Test survey for debugging'
    };

    const { data: insertData, error: insertError } = await supabase
      .from('surveys')
      .insert([testSurveyData])
      .select();

    if (insertError) {
      console.error('❌ Insert error:', insertError);
      console.log('\n🔍 Error details:');
      console.log('- Code:', insertError.code);
      console.log('- Message:', insertError.message);
      console.log('- Details:', insertError.details);
      console.log('- Hint:', insertError.hint);
    } else {
      console.log('✅ Survey insertion works');
      console.log('Inserted survey ID:', insertData[0].id);
      
      // Clean up test data
      await supabase
        .from('surveys')
        .delete()
        .eq('id', insertData[0].id);
      console.log('🧹 Cleaned up test data');
    }

    // Test 3: Check users table for volunteer_id reference
    console.log('\n3. Checking users table...');
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, email, role')
      .limit(5);

    if (usersError) {
      console.error('❌ Users table error:', usersError);
    } else {
      console.log('✅ Users table exists');
      console.log('Found users:', users.length);
      if (users.length > 0) {
        console.log('Sample user:', users[0]);
      }
    }

  } catch (error) {
    console.error('❌ Debug error:', error);
  }
}

debugSurveySubmission(); 