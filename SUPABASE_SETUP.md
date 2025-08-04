# Supabase Migration Guide

This guide will help you migrate from MongoDB to Supabase for the Volunteer Management System.

## Prerequisites

1. A Supabase account (sign up at https://supabase.com)
2. Node.js and npm installed
3. The existing project files

## Step 1: Create a Supabase Project

1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `volunteer-management`
   - Database Password: Choose a strong password
   - Region: Choose the closest region to your users
5. Click "Create new project"

## Step 2: Get Your Supabase Credentials

1. In your Supabase dashboard, go to Settings > API
2. Copy the following values:
   - Project URL
   - Anon (public) key
   - Service role key (for admin operations)

## Step 3: Set Up Database Schema

1. In your Supabase dashboard, go to the SQL Editor
2. Copy and paste the contents of `server/supabase-migration.sql`
3. Click "Run" to execute the migration

## Step 4: Configure Environment Variables

1. Copy `server/env.example` to `server/.env`
2. Update the following variables with your Supabase credentials:

```env
# Supabase Configuration
SUPABASE_URL=your-supabase-project-url
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

## Step 5: Install Dependencies

```bash
cd server
npm install
```

## Step 6: Seed the Database

```bash
cd server
npm run seed
```

This will create sample users and volunteer profiles in your Supabase database.

## Step 7: Test the Application

1. Start the server:
```bash
cd server
npm run dev
```

2. Start the client:
```bash
cd client
npm start
```

3. Test the application with the sample credentials:
   - Admin: `admin@example.com` / `admin123`
   - Volunteer: `volunteer1@example.com` / `volunteer123`

## Database Schema

### Users Table
- `id`: UUID (Primary Key)
- `email`: VARCHAR(255) (Unique)
- `password`: VARCHAR(255) (Hashed)
- `phone`: VARCHAR(20)
- `role`: VARCHAR(20) ('admin' or 'volunteer')
- `is_active`: BOOLEAN
- `last_login`: TIMESTAMP
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

### Volunteer Profiles Table
- `id`: UUID (Primary Key)
- `user_id`: UUID (Foreign Key to users.id)
- `aadhaar`: JSONB (Contains photo_url and status)
- `phone_if_no_aadhaar`: VARCHAR(20)
- `location`: JSONB (Contains coordinates and address)
- `description`: TEXT
- `is_complete`: BOOLEAN
- `submitted_at`: TIMESTAMP
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

## Key Changes Made

1. **Removed MongoDB dependencies**: Replaced `mongoose` with `@supabase/supabase-js`
2. **Updated models**: Replaced Mongoose schemas with Supabase services
3. **Updated routes**: Modified all API routes to use Supabase operations
4. **Updated middleware**: Modified auth middleware to work with Supabase
5. **Updated seed script**: Modified to work with Supabase
6. **Added Row Level Security**: Implemented RLS policies for data security

## Security Features

- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- Admins can access all data
- Password hashing with bcrypt
- JWT token authentication

## Troubleshooting

### Common Issues

1. **Connection Error**: Make sure your Supabase URL and keys are correct
2. **RLS Policy Errors**: Check that your RLS policies are properly configured
3. **Migration Errors**: Ensure the SQL migration ran successfully

### Getting Help

- Check the Supabase documentation: https://supabase.com/docs
- Review the server logs for detailed error messages
- Verify your environment variables are set correctly

## Production Deployment

For production deployment:

1. Use environment variables for all sensitive data
2. Enable SSL/TLS
3. Set up proper CORS configuration
4. Configure rate limiting
5. Set up monitoring and logging
6. Use Supabase's built-in backup features

## Migration Notes

- The application now uses PostgreSQL instead of MongoDB
- All data operations are now handled through Supabase's REST API
- Geospatial queries are handled in application code rather than database indexes
- File uploads still use the local filesystem (consider migrating to Supabase Storage) 