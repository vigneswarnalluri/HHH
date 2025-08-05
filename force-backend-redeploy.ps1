# Force backend redeploy
Write-Host "Forcing backend redeploy..." -ForegroundColor Green

# Add all changes
git add .

# Commit the changes
git commit -m "Force: Backend redeploy with donation routes"

# Push to GitHub
git push origin main

Write-Host "Backend redeploy triggered!" -ForegroundColor Green
Write-Host ""
Write-Host "⏳ Wait 2-3 minutes for Render to redeploy the backend" -ForegroundColor Yellow
Write-Host ""
Write-Host "🔗 Test URLs:" -ForegroundColor Cyan
Write-Host "  - Backend health: https://hhh-1z4h.onrender.com/api/health" -ForegroundColor Cyan
Write-Host "  - Donation form: https://bharathcare.netlify.app/donate" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 After redeploy:" -ForegroundColor Magenta
Write-Host "  1. Check if backend is responding" -ForegroundColor Magenta
Write-Host "  2. Test donation form submission" -ForegroundColor Magenta
Write-Host "  3. Verify admin donation dashboard" -ForegroundColor Magenta 