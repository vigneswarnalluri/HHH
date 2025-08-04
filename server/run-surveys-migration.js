const { supabase } = require('./config/supabase');
const fs = require('fs');
const path = require('path');

async function runSurveysMigration() {
  try {
    console.log('Starting surveys migration...');
    
    // Read the migration SQL file
    const migrationPath = path.join(__dirname, 'surveys-migration.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    
    console.log('Migration SQL loaded successfully');
    
    // Split the SQL into individual statements
    const statements = migrationSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);
    
    console.log(`Found ${statements.length} SQL statements to execute`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      console.log(`Executing statement ${i + 1}/${statements.length}...`);
      
      try {
        // For now, we'll just log the statements since direct SQL execution might not be available
        console.log('Statement:', statement.substring(0, 100) + '...');
        
        // In a real implementation, you would execute this through Supabase
        // For now, we'll create the table manually through the Supabase dashboard
        // or use the Supabase CLI if available
        
      } catch (error) {
        console.error(`Error executing statement ${i + 1}:`, error);
      }
    }
    
    console.log('Migration script completed!');
    console.log('Please run the following SQL in your Supabase dashboard:');
    console.log('\n' + migrationSQL);
    
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

runSurveysMigration(); 