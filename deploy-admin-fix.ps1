# Deploy admin route Supabase import fix
Write-Host "Deploying admin route Supabase import fix..." -ForegroundColor Green

# Add all changes
git add .

# Commit the fix
git commit -m "Fix: Correct Supabase import in admin route - use destructuring"

# Push to trigger deployment
git push origin main

Write-Host "Deployment triggered! Check Render dashboard for build status." -ForegroundColor Yellow
Write-Host "After deployment, test: https://bharathcare.netlify.app/admin" -ForegroundColor Cyan 