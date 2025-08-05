# Deploy RLS fix for donations
Write-Host "Deploying RLS fix for donations..." -ForegroundColor Green

# Add all changes
git add .

# Commit the fix
git commit -m "Fix: Use supabaseAdmin client for donation creation to bypass RLS"

# Push to trigger deployment
git push origin main

Write-Host "Deployment triggered! Check Render dashboard for build status." -ForegroundColor Yellow
Write-Host "After deployment, test: https://bharathcare.netlify.app/donate" -ForegroundColor Cyan 