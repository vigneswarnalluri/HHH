# Deploy volunteer component API fixes
Write-Host "Fixing volunteer component API connections..." -ForegroundColor Green

# Add all changes
git add .

# Commit the changes
git commit -m "Fix: Update volunteer components to use proper API base URL"

# Push to GitHub
git push origin main

Write-Host "Volunteer component fixes deployed!" -ForegroundColor Green
Write-Host ""
Write-Host "Survey submission should now work properly!" -ForegroundColor Yellow
Write-Host "Check your app after the deployment completes." -ForegroundColor Yellow 