require('dotenv').config();
const volunteerProfileService = require('./services/volunteerProfileService');
const userService = require('./services/userService');

async function testProfileSubmission() {
  console.log('Testing profile submission...');
  
  try {
    // Get a test user
    const testUser = await userService.findByEmail('volunteer1@example.com');
    
    if (!testUser) {
      console.log('❌ Test user not found');
      return;
    }
    
    console.log('✅ Test user found:', testUser.email);
    
    // Test 1: Check if profile exists
    console.log('\n1. Checking existing profile...');
    const existingProfile = await volunteerProfileService.getProfileByUserId(testUser.id);
    
    if (existingProfile) {
      console.log('✅ Profile found:', {
        id: existingProfile.id,
        is_complete: existingProfile.is_complete,
        has_aadhaar: !!existingProfile.aadhaar,
        has_location: !!existingProfile.location,
        has_description: !!existingProfile.description
      });
    } else {
      console.log('❌ No profile found');
    }
    
    // Test 2: Check if profile is complete
    if (existingProfile) {
      console.log('\n2. Checking if profile is complete...');
      const isComplete = volunteerProfileService.isProfileComplete(existingProfile);
      console.log('✅ Profile completeness check:', isComplete ? 'COMPLETE' : 'INCOMPLETE');
      
      if (isComplete) {
        console.log('Profile should be ready for submission');
      } else {
        console.log('Profile is missing required fields');
      }
    }
    
    // Test 3: Try to submit profile
    if (existingProfile && volunteerProfileService.isProfileComplete(existingProfile)) {
      console.log('\n3. Testing profile submission...');
      
      const submissionData = {
        is_complete: true,
        submitted_at: new Date().toISOString()
      };
      
      const updatedProfile = await volunteerProfileService.updateProfile(testUser.id, submissionData);
      
      if (updatedProfile) {
        console.log('✅ Profile submission successful!');
        console.log('Updated profile:', {
          id: updatedProfile.id,
          is_complete: updatedProfile.is_complete,
          submitted_at: updatedProfile.submitted_at
        });
      } else {
        console.log('❌ Profile submission failed');
      }
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testProfileSubmission(); 