# Deploy donations health check fix
Write-Host "Deploying donations health check fix..." -ForegroundColor Green

# Add all changes
git add .

# Commit the fix
git commit -m "Fix: Correct donations health check to select 'id' instead of 'count'"

# Push to trigger deployment
git push origin main

Write-Host "Deployment triggered! Check Render dashboard for build status." -ForegroundColor Yellow
Write-Host "After deployment, test: https://hhh-1z4h.onrender.com/api/donations/health" -ForegroundColor Cyan 