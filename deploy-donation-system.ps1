# Deploy complete donation system
Write-Host "Setting up complete donation system..." -ForegroundColor Green

# Add all changes
git add .

# Commit the changes
git commit -m "Add: Complete donation system with backend API, frontend integration, and admin dashboard"

# Push to GitHub
git push origin main

Write-Host "Donation system deployed!" -ForegroundColor Green
Write-Host ""
Write-Host "✅ What's been added:" -ForegroundColor Yellow
Write-Host "  - Backend donation API routes" -ForegroundColor Yellow
Write-Host "  - Donations database table" -ForegroundColor Yellow
Write-Host "  - Frontend donation form with payment integration" -ForegroundColor Yellow
Write-Host "  - Admin donation management dashboard" -ForegroundColor Yellow
Write-Host "  - Donation statistics in admin overview" -ForegroundColor Yellow
Write-Host ""
Write-Host "🔗 Test the donation system:" -ForegroundColor Cyan
Write-Host "  - Frontend: https://bharathcare.netlify.app/donate" -ForegroundColor Cyan
Write-Host "  - Admin: https://bharathcare.netlify.app/admin/donations" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Magenta
Write-Host "  1. Run the SQL migration in Supabase" -ForegroundColor Magenta
Write-Host "  2. Test donation form submission" -ForegroundColor Magenta
Write-Host "  3. Check admin donation dashboard" -ForegroundColor Magenta 