const jwt = require('jsonwebtoken');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to verify JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// Helper function to get user by ID
const getUserById = async (userId) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) return null;
  return data;
};

// Helper function to get volunteer profile
const getVolunteerProfile = async (userId) => {
  const { data, error } = await supabase
    .from('volunteer_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (error) return null;
  return data;
};

// Helper function to create volunteer profile
const createVolunteerProfile = async (profileData) => {
  const { data, error } = await supabase
    .from('volunteer_profiles')
    .insert([profileData])
    .select()
    .single();

  if (error) {
    throw new Error('Failed to create volunteer profile');
  }

  return data;
};

// Helper function to update volunteer profile
const updateVolunteerProfile = async (userId, updateData) => {
  const { data, error } = await supabase
    .from('volunteer_profiles')
    .update(updateData)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    throw new Error('Failed to update volunteer profile');
  }

  return data;
};

// Helper function to upload file to Supabase Storage
const uploadFile = async (file, bucket = 'uploads') => {
  const fileName = `${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file.buffer, {
      contentType: file.type
    });

  if (error) {
    throw new Error('Failed to upload file');
  }

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName);

  return publicUrl;
};

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    const { path, httpMethod, body } = event;
    const pathSegments = path.split('/').filter(Boolean);
    const endpoint = pathSegments[pathSegments.length - 1];

    // Extract token from Authorization header
    const authHeader = event.headers.authorization || event.headers.Authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'No token provided' })
      };
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Invalid token' })
      };
    }

    // Get user
    const user = await getUserById(decoded.userId);
    if (!user || user.role !== 'volunteer') {
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({ error: 'Access denied' })
      };
    }

    // Parse request body
    const requestBody = body ? JSON.parse(body) : {};

    // Route handling
    switch (endpoint) {
      case 'profile':
        if (httpMethod === 'GET') {
          const profile = await getVolunteerProfile(user.id);
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ profile })
          };
        }
        break;

      case 'step1':
        if (httpMethod === 'POST') {
          const { aadhaar, phoneIfNoAadhaar } = requestBody;
          
          if (!aadhaar) {
            return {
              statusCode: 400,
              headers,
              body: JSON.stringify({ error: 'Aadhaar information is required' })
            };
          }

          const profileData = {
            user_id: user.id,
            aadhaar_photo_url: aadhaar.photoUrl || null,
            aadhaar_status: aadhaar.status,
            phone_if_no_aadhaar: phoneIfNoAadhaar || null,
            step1_completed: true,
            updated_at: new Date().toISOString()
          };

          const existingProfile = await getVolunteerProfile(user.id);
          
          if (existingProfile) {
            await updateVolunteerProfile(user.id, profileData);
          } else {
            await createVolunteerProfile(profileData);
          }

          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
              message: 'Step 1 completed successfully',
              step: 1
            })
          };
        }
        break;

      case 'step2':
        if (httpMethod === 'POST') {
          const { location } = requestBody;
          
          if (!location || !location.coordinates || !location.address) {
            return {
              statusCode: 400,
              headers,
              body: JSON.stringify({ error: 'Location information is required' })
            };
          }

          const profileData = {
            latitude: location.coordinates[1],
            longitude: location.coordinates[0],
            address: location.address,
            step2_completed: true,
            updated_at: new Date().toISOString()
          };

          const existingProfile = await getVolunteerProfile(user.id);
          
          if (existingProfile) {
            await updateVolunteerProfile(user.id, profileData);
          } else {
            profileData.user_id = user.id;
            await createVolunteerProfile(profileData);
          }

          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
              message: 'Step 2 completed successfully',
              step: 2
            })
          };
        }
        break;

      case 'step3':
        if (httpMethod === 'POST') {
          const { description } = requestBody;
          
          if (!description || description.trim().length < 10) {
            return {
              statusCode: 400,
              headers,
              body: JSON.stringify({ error: 'Description must be at least 10 characters' })
            };
          }

          const profileData = {
            description: description.trim(),
            step3_completed: true,
            updated_at: new Date().toISOString()
          };

          const existingProfile = await getVolunteerProfile(user.id);
          
          if (existingProfile) {
            await updateVolunteerProfile(user.id, profileData);
          } else {
            profileData.user_id = user.id;
            await createVolunteerProfile(profileData);
          }

          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
              message: 'Step 3 completed successfully',
              step: 3
            })
          };
        }
        break;

      case 'submit':
        if (httpMethod === 'POST') {
          const profile = await getVolunteerProfile(user.id);
          
          if (!profile) {
            return {
              statusCode: 400,
              headers,
              body: JSON.stringify({ error: 'Profile not found' })
            };
          }

          if (!profile.step1_completed || !profile.step2_completed || !profile.step3_completed) {
            return {
              statusCode: 400,
              headers,
              body: JSON.stringify({ error: 'All steps must be completed before submission' })
            };
          }

          // Update profile status to submitted
          await updateVolunteerProfile(user.id, {
            is_submitted: true,
            submitted_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });

          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
              message: 'Profile submitted successfully',
              profile: await getVolunteerProfile(user.id)
            })
          };
        }
        break;

      default:
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Endpoint not found' })
        };
    }

  } catch (error) {
    console.error('Volunteer function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Server error',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      })
    };
  }
}; 