const { supabase } = require('../config/supabase');

class SurveyService {
  // Create a new survey
  async createSurvey(surveyData) {
    try {
      const { data, error } = await supabase
        .from('surveys')
        .insert([surveyData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Create survey error:', error);
      throw error;
    }
  }

  // Get all surveys for a volunteer
  async getSurveysByVolunteerId(volunteerId) {
    try {
      const { data, error } = await supabase
        .from('surveys')
        .select('*')
        .eq('volunteer_id', volunteerId)
        .order('survey_date', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Get surveys error:', error);
      throw error;
    }
  }

  // Get survey count for a volunteer
  async getSurveyCountByVolunteerId(volunteerId) {
    try {
      const { count, error } = await supabase
        .from('surveys')
        .select('*', { count: 'exact', head: true })
        .eq('volunteer_id', volunteerId);

      if (error) throw error;
      return count;
    } catch (error) {
      console.error('Get survey count error:', error);
      throw error;
    }
  }

  // Get survey by ID
  async getSurveyById(surveyId) {
    try {
      const { data, error } = await supabase
        .from('surveys')
        .select('*')
        .eq('id', surveyId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Get survey by ID error:', error);
      throw error;
    }
  }

  // Update survey
  async updateSurvey(surveyId, updateData) {
    try {
      const { data, error } = await supabase
        .from('surveys')
        .update(updateData)
        .eq('id', surveyId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Update survey error:', error);
      throw error;
    }
  }

  // Delete survey
  async deleteSurvey(surveyId) {
    try {
      const { error } = await supabase
        .from('surveys')
        .delete()
        .eq('id', surveyId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Delete survey error:', error);
      throw error;
    }
  }

  // Get all surveys (for admin)
  async getAllSurveys() {
    try {
      const { data, error } = await supabase
        .from('surveys')
        .select(`
          *,
          volunteer:users!surveys_volunteer_id_fkey(email, phone)
        `)
        .order('survey_date', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Get all surveys error:', error);
      throw error;
    }
  }

  // Get surveys with location data for mapping
  async getSurveysWithLocations() {
    try {
      const { data, error } = await supabase
        .from('surveys')
        .select(`
          id,
          location_coordinates,
          location_address,
          beggar_name,
          beggar_age,
          beggar_gender,
          survey_date,
          volunteer:users!surveys_volunteer_id_fkey(email)
        `)
        .order('survey_date', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Get surveys with locations error:', error);
      throw error;
    }
  }

  // Delete surveys by volunteer ID
  async deleteSurveysByVolunteerId(volunteerId) {
    try {
      const { error } = await supabase
        .from('surveys')
        .delete()
        .eq('volunteer_id', volunteerId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Delete surveys by volunteer ID error:', error);
      throw error;
    }
  }
}

module.exports = new SurveyService(); 