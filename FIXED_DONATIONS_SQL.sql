-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow public to create donations" ON donations;
DROP POLICY IF EXISTS "Allow users to view own donations" ON donations;
DROP POLICY IF EXISTS "Allow admins to view all donations" ON donations;
DROP POLICY IF EXISTS "Allow admins to update donations" ON donations;

-- Create donations table (if it doesn't exist)
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

-- Create indexes for performance (if they don't exist)
CREATE INDEX IF NOT EXISTS idx_donations_donor_email ON donations(donor_email);
CREATE INDEX IF NOT EXISTS idx_donations_created_at ON donations(created_at);
CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(status);

-- Enable Row Level Security
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- Create security policies (fresh)
CREATE POLICY "Allow public to create donations" ON donations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow users to view own donations" ON donations FOR SELECT USING (donor_email = current_setting('request.jwt.claims', true)::json->>'email');
CREATE POLICY "Allow admins to view all donations" ON donations FOR SELECT USING (EXISTS (SELECT 1 FROM users WHERE users.id = (current_setting('request.jwt.claims', true)::json->>'sub')::uuid AND users.role = 'admin'));
CREATE POLICY "Allow admins to update donations" ON donations FOR UPDATE USING (EXISTS (SELECT 1 FROM users WHERE users.id = (current_setting('request.jwt.claims', true)::json->>'sub')::uuid AND users.role = 'admin'));

-- Insert sample data for testing (only if table is empty)
INSERT INTO donations (amount, donor_name, donor_email, donor_phone, payment_method, status, message)
SELECT * FROM (VALUES
    (1000.00, 'John Doe', 'john@example.com', '+91-9876543210', 'card', 'completed', 'Happy to help!'),
    (500.00, 'Jane Smith', 'jane@example.com', '+91-9876543211', 'upi', 'completed', 'Keep up the good work'),
    (2500.00, 'Bob Wilson', 'bob@example.com', '+91-9876543212', 'netbanking', 'completed', 'Supporting education initiatives')
) AS v(amount, donor_name, donor_email, donor_phone, payment_method, status, message)
WHERE NOT EXISTS (SELECT 1 FROM donations LIMIT 1);

-- Grant necessary permissions
GRANT ALL ON donations TO authenticated;
GRANT ALL ON donations TO anon; 