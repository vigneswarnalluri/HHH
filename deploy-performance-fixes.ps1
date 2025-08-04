# Deploy performance and survey loading fixes
Write-Host "Deploying performance and survey loading fixes..." -ForegroundColor Green

# Add all changes
git add .

# Commit the changes
git commit -m "Fix: Optimize survey loading and improve performance with better error handling"

# Push to GitHub
git push origin main

Write-Host "Performance fixes deployed!" -ForegroundColor Green
Write-Host ""
Write-Host "The survey loading issue should now be fixed!" -ForegroundColor Yellow
Write-Host "Loading times should be significantly improved." -ForegroundColor Yellow
Write-Host ""
Write-Host "Check your app after the deployment completes." -ForegroundColor Cyan 