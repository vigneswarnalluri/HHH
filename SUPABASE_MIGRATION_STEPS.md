# 🗄️ Supabase Database Migration Steps

## 🚨 **Current Issue:**
The donation form is still showing "Internal server error" because the `donations` table doesn't exist in your Supabase database.

## 📋 **Step-by-Step Migration:**

### **Step 1: Access Supabase Dashboard**
1. Go to: https://supabase.com/dashboard
2. Sign in to your account
3. Select your project (the one with your existing tables)

### **Step 2: Navigate to SQL Editor**
1. In the left sidebar, click **"SQL Editor"**
2. Click **"New query"** or the **"+"** button

### **Step 3: Copy and Paste the Migration SQL**
Copy this entire SQL code and paste it into the SQL Editor:

```sql
-- Create donations table
CREATE TABLE IF NOT EXISTS donations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    amount DECIMAL(10,2) NOT NULL,
    donor_name VARCHAR(255) NOT NULL,
    donor_email VARCHAR(255) NOT NULL,
    donor_phone VARCHAR(20),
    payment_method VARCHAR(50) DEFAULT 'card',
    message TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    payment_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_donations_donor_email ON donations(donor_email);
CREATE INDEX IF NOT EXISTS idx_donations_created_at ON donations(created_at);
CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(status);

-- Enable Row Level Security
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- Create security policies
CREATE POLICY "Allow public to create donations" ON donations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow users to view own donations" ON donations FOR SELECT USING (donor_email = current_setting('request.jwt.claims', true)::json->>'email');
CREATE POLICY "Allow admins to view all donations" ON donations FOR SELECT USING (EXISTS (SELECT 1 FROM users WHERE users.id = (current_setting('request.jwt.claims', true)::json->>'sub')::uuid AND users.role = 'admin'));
CREATE POLICY "Allow admins to update donations" ON donations FOR UPDATE USING (EXISTS (SELECT 1 FROM users WHERE users.id = (current_setting('request.jwt.claims', true)::json->>'sub')::uuid AND users.role = 'admin'));

-- Insert sample data for testing
INSERT INTO donations (amount, donor_name, donor_email, donor_phone, payment_method, status, message) VALUES
(1000.00, 'John Doe', 'john@example.com', '+91-9876543210', 'card', 'completed', 'Happy to help!'),
(500.00, 'Jane Smith', 'jane@example.com', '+91-9876543211', 'upi', 'completed', 'Keep up the good work'),
(2500.00, 'Bob Wilson', 'bob@example.com', '+91-9876543212', 'netbanking', 'completed', 'Supporting education initiatives');

-- Grant necessary permissions
GRANT ALL ON donations TO authenticated;
GRANT ALL ON donations TO anon;
```

### **Step 4: Execute the Migration**
1. Click the **"Run"** button (usually a play button ▶️)
2. Wait for the execution to complete
3. You should see a success message

### **Step 5: Verify the Migration**
1. In the left sidebar, click **"Table Editor"**
2. Look for the **"donations"** table in the list
3. Click on it to see the structure and sample data

## 🧪 **Test After Migration:**

### **1. Test Donations Health Endpoint**
Visit: https://hhh-1z4h.onrender.com/api/donations/health
**Expected**: `{"status": "ok", "message": "Donations table exists..."}`

### **2. Test Donation Form**
Visit: https://bharathcare.netlify.app/donate
**Expected**: 
- ✅ No "Internal server error"
- ✅ Success modal appears
- ✅ Transaction ID shown

### **3. Test Admin Dashboard**
Visit: https://bharathcare.netlify.app/admin/donations
**Expected**: Shows donations list with sample data

## 🎯 **Success Indicators:**
- ✅ Donations health endpoint returns `{"status": "ok"}`
- ✅ Donation form submits successfully
- ✅ Success modal shows transaction details
- ✅ Admin dashboard displays donations
- ✅ No more "Internal server error"

## 📞 **If Migration Fails:**
1. **Check error message** in Supabase SQL Editor
2. **Verify you're in the correct project**
3. **Make sure you have admin permissions**
4. **Try running the SQL in smaller chunks**

**Run this migration and your donation system will work perfectly!** 🚀 