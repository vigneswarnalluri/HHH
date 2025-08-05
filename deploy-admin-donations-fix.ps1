# Deploy admin donations fix
Write-Host "Deploying admin donations fix..." -ForegroundColor Green

# Add all changes
git add .

# Commit the fix
git commit -m "Fix: Use supabaseAdmin client for fetching donations in admin stats"

# Push to trigger deployment
git push origin main

Write-Host "Deployment triggered! Check Render dashboard for build status." -ForegroundColor Yellow
Write-Host "After deployment, test: https://bharathcare.netlify.app/admin" -ForegroundColor Cyan 