const bcrypt = require('bcryptjs');
const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = 'https://your-project.supabase.co';
const supabaseKey = 'your-anon-key';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTestVolunteer() {
  try {
    console.log('🔍 Creating test volunteer...');

    // Hash password
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    // Create user
    const { data: user, error: userError } = await supabase
      .from('users')
      .insert([
        {
          email: 'testvolunteer@example.com',
          password_hash: hashedPassword,
          role: 'volunteer',
          is_active: true
        }
      ])
      .select()
      .single();

    if (userError) {
      console.error('❌ User creation error:', userError);
      return;
    }

    console.log('✅ Test volunteer created successfully!');
    console.log('Email: testvolunteer@example.com');
    console.log('Password: password123');
    console.log('User ID:', user.id);

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

createTestVolunteer(); 