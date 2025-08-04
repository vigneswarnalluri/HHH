const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

// Helper function to validate email
const isValidEmail = (email) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

// Helper function to validate password
const isValidPassword = (password) => {
  return password && password.length >= 6;
};

// Helper function to validate phone number (Indian format)
const isValidPhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

// Helper function to hash password
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// Helper function to compare password
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Helper function to find user by email
const findByEmail = async (email) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();
  
  if (error) return null;
  return data;
};

// Helper function to create user
const createUser = async (userData) => {
  const { email, password, phone, role = 'volunteer' } = userData;
  
  // Check if user already exists
  const existingUser = await findByEmail(email);
  if (existingUser) {
    throw new Error('User with this email already exists.');
  }

  const hashedPassword = await hashPassword(password);
  
  const { data, error } = await supabase
    .from('users')
    .insert([
      {
        email,
        password_hash: hashedPassword,
        phone,
        role,
        is_active: true,
        created_at: new Date().toISOString()
      }
    ])
    .select()
    .single();

  if (error) {
    throw new Error('Failed to create user');
  }

  return {
    id: data.id,
    email: data.email,
    phone: data.phone,
    role: data.role,
    is_active: data.is_active
  };
};

// Helper function to update last login
const updateLastLogin = async (userId) => {
  await supabase
    .from('users')
    .update({ last_login: new Date().toISOString() })
    .eq('id', userId);
};

// Helper function to get user profile
const getUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from('users')
    .select('id, email, phone, role, is_active, created_at, last_login')
    .eq('id', userId)
    .single();

  if (error) return null;
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
    const { path, httpMethod, body } = event;
    const pathSegments = path.split('/').filter(Boolean);
    const endpoint = pathSegments[pathSegments.length - 1];

    // Parse request body
    const requestBody = body ? JSON.parse(body) : {};

    // Route handling
    switch (endpoint) {
      case 'login':
        if (httpMethod !== 'POST') {
          return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
          };
        }

        // Validate input
        if (!isValidEmail(requestBody.email)) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Invalid email address' })
          };
        }

        if (!isValidPassword(requestBody.password)) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Password must be at least 6 characters' })
          };
        }

        // Find user
        const user = await findByEmail(requestBody.email);
        if (!user || !user.is_active) {
          return {
            statusCode: 401,
            headers,
            body: JSON.stringify({ error: 'Invalid credentials or account inactive.' })
          };
        }

        // Check password
        const isMatch = await comparePassword(requestBody.password, user.password_hash);
        if (!isMatch) {
          return {
            statusCode: 401,
            headers,
            body: JSON.stringify({ error: 'Invalid credentials.' })
          };
        }

        // Update last login
        await updateLastLogin(user.id);

        // Generate token
        const token = generateToken(user.id);

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            token,
            user: {
              id: user.id,
              email: user.email,
              phone: user.phone,
              role: user.role,
              is_active: user.is_active
            },
            message: 'Login successful'
          })
        };

      case 'register':
        if (httpMethod !== 'POST') {
          return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
          };
        }

        // Validate input
        if (!isValidEmail(requestBody.email)) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Invalid email address' })
          };
        }

        if (!isValidPassword(requestBody.password)) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Password must be at least 6 characters' })
          };
        }

        if (requestBody.phone && !isValidPhone(requestBody.phone)) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Invalid phone number' })
          };
        }

        if (requestBody.role && !['admin', 'volunteer'].includes(requestBody.role)) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Invalid role' })
          };
        }

        // Create user
        const newUser = await createUser(requestBody);

        // Generate token
        const newToken = generateToken(newUser.id);

        return {
          statusCode: 201,
          headers,
          body: JSON.stringify({
            token: newToken,
            user: newUser,
            message: 'Registration successful'
          })
        };

      case 'me':
        if (httpMethod !== 'GET') {
          return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
          };
        }

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
        
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          const userProfile = await getUserProfile(decoded.userId);
          
          if (!userProfile) {
            return {
              statusCode: 404,
              headers,
              body: JSON.stringify({ error: 'User not found' })
            };
          }

          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ user: userProfile })
          };
        } catch (jwtError) {
          return {
            statusCode: 401,
            headers,
            body: JSON.stringify({ error: 'Invalid token' })
          };
        }

      default:
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Endpoint not found' })
        };
    }

  } catch (error) {
    console.error('Auth function error:', error);
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