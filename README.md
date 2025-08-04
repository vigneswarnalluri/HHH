# Volunteer Management System

A comprehensive web application for managing volunteers and admin operations with secure authentication, multi-step form data capture, and advanced filtering capabilities.

## 🚀 Features

### Authentication & Security
- **JWT-based authentication** with refresh tokens
- **Role-based access control** (Admin/Volunteer)
- **Password hashing** with bcrypt (12 salt rounds)
- **Rate limiting** and security headers
- **CORS protection** and input validation
- **Row Level Security (RLS)** with Supabase

### Volunteer Features
- **Multi-step form** with progress tracking
- **Aadhaar photo upload** with validation (JPEG/PNG, max 5MB)
- **Geolocation capture** with reverse geocoding
- **Conditional phone number** requirement based on Aadhaar status
- **Rich text description** with character limits
- **Form validation** and error handling

### Admin Features
- **Dashboard with statistics** and overview metrics
- **Advanced filtering** by Aadhaar status, date range, location
- **Search functionality** across email, phone, description
- **CSV export** with filtered data
- **Individual volunteer profiles** with full details
- **Geospatial queries** for location-based filtering

### Technical Features
- **Responsive design** with mobile-first approach
- **WCAG 2.1 AA compliance** for accessibility
- **Modern UI** with Tailwind CSS
- **Real-time form validation**
- **File upload security** with malware scanning
- **Database indexing** for performance

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **Supabase** (PostgreSQL) for database
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Multer** for file uploads
- **Express Validator** for input validation

### Frontend
- **React 18** with functional components
- **React Router** for navigation
- **React Hook Form** for form management
- **Tailwind CSS** for styling
- **React Icons** for icons
- **Axios** for API calls
- **React Hot Toast** for notifications

### Development Tools
- **Nodemon** for development
- **Jest** for testing
- **ESLint** for code quality
- **Concurrently** for running both servers

## 📋 Prerequisites

- Node.js (v16 or higher)
- Supabase account
- npm or yarn package manager

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd volunteer-management-system
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install

# Return to root
cd ..
```

### 3. Set Up Supabase

1. Create a Supabase account at https://supabase.com
2. Create a new project
3. Get your project URL and API keys from Settings > API
4. Run the SQL migration in `server/supabase-migration.sql`

### 4. Environment Setup

Create a `.env` file in the `server` directory:

```bash
# Server Configuration
PORT=5000
NODE_ENV=development

# Supabase Configuration
SUPABASE_URL=your-supabase-project-url
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Client URL (for CORS)
CLIENT_URL=http://localhost:3000

# File Upload Configuration
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/jpg,image/png
```

### 5. Seed the Database
```bash
# Run the seed script to create sample data
cd server && npm run seed
```

### 6. Start the Application
```bash
# Start both frontend and backend
npm run dev

# Or start them separately:
npm run server  # Backend on port 5000
npm run client  # Frontend on port 3000
```

### 7. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 👥 Demo Credentials

After running the seed script, you can use these credentials:

### Admin
- **Email**: admin@example.com
- **Password**: admin123

### Volunteers
- **Email**: volunteer1@example.com
- **Password**: volunteer123
- **Email**: volunteer2@example.com
- **Password**: volunteer123
- **Email**: volunteer3@example.com
- **Password**: volunteer123
- **Email**: volunteer4@example.com
- **Password**: volunteer123

## 📚 API Documentation

### Authentication Endpoints

#### POST /api/auth/login
Login with email and password.
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### POST /api/auth/register
Register a new user.
```json
{
  "email": "user@example.com",
  "password": "password123",
  "phone": "9876543210",
  "role": "volunteer"
}
```

#### GET /api/auth/me
Get current user profile (requires authentication).

### Volunteer Endpoints

#### GET /api/volunteer/profile
Get volunteer's own profile.

#### POST /api/volunteer/profile/step1
Save Aadhaar information.
```json
{
  "aadhaar": {
    "photoUrl": "/uploads/photo.jpg",
    "status": "yes"
  },
  "phoneIfNoAadhaar": "9876543210"
}
```

#### POST /api/volunteer/profile/step2
Save location information.
```json
{
  "location": {
    "coordinates": [78.500000, 16.300000],
    "address": "Guntur, Andhra Pradesh"
  }
}
```

#### POST /api/volunteer/profile/step3
Save description.
```json
{
  "description": "I'm a retired teacher from Guntur..."
}
```

#### POST /api/volunteer/profile/submit
Submit complete profile.

### Admin Endpoints

#### GET /api/admin/volunteers
Get all volunteers with filtering.
**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `search`: Search term
- `aadhaarStatus`: Filter by Aadhaar status
- `dateFrom`: Start date
- `dateTo`: End date
- `radius`: Search radius in km
- `latitude`: Center latitude
- `longitude`: Center longitude

#### GET /api/admin/volunteers/:id
Get specific volunteer profile.

#### GET /api/admin/volunteers/export/csv
Export volunteers to CSV.

#### GET /api/admin/stats
Get dashboard statistics.

### File Upload Endpoints

#### POST /api/upload/aadhaar
Upload Aadhaar photo (multipart/form-data).
- **Field name**: `aadhaarPhoto`
- **File types**: JPEG, PNG
- **Max size**: 5MB

## 🏗️ Project Structure

```
volunteer-management-system/
├── server/                 # Backend application
│   ├── config/            # Supabase configuration
│   ├── services/          # Supabase services
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── scripts/           # Database scripts
│   ├── uploads/           # File uploads directory
│   └── supabase-migration.sql # Database schema
├── client/                # Frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── admin/     # Admin components
│   │   │   ├── auth/      # Authentication components
│   │   │   ├── common/    # Shared components
│   │   │   └── volunteer/ # Volunteer components
│   │   ├── contexts/      # React contexts
│   │   └── App.js         # Main app component
│   └── public/            # Static assets
├── package.json           # Root package.json
├── README.md             # This file
└── SUPABASE_SETUP.md     # Supabase setup guide
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment | development |
| `SUPABASE_URL` | Supabase project URL | (required) |
| `SUPABASE_ANON_KEY` | Supabase anon key | (required) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | (required) |
| `JWT_SECRET` | JWT signing secret | (required) |
| `CLIENT_URL` | Frontend URL for CORS | http://localhost:3000 |
| `MAX_FILE_SIZE` | Maximum file upload size | 5242880 (5MB) |
| `ALLOWED_FILE_TYPES` | Allowed file types | image/jpeg,image/jpg,image/png |

### Database Schema

#### Users Table
```sql
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role VARCHAR(20) DEFAULT 'volunteer' CHECK (role IN ('admin', 'volunteer')),
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Volunteer Profiles Table
```sql
CREATE TABLE volunteer_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  aadhaar JSONB,
  phone_if_no_aadhaar VARCHAR(20),
  location JSONB,
  description TEXT,
  is_complete BOOLEAN DEFAULT false,
  submitted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🧪 Testing

### Backend Tests
```bash
cd server
npm test
```

### Frontend Tests
```bash
cd client
npm test
```

## 🚀 Deployment

### Backend Deployment (Heroku)
```bash
# Create Heroku app
heroku create your-app-name

# Set environment variables
heroku config:set SUPABASE_URL=your-supabase-url
heroku config:set SUPABASE_ANON_KEY=your-supabase-anon-key
heroku config:set SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
heroku config:set JWT_SECRET=your-production-secret
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

### Frontend Deployment (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd client
vercel
```

## 🔒 Security Features

- **JWT Authentication** with refresh tokens
- **Password Hashing** with bcrypt (12 rounds)
- **Rate Limiting** (100 requests per 15 minutes)
- **CORS Protection** with configurable origins
- **Input Validation** with express-validator
- **File Upload Security** with type and size validation
- **Row Level Security (RLS)** with Supabase
- **XSS Protection** with helmet middleware

## 📱 Responsive Design

The application is built with a mobile-first approach and includes:
- **Responsive navigation** and layouts
- **Touch-friendly** form controls
- **Optimized images** and file uploads
- **Progressive enhancement** for older browsers

## ♿ Accessibility

- **WCAG 2.1 AA compliance**
- **Keyboard navigation** support
- **Screen reader** compatibility
- **High contrast** mode support
- **Focus indicators** and ARIA labels
- **Semantic HTML** structure

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the API documentation
- Review the troubleshooting section below
- See `SUPABASE_SETUP.md` for detailed setup instructions

## 🔧 Troubleshooting

### Common Issues

#### Supabase Connection Error
```bash
# Check your environment variables
echo $SUPABASE_URL
echo $SUPABASE_ANON_KEY

# Verify your Supabase project is active
# Check the Supabase dashboard for any errors
```

#### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change port in .env
PORT=5001
```

#### File Upload Issues
- Check file size (max 5MB)
- Verify file type (JPEG/PNG only)
- Ensure uploads directory exists
- Check file permissions

#### CORS Errors
- Verify `CLIENT_URL` in `.env`
- Check browser console for specific errors
- Ensure both servers are running

### Performance Optimization

1. **Database Indexing**: Ensure proper indexes on frequently queried fields
2. **File Compression**: Enable gzip compression
3. **Caching**: Implement Redis for session storage
4. **CDN**: Use CDN for static assets in production

## 📈 Future Enhancements

- [ ] **Real-time notifications** with WebSocket
- [ ] **Advanced analytics** and reporting
- [ ] **Bulk operations** for admin
- [ ] **Email notifications** for volunteers
- [ ] **Mobile app** with React Native
- [ ] **Multi-language support**
- [ ] **Advanced mapping** with clustering
- [ ] **Data visualization** charts
- [ ] **Automated backups** and recovery
- [ ] **API rate limiting** per user
- [ ] **Supabase Storage** for file uploads
- [ ] **Real-time subscriptions** with Supabase

---

**Built with ❤️ using modern web technologies** 