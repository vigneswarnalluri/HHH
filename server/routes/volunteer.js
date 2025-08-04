const express = require('express');
const { body, validationResult } = require('express-validator');
const volunteerProfileService = require('../services/volunteerProfileService');
const surveyService = require('../services/surveyService');
const { auth, requireVolunteer } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/volunteer/profile
// @desc    Get volunteer's own profile
// @access  Private (Volunteer only)
router.get('/profile', auth, requireVolunteer, async (req, res) => {
  try {
    const profile = await volunteerProfileService.getProfileByUserId(req.user.id);
    
    if (!profile) {
      return res.json({ profile: null });
    }
    
    res.json({ profile });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

// @route   POST /api/volunteer/profile/step1
// @desc    Save Aadhaar information (Step 1)
// @access  Private (Volunteer only)
router.post('/profile/step1', [
  auth,
  requireVolunteer,
  body('aadhaar.photoUrl').notEmpty().withMessage('Aadhaar photo is required'),
  body('aadhaar.status').isIn(['yes', 'no', 'unknown']).withMessage('Invalid Aadhaar status'),
  body('phoneIfNoAadhaar').optional().isMobilePhone('en-IN')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { aadhaar, phoneIfNoAadhaar } = req.body;

    // Validate phone requirement
    if (aadhaar.status === 'no' && !phoneIfNoAadhaar) {
      return res.status(400).json({ 
        error: 'Phone number is required when Aadhaar status is "No"' 
      });
    }

    const profileData = {
      aadhaar: {
        photo_url: aadhaar.photoUrl,
        status: aadhaar.status
      }
    };

    if (phoneIfNoAadhaar) {
      profileData.phone_if_no_aadhaar = phoneIfNoAadhaar;
    }

    // Use upsert to handle both create and update
    const profile = await volunteerProfileService.upsertProfile(req.user.id, profileData);
    
    res.json({ 
      profile,
      message: 'Step 1 completed successfully',
      nextStep: 'location'
    });
  } catch (error) {
    console.error('Step 1 error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

// @route   POST /api/volunteer/profile/step2
// @desc    Save location information (Step 2)
// @access  Private (Volunteer only)
router.post('/profile/step2', [
  auth,
  requireVolunteer,
  body('location.coordinates').isArray({ min: 2, max: 2 }).withMessage('Coordinates must be an array with 2 elements'),
  body('location.coordinates.*').isFloat({ min: -180, max: 180 }).withMessage('Invalid coordinate values'),
  body('location.address').optional().isString()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { location } = req.body;

    const existingProfile = await volunteerProfileService.getProfileByUserId(req.user.id);
    
    if (!existingProfile) {
      return res.status(400).json({ error: 'Please complete Step 1 first' });
    }

    const profileData = {
      location: {
        type: 'Point',
        coordinates: location.coordinates,
        address: location.address
      }
    };

    const profile = await volunteerProfileService.updateProfile(req.user.id, profileData);
    
    res.json({ 
      profile,
      message: 'Step 2 completed successfully',
      nextStep: 'description'
    });
  } catch (error) {
    console.error('Step 2 error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

// @route   POST /api/volunteer/profile/step3
// @desc    Save description (Step 3)
// @access  Private (Volunteer only)
router.post('/profile/step3', [
  auth,
  requireVolunteer,
  body('description').isLength({ min: 10, max: 1000 }).withMessage('Description must be between 10 and 1000 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { description } = req.body;

    const existingProfile = await volunteerProfileService.getProfileByUserId(req.user.id);
    
    if (!existingProfile) {
      return res.status(400).json({ error: 'Please complete previous steps first' });
    }

    const profileData = { description };
    const profile = await volunteerProfileService.updateProfile(req.user.id, profileData);
    
    res.json({ 
      profile,
      message: 'Step 3 completed successfully',
      nextStep: 'review'
    });
  } catch (error) {
    console.error('Step 3 error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

// @route   POST /api/volunteer/profile/submit
// @desc    Submit complete profile
// @access  Private (Volunteer only)
router.post('/profile/submit', [
  auth,
  requireVolunteer
], async (req, res) => {
  try {
    const profile = await volunteerProfileService.getProfileByUserId(req.user.id);
    
    if (!profile) {
      return res.status(400).json({ error: 'Profile not found' });
    }

    if (!volunteerProfileService.isProfileComplete(profile)) {
      return res.status(400).json({ error: 'Profile is incomplete' });
    }

    if (profile.is_complete) {
      return res.status(400).json({ error: 'Profile already submitted' });
    }

    const profileData = {
      is_complete: true,
      submitted_at: new Date().toISOString()
    };

    const updatedProfile = await volunteerProfileService.updateProfile(req.user.id, profileData);
    
    res.json({ 
      profile: updatedProfile,
      message: 'Profile submitted successfully'
    });
  } catch (error) {
    console.error('Profile submission error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

// @route   PUT /api/volunteer/profile
// @desc    Update volunteer profile
// @access  Private (Volunteer only)
router.put('/profile', [
  auth,
  requireVolunteer
], async (req, res) => {
  try {
    const profile = await volunteerProfileService.getProfileByUserId(req.user.id);
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    // Only allow updates if profile is not complete
    if (profile.is_complete) {
      return res.status(400).json({ error: 'Cannot update completed profile' });
    }

    const updates = req.body;
    // Remove protected fields
    delete updates.user_id;
    delete updates.id;
    delete updates.is_complete;
    delete updates.submitted_at;

    const updatedProfile = await volunteerProfileService.updateProfile(req.user.id, updates);
    
    res.json({ 
      profile: updatedProfile,
      message: 'Profile updated successfully'
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

// Survey Routes

// @route   POST /api/volunteer/surveys
// @desc    Create a new survey
// @access  Private (Volunteer only)
router.post('/surveys', [
  auth,
  requireVolunteer,
  body('beggar_name').optional().isString().isLength({ max: 255 }),
  body('beggar_age').optional().custom((value) => {
    if (value === null || value === undefined || value === '') return true;
    const age = parseInt(value);
    if (isNaN(age) || age < 0 || age > 120) {
      throw new Error('Age must be between 0 and 120');
    }
    return true;
  }),
  body('beggar_gender').optional().isIn(['male', 'female', 'other', 'unknown']),
  body('beggar_photo_url').optional().isString(),
  body('location_coordinates').isArray({ min: 2, max: 2 }).withMessage('Coordinates must be an array with 2 elements'),
  body('location_coordinates.*').isFloat({ min: -180, max: 180 }).withMessage('Invalid coordinate values'),
  body('location_address').optional().isString(),
  body('survey_notes').optional().custom((value) => {
    if (value === null || value === undefined || value === '') return true;
    if (typeof value !== 'string' || value.length > 1000) {
      throw new Error('Notes must be less than 1000 characters');
    }
    return true;
  })
], async (req, res) => {
  try {
    console.log('🔍 Debug: Survey creation request received');
    console.log('🔍 Debug: User:', req.user);
    console.log('🔍 Debug: Request body:', req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('🔍 Debug: Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      beggar_name,
      beggar_age,
      beggar_gender,
      beggar_photo_url,
      location_coordinates,
      location_address,
      survey_notes
    } = req.body;

    const surveyData = {
      volunteer_id: req.user.id,
      beggar_name,
      beggar_age,
      beggar_gender,
      beggar_photo_url,
      location_coordinates: `(${location_coordinates[0]},${location_coordinates[1]})`,
      location_address,
      survey_notes
    };

    console.log('🔍 Debug: Survey data to be created:', surveyData);

    const survey = await surveyService.createSurvey(surveyData);
    
    console.log('🔍 Debug: Survey created successfully:', survey.id);
    
    res.json({ 
      survey,
      message: 'Survey created successfully'
    });
  } catch (error) {
    console.error('Create survey error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

// @route   GET /api/volunteer/surveys
// @desc    Get all surveys for the volunteer
// @access  Private (Volunteer only)
router.get('/surveys', auth, requireVolunteer, async (req, res) => {
  try {
    const surveys = await surveyService.getSurveysByVolunteerId(req.user.id);
    const surveyCount = await surveyService.getSurveyCountByVolunteerId(req.user.id);
    
    res.json({ 
      surveys,
      surveyCount
    });
  } catch (error) {
    console.error('Get surveys error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

// @route   GET /api/volunteer/surveys/:id
// @desc    Get a specific survey
// @access  Private (Volunteer only)
router.get('/surveys/:id', auth, requireVolunteer, async (req, res) => {
  try {
    const survey = await surveyService.getSurveyById(req.params.id);
    
    if (!survey) {
      return res.status(404).json({ error: 'Survey not found' });
    }

    // Check if the survey belongs to the current volunteer
    if (survey.volunteer_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    res.json({ survey });
  } catch (error) {
    console.error('Get survey error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

// @route   PUT /api/volunteer/surveys/:id
// @desc    Update a survey
// @access  Private (Volunteer only)
router.put('/surveys/:id', [
  auth,
  requireVolunteer,
  body('beggar_name').optional().isString().isLength({ max: 255 }),
  body('beggar_age').optional().custom((value) => {
    if (value === null || value === undefined || value === '') return true;
    const age = parseInt(value);
    if (isNaN(age) || age < 0 || age > 120) {
      throw new Error('Age must be between 0 and 120');
    }
    return true;
  }),
  body('beggar_gender').optional().isIn(['male', 'female', 'other', 'unknown']),
  body('beggar_photo_url').optional().isString(),
  body('location_coordinates').optional().isArray({ min: 2, max: 2 }).withMessage('Coordinates must be an array with 2 elements'),
  body('location_coordinates.*').optional().isFloat({ min: -180, max: 180 }).withMessage('Invalid coordinate values'),
  body('location_address').optional().isString(),
  body('survey_notes').optional().custom((value) => {
    if (value === null || value === undefined || value === '') return true;
    if (typeof value !== 'string' || value.length > 1000) {
      throw new Error('Notes must be less than 1000 characters');
    }
    return true;
  })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const survey = await surveyService.getSurveyById(req.params.id);
    
    if (!survey) {
      return res.status(404).json({ error: 'Survey not found' });
    }

    // Check if the survey belongs to the current volunteer
    if (survey.volunteer_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const updateData = { ...req.body };
    
    // Handle coordinates format
    if (updateData.location_coordinates) {
      updateData.location_coordinates = `(${updateData.location_coordinates[0]},${updateData.location_coordinates[1]})`;
    }

    const updatedSurvey = await surveyService.updateSurvey(req.params.id, updateData);
    
    res.json({ 
      survey: updatedSurvey,
      message: 'Survey updated successfully'
    });
  } catch (error) {
    console.error('Update survey error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

// @route   DELETE /api/volunteer/surveys/:id
// @desc    Delete a survey
// @access  Private (Volunteer only)
router.delete('/surveys/:id', auth, requireVolunteer, async (req, res) => {
  try {
    const survey = await surveyService.getSurveyById(req.params.id);
    
    if (!survey) {
      return res.status(404).json({ error: 'Survey not found' });
    }

    // Check if the survey belongs to the current volunteer
    if (survey.volunteer_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await surveyService.deleteSurvey(req.params.id);
    
    res.json({ message: 'Survey deleted successfully' });
  } catch (error) {
    console.error('Delete survey error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router; 