-- Check if donations table exists
SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'donations'
) as table_exists;

-- If table exists, show its structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'donations'
ORDER BY ordinal_position;

-- Count records in donations table (if it exists)
SELECT COUNT(*) as donation_count FROM donations; 