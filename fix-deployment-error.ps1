# Fix deployment error by removing unused imports
Write-Host "Fixing deployment error - removing unused imports..." -ForegroundColor Green

# Add all changes
git add .

# Commit the changes
git commit -m "Fix: Remove unused imports FiUser and FiCalendar from DonationList.js"

# Push to GitHub
git push origin main

Write-Host "Deployment error fix deployed!" -ForegroundColor Green
Write-Host ""
Write-Host "✅ Fixed:" -ForegroundColor Yellow
Write-Host "  - Removed unused FiUser import" -ForegroundColor Yellow
Write-Host "  - Removed unused FiCalendar import" -ForegroundColor Yellow
Write-Host "  - ESLint warnings should now be resolved" -ForegroundColor Yellow
Write-Host ""
Write-Host "🔗 Check deployment:" -ForegroundColor Cyan
Write-Host "  https://app.netlify.com/projects/bharathcare/deploys" -ForegroundColor Cyan 