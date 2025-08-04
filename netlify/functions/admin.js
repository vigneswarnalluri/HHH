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

// Helper function to calculate distance between two points
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Helper function to get volunteers with filtering
const getVolunteers = async (filters = {}) => {
  let query = supabase
    .from('volunteer_profiles')
    .select(`
      *,
      users (
        id,
        email,
        phone,
        role,
        is_active,
        created_at,
        last_login
      )
    `);

  // Apply filters
  if (filters.search) {
    query = query.or(`users.email.ilike.%${filters.search}%,users.phone.ilike.%${filters.search}%`);
  }

  if (filters.aadhaarStatus) {
    query = query.eq('aadhaar_status', filters.aadhaarStatus);
  }

  if (filters.dateFrom) {
    query = query.gte('created_at', filters.dateFrom);
  }

  if (filters.dateTo) {
    query = query.lte('created_at', filters.dateTo);
  }

  // Apply radius filter if coordinates provided
  if (filters.latitude && filters.longitude && filters.radius) {
    // For now, we'll filter in the application layer
    // In production, you might want to use PostGIS for better performance
  }

  // Apply pagination
  const page = parseInt(filters.page) || 1;
  const limit = parseInt(filters.limit) || 20;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) {
    throw new Error('Failed to fetch volunteers');
  }

  // Apply radius filter in application layer if needed
  let filteredData = data;
  if (filters.latitude && filters.longitude && filters.radius) {
    filteredData = data.filter(volunteer => {
      if (!volunteer.latitude || !volunteer.longitude) return false;
      const distance = calculateDistance(
        filters.latitude,
        filters.longitude,
        volunteer.latitude,
        volunteer.longitude
      );
      return distance <= filters.radius;
    });
  }

  return {
    volunteers: filteredData,
    total: count || filteredData.length,
    page,
    limit,
    totalPages: Math.ceil((count || filteredData.length) / limit)
  };
};

// Helper function to get volunteer by ID
const getVolunteerById = async (volunteerId) => {
  const { data, error } = await supabase
    .from('volunteer_profiles')
    .select(`
      *,
      users (
        id,
        email,
        phone,
        role,
        is_active,
        created_at,
        last_login
      )
    `)
    .eq('user_id', volunteerId)
    .single();

  if (error) return null;
  return data;
};

// Helper function to update volunteer status
const updateVolunteerStatus = async (volunteerId, status) => {
  const { data, error } = await supabase
    .from('volunteer_profiles')
    .update({ 
      status,
      updated_at: new Date().toISOString()
    })
    .eq('user_id', volunteerId)
    .select()
    .single();

  if (error) {
    throw new Error('Failed to update volunteer status');
  }

  return data;
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
    const { path, httpMethod, body, queryStringParameters } = event;
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
    if (!user || user.role !== 'admin') {
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
      case 'volunteers':
        if (httpMethod === 'GET') {
          const filters = {
            page: queryStringParameters?.page,
            limit: queryStringParameters?.limit,
            search: queryStringParameters?.search,
            aadhaarStatus: queryStringParameters?.aadhaarStatus,
            dateFrom: queryStringParameters?.dateFrom,
            dateTo: queryStringParameters?.dateTo,
            radius: queryStringParameters?.radius ? parseFloat(queryStringParameters.radius) : null,
            latitude: queryStringParameters?.latitude ? parseFloat(queryStringParameters.latitude) : null,
            longitude: queryStringParameters?.longitude ? parseFloat(queryStringParameters.longitude) : null
          };

          const result = await getVolunteers(filters);
          
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify(result)
          };
        }
        break;

      case 'volunteer':
        if (pathSegments.length >= 3) {
          const volunteerId = pathSegments[2];
          
          if (httpMethod === 'GET') {
            const volunteer = await getVolunteerById(volunteerId);
            
            if (!volunteer) {
              return {
                statusCode: 404,
                headers,
                body: JSON.stringify({ error: 'Volunteer not found' })
              };
            }

            return {
              statusCode: 200,
              headers,
              body: JSON.stringify({ volunteer })
            };
          }

          if (httpMethod === 'PUT') {
            const { status } = requestBody;
            
            if (!status) {
              return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Status is required' })
              };
            }

            const updatedVolunteer = await updateVolunteerStatus(volunteerId, status);
            
            return {
              statusCode: 200,
              headers,
              body: JSON.stringify({ 
                message: 'Volunteer status updated successfully',
                volunteer: updatedVolunteer
              })
            };
          }
        }
        break;

      case 'dashboard':
        if (httpMethod === 'GET') {
          // Get dashboard statistics
          const { data: totalVolunteers } = await supabase
            .from('volunteer_profiles')
            .select('id', { count: 'exact' });

          const { data: submittedVolunteers } = await supabase
            .from('volunteer_profiles')
            .select('id', { count: 'exact' })
            .eq('is_submitted', true);

          const { data: pendingVolunteers } = await supabase
            .from('volunteer_profiles')
            .select('id', { count: 'exact' })
            .eq('is_submitted', false);

          const { data: recentVolunteers } = await supabase
            .from('volunteer_profiles')
            .select(`
              *,
              users (
                id,
                email,
                phone,
                created_at
              )
            `)
            .order('created_at', { ascending: false })
            .limit(5);

          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
              stats: {
                total: totalVolunteers?.length || 0,
                submitted: submittedVolunteers?.length || 0,
                pending: pendingVolunteers?.length || 0
              },
              recentVolunteers: recentVolunteers || []
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
    console.error('Admin function error:', error);
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