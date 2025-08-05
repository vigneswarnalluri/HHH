# Deploy donation count fix
Write-Host "Deploying donation count fix..." -ForegroundColor Green

# Add all changes
git add .

# Commit the fix
git commit -m "Fix: Update donations health endpoint to return correct count"

# Push to trigger deployment
git push origin main

Write-Host "Deployment triggered! Check Render dashboard for build status." -ForegroundColor Yellow
Write-Host "After deployment, test: https://hhh-1z4h.onrender.com/api/donations/health" -ForegroundColor Cyan 