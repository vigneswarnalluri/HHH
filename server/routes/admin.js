const express = require('express');
const { body, validationResult } = require('express-validator');
const { auth } = require('../middleware/auth');
const userService = require('../services/userService');
const volunteerProfileService = require('../services/volunteerProfileService');
const surveyService = require('../services/surveyService');

const router = express.Router();

// Get admin dashboard statistics
router.get('/stats', [auth, (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
}], async (req, res) => {
  try {
    console.log('🔍 Fetching admin stats for user:', req.user.id);

    // Get all volunteers
    const volunteers = await userService.getUsersByRole('volunteer');
    console.log('📊 Found volunteers:', volunteers.length);

    // Get volunteer profiles
    const volunteerProfiles = await volunteerProfileService.getAllVolunteerProfiles();
    console.log('📊 Found volunteer profiles:', volunteerProfiles.length);

    // Get all surveys
    const surveys = await surveyService.getAllSurveys();
    console.log('📊 Found surveys:', surveys.length);

    // Calculate statistics
    const totalVolunteers = volunteers.length;
    const completeProfiles = volunteerProfiles.filter(profile => 
      profile.aadhaar_number && profile.location_coordinates
    ).length;
    const incompleteProfiles = totalVolunteers - completeProfiles;

    // Aadhaar status breakdown
    const aadhaarStats = volunteerProfiles.reduce((acc, profile) => {
      if (profile.aadhaar_number) {
        acc.haveAadhaar = (acc.haveAadhaar || 0) + 1;
      } else {
        acc.noAadhaar = (acc.noAadhaar || 0) + 1;
      }
      return acc;
    }, {});

    // Survey statistics
    const totalSurveys = surveys.length;
    const surveysThisMonth = surveys.filter(survey => {
      const surveyDate = new Date(survey.survey_date);
      const now = new Date();
      return surveyDate.getMonth() === now.getMonth() && 
             surveyDate.getFullYear() === now.getFullYear();
    }).length;

    const surveysThisWeek = surveys.filter(survey => {
      const surveyDate = new Date(survey.survey_date);
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return surveyDate >= weekAgo;
    }).length;

    // Recent submissions (last 5 volunteer registrations)
    const recentSubmissions = volunteers
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 5)
      .map(volunteer => ({
        id: volunteer.id,
        email: volunteer.email,
        name: volunteer.name || 'N/A',
        created_at: volunteer.created_at,
        status: volunteerProfiles.find(p => p.user_id === volunteer.id) ? 'Complete' : 'Incomplete'
      }));

    const stats = {
      totalVolunteers,
      completeProfiles,
      incompleteProfiles,
      totalSurveys,
      surveysThisMonth,
      surveysThisWeek,
      aadhaarStats: {
        haveAadhaar: aadhaarStats.haveAadhaar || 0,
        noAadhaar: aadhaarStats.noAadhaar || 0,
        unknown: totalVolunteers - (aadhaarStats.haveAadhaar || 0) - (aadhaarStats.noAadhaar || 0)
      },
      recentSubmissions
    };

    console.log('📊 Admin stats calculated:', stats);

    res.json(stats);
  } catch (error) {
    console.error('❌ Error fetching admin stats:', error);
    res.status(500).json({ error: 'Failed to fetch admin statistics' });
  }
});

// Get all volunteers with their profiles
router.get('/volunteers', [auth, (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
}], async (req, res) => {
  try {
    console.log('🔍 Fetching all volunteers for admin');

    const volunteers = await userService.getUsersByRole('volunteer');
    const volunteerProfiles = await volunteerProfileService.getAllVolunteerProfiles();
    const surveys = await surveyService.getAllSurveys();

    // Combine volunteer data with profiles and survey counts
    const volunteersWithDetails = volunteers.map(volunteer => {
      const profile = volunteerProfiles.find(p => p.user_id === volunteer.id);
      const volunteerSurveys = surveys.filter(s => s.volunteer_id === volunteer.id);
      
      return {
        id: volunteer.id,
        email: volunteer.email,
        name: volunteer.name || 'N/A',
        role: volunteer.role,
        created_at: volunteer.created_at,
        profile: profile ? {
          aadhaar_number: profile.aadhaar_number,
          location_coordinates: profile.location_coordinates,
          location_address: profile.location_address,
          description: profile.description,
          photo_url: profile.photo_url
        } : null,
        survey_count: volunteerSurveys.length,
        last_survey: volunteerSurveys.length > 0 ? 
          volunteerSurveys.sort((a, b) => new Date(b.survey_date) - new Date(a.survey_date))[0].survey_date : null
      };
    });

    console.log('📊 Returning volunteers with details:', volunteersWithDetails.length);

    res.json({ volunteers: volunteersWithDetails });
  } catch (error) {
    console.error('❌ Error fetching volunteers:', error);
    res.status(500).json({ error: 'Failed to fetch volunteers' });
  }
});

// Get volunteer details by ID
router.get('/volunteers/:id', [auth, (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
}], async (req, res) => {
  try {
    const { id } = req.params;
    console.log('🔍 Fetching volunteer details for ID:', id);

    const volunteer = await userService.getUserById(id);
    if (!volunteer || volunteer.role !== 'volunteer') {
      return res.status(404).json({ error: 'Volunteer not found' });
    }

    const profile = await volunteerProfileService.getVolunteerProfileByUserId(id);
    const surveys = await surveyService.getSurveysByVolunteerId(id);

    const volunteerDetails = {
      id: volunteer.id,
      email: volunteer.email,
      name: volunteer.name || 'N/A',
      role: volunteer.role,
      created_at: volunteer.created_at,
      profile: profile || null,
      surveys: surveys || [],
      survey_count: surveys.length
    };

    console.log('📊 Returning volunteer details for:', volunteer.email);

    res.json(volunteerDetails);
  } catch (error) {
    console.error('❌ Error fetching volunteer details:', error);
    res.status(500).json({ error: 'Failed to fetch volunteer details' });
  }
});

// Get all surveys with volunteer details
router.get('/surveys', [auth, (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
}], async (req, res) => {
  try {
    console.log('🔍 Fetching all surveys for admin');

    const surveys = await surveyService.getAllSurveys();
    const volunteers = await userService.getUsersByRole('volunteer');

    // Add volunteer details to surveys
    const surveysWithVolunteerDetails = surveys.map(survey => {
      const volunteer = volunteers.find(v => v.id === survey.volunteer_id);
      return {
        ...survey,
        volunteer_email: volunteer ? volunteer.email : 'Unknown',
        volunteer_name: volunteer ? (volunteer.name || 'N/A') : 'Unknown'
      };
    });

    console.log('📊 Returning surveys with volunteer details:', surveysWithVolunteerDetails.length);

    res.json({ surveys: surveysWithVolunteerDetails });
  } catch (error) {
    console.error('❌ Error fetching surveys:', error);
    res.status(500).json({ error: 'Failed to fetch surveys' });
  }
});

// Delete volunteer (admin only)
router.delete('/volunteers/:id', [auth, (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
}], async (req, res) => {
  try {
    const { id } = req.params;
    console.log('🔍 Admin deleting volunteer:', id);

    const volunteer = await userService.getUserById(id);
    if (!volunteer || volunteer.role !== 'volunteer') {
      return res.status(404).json({ error: 'Volunteer not found' });
    }

    // Delete volunteer profile and surveys first
    await volunteerProfileService.deleteVolunteerProfileByUserId(id);
    await surveyService.deleteSurveysByVolunteerId(id);
    
    // Delete the user
    await userService.deleteUser(id);

    console.log('✅ Volunteer deleted successfully:', volunteer.email);

    res.json({ message: 'Volunteer deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting volunteer:', error);
    res.status(500).json({ error: 'Failed to delete volunteer' });
  }
});

module.exports = router; 