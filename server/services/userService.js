const bcrypt = require('bcryptjs');
const { supabase, supabaseAdmin } = require('../config/supabase');

class UserService {
  // Create a new user
  async createUser(userData) {
    try {
      const { email, password, phone, role = 'volunteer' } = userData;
      
      // Hash password
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      const { data, error } = await supabaseAdmin
        .from('users')
        .insert({
          email: email.toLowerCase().trim(),
          password: hashedPassword,
          phone,
          role,
          is_active: true,
          last_login: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          throw new Error('User with this email already exists.');
        }
        throw error;
      }

      return this.toPublicJSON(data);
    } catch (error) {
      throw error;
    }
  }

  // Find user by email
  async findByEmail(email) {
    try {
      const { data, error } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('email', email.toLowerCase().trim())
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

  // Find user by ID
  async findById(id) {
    try {
      const { data, error } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('id', id)
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

  // Update user
  async updateUser(id, updateData) {
    try {
      const { data, error } = await supabaseAdmin
        .from('users')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return this.toPublicJSON(data);
    } catch (error) {
      throw error;
    }
  }

  // Update last login
  async updateLastLogin(id) {
    try {
      const { error } = await supabaseAdmin
        .from('users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', id);

      if (error) {
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  // Compare password
  async comparePassword(user, candidatePassword) {
    return bcrypt.compare(candidatePassword, user.password);
  }

  // Convert user data to public JSON (without password)
  toPublicJSON(user) {
    if (!user) return null;
    const { password, ...publicUser } = user;
    return publicUser;
  }

  // Get all users (for admin)
  async getAllUsers() {
    try {
      const { data, error } = await supabaseAdmin
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data.map(user => this.toPublicJSON(user));
    } catch (error) {
      throw error;
    }
  }

  // Get users by role
  async getUsersByRole(role) {
    try {
      const { data, error } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('role', role)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data.map(user => this.toPublicJSON(user));
    } catch (error) {
      throw error;
    }
  }

  // Get user by ID (alias for findById)
  async getUserById(id) {
    return this.findById(id);
  }

  // Delete user
  async deleteUser(id) {
    try {
      const { error } = await supabaseAdmin
        .from('users')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserService(); 