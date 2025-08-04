const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create Supabase client with anon key for general operations
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Create Supabase client with service role key for admin operations
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

module.exports = {
  supabase,
  supabaseAdmin
}; 