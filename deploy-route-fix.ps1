# Deploy route ordering fix
Write-Host "Deploying route ordering fix..." -ForegroundColor Green

# Add all changes
git add .

# Commit the fix
git commit -m "Fix: Move donations/health route before dynamic route to prevent route conflicts"

# Push to trigger deployment
git push origin main

Write-Host "Deployment triggered! Check Render dashboard for build status." -ForegroundColor Yellow
Write-Host "After deployment, test: https://hhh-1z4h.onrender.com/api/donations/health" -ForegroundColor Cyan 