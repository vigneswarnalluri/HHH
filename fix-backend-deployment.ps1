# Fix backend deployment error
Write-Host "Fixing backend deployment error..." -ForegroundColor Green

# Add all changes
git add .

# Commit the changes
git commit -m "Fix: Correct middleware import in donations route - use 'auth' instead of 'authenticateToken'"

# Push to GitHub
git push origin main

Write-Host "Backend deployment fix deployed!" -ForegroundColor Green
Write-Host ""
Write-Host "✅ Fixed:" -ForegroundColor Yellow
Write-Host "  - Changed authenticateToken to auth in donations route" -ForegroundColor Yellow
Write-Host "  - Fixed middleware import issue" -ForegroundColor Yellow
Write-Host "  - Backend should now deploy successfully" -ForegroundColor Yellow
Write-Host ""
Write-Host "⏳ Wait 2-3 minutes for Render to redeploy the backend" -ForegroundColor Cyan
Write-Host ""
Write-Host "🔗 Check backend status:" -ForegroundColor Cyan
Write-Host "  https://dashboard.render.com/web/srv-d285jlmuk2gs73etbhog" -ForegroundColor Cyan 