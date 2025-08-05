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

-- Create index on donor_email for faster lookups
CREATE INDEX IF NOT EXISTS idx_donations_donor_email ON donations(donor_email);

-- Create index on created_at for faster sorting
CREATE INDEX IF NOT EXISTS idx_donations_created_at ON donations(created_at);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(status);

-- Enable Row Level Security (RLS)
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow anyone to create donations (for public donation form)
CREATE POLICY "Allow public to create donations" ON donations
    FOR INSERT WITH CHECK (true);

-- Allow users to view their own donations (if they have an account)
CREATE POLICY "Allow users to view own donations" ON donations
    FOR SELECT USING (donor_email = current_setting('request.jwt.claims', true)::json->>'email');

-- Allow admins to view all donations
CREATE POLICY "Allow admins to view all donations" ON donations
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = (current_setting('request.jwt.claims', true)::json->>'sub')::uuid
            AND users.role = 'admin'
        )
    );

-- Allow admins to update donations
CREATE POLICY "Allow admins to update donations" ON donations
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = (current_setting('request.jwt.claims', true)::json->>'sub')::uuid
            AND users.role = 'admin'
        )
    );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_donations_updated_at 
    BEFORE UPDATE ON donations 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample donations for testing
INSERT INTO donations (amount, donor_name, donor_email, donor_phone, payment_method, status, message) VALUES
(1000.00, 'John Doe', 'john@example.com', '+91-9876543210', 'card', 'completed', 'Happy to help!'),
(500.00, 'Jane Smith', 'jane@example.com', '+91-9876543211', 'upi', 'completed', 'Keep up the good work'),
(2500.00, 'Bob Wilson', 'bob@example.com', '+91-9876543212', 'netbanking', 'completed', 'Supporting education initiatives'),
(750.00, 'Alice Brown', 'alice@example.com', '+91-9876543213', 'card', 'completed', 'For emergency relief'),
(1500.00, 'Charlie Davis', 'charlie@example.com', '+91-9876543214', 'upi', 'completed', 'Job training support');

-- Grant necessary permissions
GRANT ALL ON donations TO authenticated;
GRANT ALL ON donations TO anon; 