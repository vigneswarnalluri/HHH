# Deploy authentication token fixes
Write-Host "Fixing authentication token handling..." -ForegroundColor Green

# Add all changes
git add .

# Commit the changes
git commit -m "Fix: Update API utility to automatically include auth token"

# Push to GitHub
git push origin main

Write-Host "Authentication fixes deployed!" -ForegroundColor Green
Write-Host ""
Write-Host "Your admin dashboard should now load data properly!" -ForegroundColor Yellow
Write-Host "Check your app after the deployment completes." -ForegroundColor Yellow 