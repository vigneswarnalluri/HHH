const bcrypt = require('bcryptjs');
require('dotenv').config();

const { supabaseAdmin } = require('../config/supabase');

// Sample data
const sampleUsers = [
  {
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    phone: '9876543210'
  },
  {
    email: 'volunteer1@example.com',
    password: 'volunteer123',
    role: 'volunteer',
    phone: '9876543211'
  },
  {
    email: 'volunteer2@example.com',
    password: 'volunteer123',
    role: 'volunteer',
    phone: '9876543212'
  },
  {
    email: 'volunteer3@example.com',
    password: 'volunteer123',
    role: 'volunteer',
    phone: '9876543213'
  },
  {
    email: 'volunteer4@example.com',
    password: 'volunteer123',
    role: 'volunteer',
    phone: '9876543214'
  }
];

const sampleProfiles = [
  {
    email: 'volunteer1@example.com',
    aadhaar: {
      photo_url: '/uploads/sample-aadhaar-1.jpg',
      status: 'yes'
    },
    location: {
      type: 'Point',
      coordinates: [78.500000, 16.300000], // Guntur, AP
      address: 'Guntur, Andhra Pradesh'
    },
    description: 'Lives in Guntur, works part-time as a teacher. Passionate about community service and helping others.',
    is_complete: true,
    submitted_at: new Date('2024-01-15').toISOString()
  },
  {
    email: 'volunteer2@example.com',
    aadhaar: {
      photo_url: '/uploads/sample-aadhaar-2.jpg',
      status: 'no'
    },
    phone_if_no_aadhaar: '9876543212',
    location: {
      type: 'Point',
      coordinates: [77.209000, 28.613900], // Delhi
      address: 'New Delhi, Delhi'
    },
    description: 'Student from Delhi University. Interested in social work and community development projects.',
    is_complete: true,
    submitted_at: new Date('2024-01-16').toISOString()
  },
  {
    email: 'volunteer3@example.com',
    aadhaar: {
      photo_url: '/uploads/sample-aadhaar-3.jpg',
      status: 'unknown'
    },
    location: {
      type: 'Point',
      coordinates: [72.877700, 19.076000], // Mumbai
      address: 'Mumbai, Maharashtra'
    },
    description: 'Software professional from Mumbai. Looking to contribute to social causes in my free time.',
    is_complete: true,
    submitted_at: new Date('2024-01-17').toISOString()
  },
  {
    email: 'volunteer4@example.com',
    aadhaar: {
      photo_url: '/uploads/sample-aadhaar-4.jpg',
      status: 'yes'
    },
    location: {
      type: 'Point',
      coordinates: [88.363900, 22.572600], // Kolkata
      address: 'Kolkata, West Bengal'
    },
    description: 'Retired teacher from Kolkata. Have experience in organizing community events and educational programs.',
    is_complete: false
  }
];

async function seedDatabase() {
  try {
    console.log('Starting database seeding...');

    // Clear existing data using service role (bypasses RLS)
    const { error: deleteUsersError } = await supabaseAdmin
      .from('users')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all users

    if (deleteUsersError) {
      console.error('Error clearing users:', deleteUsersError);
    } else {
      console.log('Cleared existing users');
    }

    const { error: deleteProfilesError } = await supabaseAdmin
      .from('volunteer_profiles')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all profiles

    if (deleteProfilesError) {
      console.error('Error clearing profiles:', deleteProfilesError);
    } else {
      console.log('Cleared existing profiles');
    }

    // Create users using service role
    const createdUsers = [];
    for (const userData of sampleUsers) {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      
      const { data: user, error } = await supabaseAdmin
        .from('users')
        .insert({
          email: userData.email.toLowerCase().trim(),
          password: hashedPassword,
          phone: userData.phone,
          role: userData.role,
          is_active: true,
          last_login: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error(`Error creating user ${userData.email}:`, error);
        continue;
      }

      createdUsers.push(user);
      console.log(`Created user: ${user.email}`);
    }

    // Create volunteer profiles using service role
    for (const profileData of sampleProfiles) {
      const user = createdUsers.find(u => u.email === profileData.email);
      if (user) {
        const { data: profile, error } = await supabaseAdmin
          .from('volunteer_profiles')
          .insert({
            user_id: user.id,
            aadhaar: profileData.aadhaar,
            phone_if_no_aadhaar: profileData.phone_if_no_aadhaar,
            location: profileData.location,
            description: profileData.description,
            is_complete: profileData.is_complete,
            submitted_at: profileData.submitted_at
          })
          .select()
          .single();

        if (error) {
          console.error(`Error creating profile for ${profileData.email}:`, error);
        } else {
          console.log(`Created profile for: ${profileData.email}`);
        }
      }
    }

    console.log('\n✅ Database seeded successfully!');
    console.log('\nSample login credentials:');
    console.log('Admin: admin@example.com / admin123');
    console.log('Volunteer: volunteer1@example.com / volunteer123');
    console.log('\nAll volunteers use password: volunteer123');

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase(); 