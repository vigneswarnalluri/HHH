const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const supabase = require('../config/supabase');

// Get all donations (admin only)
router.get('/admin/donations', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admin only.' });
    }

    const { data: donations, error } = await supabase
      .from('donations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching donations:', error);
      return res.status(500).json({ error: 'Failed to fetch donations' });
    }

    res.json({ donations: donations || [] });
  } catch (error) {
    console.error('Get donations error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get donation statistics (admin only)
router.get('/admin/donation-stats', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admin only.' });
    }

    // Get total donations
    const { data: totalDonations, error: totalError } = await supabase
      .from('donations')
      .select('amount');

    if (totalError) {
      console.error('Error fetching total donations:', totalError);
      return res.status(500).json({ error: 'Failed to fetch donation stats' });
    }

    const totalAmount = totalDonations?.reduce((sum, donation) => sum + parseFloat(donation.amount), 0) || 0;
    const totalCount = totalDonations?.length || 0;

    // Get monthly donations for current year
    const currentYear = new Date().getFullYear();
    const { data: monthlyDonations, error: monthlyError } = await supabase
      .from('donations')
      .select('amount, created_at')
      .gte('created_at', `${currentYear}-01-01`)
      .lte('created_at', `${currentYear}-12-31`);

    if (monthlyError) {
      console.error('Error fetching monthly donations:', monthlyError);
      return res.status(500).json({ error: 'Failed to fetch monthly stats' });
    }

    // Calculate monthly totals
    const monthlyTotals = new Array(12).fill(0);
    monthlyDonations?.forEach(donation => {
      const month = new Date(donation.created_at).getMonth();
      monthlyTotals[month] += parseFloat(donation.amount);
    });

    res.json({
      totalAmount: totalAmount.toFixed(2),
      totalCount,
      monthlyTotals,
      currentYear
    });
  } catch (error) {
    console.error('Get donation stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new donation
router.post('/donations', async (req, res) => {
  try {
    const { amount, donor_name, donor_email, donor_phone, payment_method, message } = req.body;

    // Validate required fields
    if (!amount || !donor_name || !donor_email) {
      return res.status(400).json({ error: 'Amount, name, and email are required' });
    }

    // Validate amount
    const donationAmount = parseFloat(amount);
    if (isNaN(donationAmount) || donationAmount <= 0) {
      return res.status(400).json({ error: 'Invalid donation amount' });
    }

    // Create donation record
    const { data: donation, error } = await supabase
      .from('donations')
      .insert({
        amount: donationAmount,
        donor_name,
        donor_email,
        donor_phone: donor_phone || null,
        payment_method: payment_method || 'card',
        message: message || null,
        status: 'pending'
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating donation:', error);
      if (error.code === '42P01') {
        return res.status(500).json({ error: 'Donations table not found. Please run the database migration first.' });
      }
      return res.status(500).json({ error: 'Failed to create donation: ' + error.message });
    }

    // In a real application, you would integrate with a payment gateway here
    // For now, we'll simulate a successful payment
    const paymentResult = await simulatePayment(donation);

    if (paymentResult.success) {
      // Update donation status to completed
      const { error: updateError } = await supabase
        .from('donations')
        .update({ status: 'completed', payment_id: paymentResult.paymentId })
        .eq('id', donation.id);

      if (updateError) {
        console.error('Error updating donation status:', updateError);
      }

      res.json({
        success: true,
        message: 'Donation completed successfully!',
        donation: {
          ...donation,
          status: 'completed',
          payment_id: paymentResult.paymentId
        }
      });
    } else {
      res.status(400).json({ error: paymentResult.error });
    }
  } catch (error) {
    console.error('Create donation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get donation by ID
router.get('/donations/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { data: donation, error } = await supabase
      .from('donations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching donation:', error);
      return res.status(404).json({ error: 'Donation not found' });
    }

    res.json({ donation });
  } catch (error) {
    console.error('Get donation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Simulate payment processing
async function simulatePayment(donation) {
  // Simulate payment processing delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate 95% success rate
  const isSuccess = Math.random() > 0.05;

  if (isSuccess) {
    return {
      success: true,
      paymentId: `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
  } else {
    return {
      success: false,
      error: 'Payment failed. Please try again.'
    };
  }
}

// Health check for donations
router.get('/donations/health', async (req, res) => {
  try {
    // Test if donations table exists
    const { data, error } = await supabase
      .from('donations')
      .select('id')
      .limit(1);

    if (error) {
      if (error.code === '42P01') {
        return res.json({ 
          status: 'error', 
          message: 'Donations table not found. Please run the database migration.',
          error: error.message 
        });
      }
      return res.json({ 
        status: 'error', 
        message: 'Database connection issue',
        error: error.message 
      });
    }

    res.json({ 
      status: 'ok', 
      message: 'Donations table exists and is accessible',
      count: data?.length || 0
    });
  } catch (error) {
    console.error('Donations health check error:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Health check failed',
      error: error.message 
    });
  }
});

module.exports = router; 