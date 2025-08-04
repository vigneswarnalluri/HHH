const { supabase } = require('./config/supabase');

async function checkSurveysTable() {
  try {
    console.log('Checking if surveys table exists...');
    
    // Try to query the surveys table
    const { data, error } = await supabase
      .from('surveys')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('❌ Surveys table does not exist or is not accessible');
      console.error('Error:', error.message);
      console.log('\n📋 You need to create the surveys table in your Supabase dashboard.');
      console.log('Run this SQL in your Supabase SQL Editor:');
      console.log('\n' + `
-- Create surveys table
CREATE TABLE IF NOT EXISTS surveys (
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

-- Create indexes for surveys table
CREATE INDEX IF NOT EXISTS idx_surveys_volunteer_id ON surveys(volunteer_id);
CREATE INDEX IF NOT EXISTS idx_surveys_survey_date ON surveys(survey_date);
CREATE INDEX IF NOT EXISTS idx_surveys_location_coordinates ON surveys USING GIST(location_coordinates);

-- Create trigger to update updated_at timestamp
CREATE TRIGGER update_surveys_updated_at BEFORE UPDATE ON surveys
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Disable RLS for now
ALTER TABLE surveys DISABLE ROW LEVEL SECURITY;
      `);
    } else {
      console.log('✅ Surveys table exists and is accessible');
      console.log('Found', data.length, 'records in surveys table');
    }
    
  } catch (error) {
    console.error('❌ Error checking surveys table:', error);
  }
}

checkSurveysTable(); 