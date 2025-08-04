const axios = require('axios');
const jwt = require('jsonwebtoken');
const userService = require('./services/userService');

async function testAdminDashboard() {
  try {
    console.log('🔍 Testing Admin Dashboard endpoints...\n');

    // Get admin user
    const users = await userService.getAllUsers();
    const adminUser = users.find(user => user.role === 'admin');
    
    if (!adminUser) {
      console.error('❌ No admin users found');
      return;
    }

    console.log('✅ Found admin user:', adminUser.email);

    // Create a JWT token
    const token = jwt.sign(
      { userId: adminUser.id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Test admin stats endpoint
    console.log('\n🔍 Testing GET /api/admin/stats...');
    try {
      const statsResponse = await axios.get('http://localhost:5000/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('✅ Admin stats successful!');
      console.log('Status:', statsResponse.status);
      console.log('Stats data:', statsResponse.data);
    } catch (error) {
      console.log('❌ Admin stats failed');
      console.log('Status:', error.response?.status);
      console.log('Error data:', error.response?.data);
    }

    // Test admin volunteers endpoint
    console.log('\n🔍 Testing GET /api/admin/volunteers...');
    try {
      const volunteersResponse = await axios.get('http://localhost:5000/api/admin/volunteers', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('✅ Admin volunteers successful!');
      console.log('Status:', volunteersResponse.status);
      console.log('Volunteers count:', volunteersResponse.data.volunteers?.length || 0);
    } catch (error) {
      console.log('❌ Admin volunteers failed');
      console.log('Status:', error.response?.status);
      console.log('Error data:', error.response?.data);
    }

    // Test admin surveys endpoint
    console.log('\n🔍 Testing GET /api/admin/surveys...');
    try {
      const surveysResponse = await axios.get('http://localhost:5000/api/admin/surveys', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('✅ Admin surveys successful!');
      console.log('Status:', surveysResponse.status);
      console.log('Surveys count:', surveysResponse.data.surveys?.length || 0);
    } catch (error) {
      console.log('❌ Admin surveys failed');
      console.log('Status:', error.response?.status);
      console.log('Error data:', error.response?.data);
    }

  } catch (error) {
    console.error('❌ Test error:', error);
  }
}

testAdminDashboard(); 