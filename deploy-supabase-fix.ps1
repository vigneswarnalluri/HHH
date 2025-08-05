# Deploy Supabase import fix
Write-Host "Deploying Supabase import fix..." -ForegroundColor Green

# Add all changes
git add .

# Commit the fix
git commit -m "Fix: Correct Supabase import in donations route - use destructuring"

# Push to trigger deployment
git push origin main

Write-Host "Deployment triggered! Check Render dashboard for build status." -ForegroundColor Yellow
Write-Host "After deployment, test: https://hhh-1z4h.onrender.com/api/donations/health" -ForegroundColor Cyan 