const { supabase, supabaseAdmin } = require('../config/supabase');

class VolunteerProfileService {
  // Create a new volunteer profile
  async createProfile(profileData) {
    try {
      const { data, error } = await supabaseAdmin
        .from('volunteer_profiles')
        .insert(profileData)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Get profile by user ID
  async getProfileByUserId(userId) {
    try {
      const { data, error } = await supabaseAdmin
        .from('volunteer_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') { // No rows returned
          return null;
        }
        throw error;
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Update profile
  async updateProfile(userId, updateData) {
    try {
      const { data, error } = await supabaseAdmin
        .from('volunteer_profiles')
        .update(updateData)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Upsert profile (create if doesn't exist, update if it does)
  async upsertProfile(userId, profileData) {
    try {
      // First check if profile exists
      const existingProfile = await this.getProfileByUserId(userId);
      
      if (existingProfile) {
        // Update existing profile
        const { data, error } = await supabaseAdmin
          .from('volunteer_profiles')
          .update(profileData)
          .eq('user_id', userId)
          .select()
          .single();

        if (error) {
          console.error('Update profile error:', error);
          throw error;
        }

        return data;
      } else {
        // Create new profile
        const { data, error } = await supabaseAdmin
          .from('volunteer_profiles')
          .insert({
            user_id: userId,
            ...profileData
          })
          .select()
          .single();

        if (error) {
          console.error('Create profile error:', error);
          throw error;
        }

        return data;
      }
    } catch (error) {
      console.error('Upsert profile error:', error);
      throw error;
    }
  }

  // Get all profiles (for admin)
  async getAllProfiles() {
    try {
      const { data, error } = await supabaseAdmin
        .from('volunteer_profiles')
        .select(`
          *,
          users (
            id,
            email,
            role,
            is_active
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Get profiles by completion status
  async getProfilesByStatus(isComplete) {
    try {
      const { data, error } = await supabaseAdmin
        .from('volunteer_profiles')
        .select(`
          *,
          users (
            id,
            email,
            role,
            is_active
          )
        `)
        .eq('is_complete', isComplete)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Get profiles within radius (for geospatial queries)
  async getProfilesWithinRadius(lat, lng, radiusKm = 10) {
    try {
      // Convert km to degrees (approximate)
      const radiusDegrees = radiusKm / 111;
      
      const { data, error } = await supabaseAdmin
        .from('volunteer_profiles')
        .select(`
          *,
          users (
            id,
            email,
            role,
            is_active
          )
        `)
        .not('location', 'is', null)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      // Filter by distance (simple calculation)
      const filteredData = data.filter(profile => {
        if (!profile.location || !profile.location.coordinates) return false;
        
        const [profileLng, profileLat] = profile.location.coordinates;
        const distance = this.calculateDistance(lat, lng, profileLat, profileLng);
        return distance <= radiusKm;
      });

      return filteredData;
    } catch (error) {
      throw error;
    }
  }

  // Calculate distance between two points (Haversine formula)
  calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Earth's radius in km
    const dLat = this.toRadians(lat2 - lat1);
    const dLng = this.toRadians(lng2 - lng1);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  // Check if profile is complete
  isProfileComplete(profile) {
    if (!profile) return false;
    
    // Check required fields
    const hasAadhaar = profile.aadhaar && 
      profile.aadhaar.status && 
      profile.aadhaar.photo_url;
    
    const hasLocation = profile.location && 
      profile.location.coordinates && 
      Array.isArray(profile.location.coordinates) &&
      profile.location.coordinates.length === 2;
    
    const hasDescription = profile.description && 
      profile.description.trim().length > 0;
    
    return hasAadhaar && hasLocation && hasDescription;
  }

  // Get profile statistics
  async getProfileStats() {
    try {
      const { data: totalProfiles, error: totalError } = await supabaseAdmin
        .from('volunteer_profiles')
        .select('count');

      const { data: completeProfiles, error: completeError } = await supabaseAdmin
        .from('volunteer_profiles')
        .select('count')
        .eq('is_complete', true);

      if (totalError || completeError) {
        throw totalError || completeError;
      }

      return {
        total: totalProfiles[0]?.count || 0,
        complete: completeProfiles[0]?.count || 0,
        incomplete: (totalProfiles[0]?.count || 0) - (completeProfiles[0]?.count || 0)
      };
    } catch (error) {
      throw error;
    }
  }

  // Get all volunteer profiles (alias for getAllProfiles)
  async getAllVolunteerProfiles() {
    return this.getAllProfiles();
  }

  // Get volunteer profile by user ID (alias for getProfileByUserId)
  async getVolunteerProfileByUserId(userId) {
    return this.getProfileByUserId(userId);
  }

  // Delete volunteer profile by user ID
  async deleteVolunteerProfileByUserId(userId) {
    try {
      const { error } = await supabaseAdmin
        .from('volunteer_profiles')
        .delete()
        .eq('user_id', userId);

      if (error) {
        throw error;
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new VolunteerProfileService(); 