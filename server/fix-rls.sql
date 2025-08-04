-- Disable RLS on both tables
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_profiles DISABLE ROW LEVEL SECURITY;

-- Drop any existing policies that might be causing issues
DROP POLICY IF EXISTS "Users can view their own data" ON users;
DROP POLICY IF EXISTS "Users can update their own data" ON users;
DROP POLICY IF EXISTS "Users can view their own profile" ON volunteer_profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON volunteer_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON volunteer_profiles;
DROP POLICY IF EXISTS "Admins can view all users" ON users;
DROP POLICY IF EXISTS "Admins can view all profiles" ON volunteer_profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON volunteer_profiles; 