# Survey Features for Volunteer Portal

## Overview

The volunteer portal now includes comprehensive survey functionality that allows volunteers to:

1. **Track survey count** - See how many surveys they've completed
2. **Record exact location coordinates** - Capture precise GPS coordinates for each survey
3. **Store beggar details with photos** - Document beggar information including photos
4. **View survey history** - Access all previous surveys with detailed information

## Database Schema

### Surveys Table

```sql
CREATE TABLE surveys (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  volunteer_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  beggar_name VARCHAR(255),
  beggar_age INTEGER,
  beggar_gender VARCHAR(20) CHECK (gender IN ('male', 'female', 'other', 'unknown')),
  beggar_photo_url TEXT,
  location_coordinates POINT NOT NULL,
  location_address TEXT,
  survey_notes TEXT,
  survey_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## API Endpoints

### Survey Management

- `POST /api/volunteer/surveys` - Create a new survey
- `GET /api/volunteer/surveys` - Get all surveys for the volunteer
- `GET /api/volunteer/surveys/:id` - Get a specific survey
- `PUT /api/volunteer/surveys/:id` - Update a survey
- `DELETE /api/volunteer/surveys/:id` - Delete a survey

### Request/Response Examples

#### Create Survey
```json
POST /api/volunteer/surveys
{
  "beggar_name": "John Doe",
  "beggar_age": 45,
  "beggar_gender": "male",
  "beggar_photo_url": "https://example.com/photo.jpg",
  "location_coordinates": [12.9716, 77.5946],
  "location_address": "MG Road, Bangalore",
  "survey_notes": "Found begging near the metro station"
}
```

#### Get Surveys Response
```json
{
  "surveys": [
    {
      "id": "uuid",
      "volunteer_id": "uuid",
      "beggar_name": "John Doe",
      "beggar_age": 45,
      "beggar_gender": "male",
      "beggar_photo_url": "https://example.com/photo.jpg",
      "location_coordinates": "(12.9716,77.5946)",
      "location_address": "MG Road, Bangalore",
      "survey_notes": "Found begging near the metro station",
      "survey_date": "2024-01-15T10:30:00Z",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ],
  "surveyCount": 1
}
```

## Frontend Components

### 1. SurveyDashboard (`/volunteer/surveys`)
- **Statistics Cards**: Shows total surveys, this month's surveys, and this week's surveys
- **Survey List**: Displays all surveys in a table format with:
  - Beggar details (name, age, gender, photo)
  - Location information (coordinates and address)
  - Survey date
  - Action buttons (view, edit, delete)
- **Survey Detail Modal**: Click on view button to see full survey details
- **Navigation**: Links to create new surveys

### 2. NewSurveyForm (`/volunteer/survey/new`)
- **Step-by-step form** with 4 steps:
  1. **Beggar Details**: Name, age, gender
  2. **Location**: GPS coordinates (auto-detection or manual entry), address
  3. **Photo & Notes**: Upload beggar photo, add additional notes
  4. **Review & Submit**: Review all information before submission

### 3. Updated VolunteerForm
- **Navigation links** to survey dashboard and new survey form
- **Enhanced header** with survey-related navigation

## Features

### Location Tracking
- **Automatic GPS detection** using browser geolocation API
- **Manual coordinate entry** for precise location recording
- **Address field** for human-readable location description
- **Coordinate validation** to ensure valid GPS coordinates

### Photo Management
- **Photo upload** with preview functionality
- **Base64 encoding** for immediate storage
- **Image validation** to ensure proper format
- **Optional photo** - surveys can be created without photos

### Data Validation
- **Age validation**: 0-120 years
- **Gender options**: male, female, other, unknown
- **Coordinate validation**: Valid latitude/longitude ranges
- **Required fields**: Location coordinates are mandatory
- **Optional fields**: All other fields are optional

### Security
- **Authentication required** for all survey operations
- **Volunteer isolation**: Volunteers can only access their own surveys
- **Input sanitization**: All inputs are validated and sanitized
- **CSRF protection**: Built-in protection against cross-site request forgery

## Usage Instructions

### For Volunteers

1. **Access Survey Dashboard**:
   - Login to volunteer portal
   - Click "Survey Dashboard" in the header
   - View statistics and survey history

2. **Create New Survey**:
   - Click "New Survey" button
   - Follow the 4-step process:
     - Enter beggar details
     - Set location (use "Get Current Location" or enter manually)
     - Upload photo and add notes
     - Review and submit

3. **Manage Surveys**:
   - View survey details by clicking the eye icon
   - Edit surveys by clicking the edit icon
   - Delete surveys by clicking the trash icon

### For Administrators

1. **View All Surveys**:
   - Access admin dashboard
   - View comprehensive survey data
   - Export survey data for analysis

2. **Survey Analytics**:
   - Track survey completion rates
   - Analyze location patterns
   - Monitor volunteer activity

## Technical Implementation

### Backend
- **Express.js routes** for API endpoints
- **Supabase integration** for database operations
- **JWT authentication** for secure access
- **Input validation** using express-validator
- **Error handling** with proper HTTP status codes

### Frontend
- **React components** with hooks for state management
- **Responsive design** using Tailwind CSS
- **Form validation** with real-time feedback
- **File upload** with preview functionality
- **Modal dialogs** for detailed views

### Database
- **PostgreSQL** with Supabase
- **Spatial indexing** for location queries
- **Automatic timestamps** for audit trail
- **Foreign key constraints** for data integrity

## Setup Instructions

1. **Database Migration**:
   ```bash
   # Run the migration script
   cd server
   node run-surveys-migration.js
   ```

2. **Start the Application**:
   ```bash
   # Start server
   cd server && npm start
   
   # Start client (in new terminal)
   cd client && npm start
   ```

3. **Test the Features**:
   ```bash
   # Test API endpoints
   cd server && node test-survey-api.js
   ```

## Future Enhancements

1. **Map Integration**: Display surveys on an interactive map
2. **Photo Storage**: Integrate with cloud storage for better photo management
3. **Offline Support**: Allow survey creation without internet connection
4. **Analytics Dashboard**: Advanced reporting and analytics
5. **Export Features**: Export survey data to CSV/Excel
6. **Bulk Operations**: Import/export multiple surveys
7. **Real-time Updates**: Live updates when new surveys are created

## Troubleshooting

### Common Issues

1. **Location not working**: Ensure HTTPS is enabled for geolocation
2. **Photo upload fails**: Check file size and format restrictions
3. **Database errors**: Verify Supabase connection and table creation
4. **Authentication issues**: Check JWT token validity

### Debug Steps

1. Check browser console for JavaScript errors
2. Verify API endpoints are accessible
3. Confirm database tables exist
4. Test with sample data

## Support

For technical support or feature requests, please refer to the main project documentation or create an issue in the project repository. 