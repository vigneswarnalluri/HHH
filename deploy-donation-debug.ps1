# Deploy donation debugging improvements
Write-Host "Deploying donation debugging improvements..." -ForegroundColor Green

# Add all changes
git add .

# Commit the changes
git commit -m "Add: Better error handling and health check for donations API"

# Push to GitHub
git push origin main

Write-Host "Donation debugging improvements deployed!" -ForegroundColor Green
Write-Host ""
Write-Host "🔍 Debug Steps:" -ForegroundColor Yellow
Write-Host "  1. Check donations health: https://hhh-1z4h.onrender.com/api/donations/health" -ForegroundColor Yellow
Write-Host "  2. If table not found, run SQL migration in Supabase" -ForegroundColor Yellow
Write-Host "  3. Test donation form again" -ForegroundColor Yellow
Write-Host ""
Write-Host "📋 SQL Migration:" -ForegroundColor Cyan
Write-Host "  Copy contents of server/donations-migration.sql to Supabase SQL Editor" -ForegroundColor Cyan 