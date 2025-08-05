# Deploy styling fixes for better text visibility
Write-Host "Fixing donation form styling for better text visibility..." -ForegroundColor Green

# Add all changes
git add .

# Commit the changes
git commit -m "Fix: Improve text visibility in donation form - selected buttons now have white text on orange background"

# Push to GitHub
git push origin main

Write-Host "Styling fixes deployed!" -ForegroundColor Green
Write-Host ""
Write-Host "✅ Fixed:" -ForegroundColor Yellow
Write-Host "  - Selected amount buttons now have white text on orange background" -ForegroundColor Yellow
Write-Host "  - Selected payment method buttons now have white text on orange background" -ForegroundColor Yellow
Write-Host "  - Form inputs now have better contrast with white background" -ForegroundColor Yellow
Write-Host "  - Added shadow to selected buttons for better visual feedback" -ForegroundColor Yellow
Write-Host ""
Write-Host "🔗 Test the donation form:" -ForegroundColor Cyan
Write-Host "  https://bharathcare.netlify.app/donate" -ForegroundColor Cyan 