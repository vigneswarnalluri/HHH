# Fix API connection issues
Write-Host "🔧 Fixing API connection..." -ForegroundColor Green

# Add all changes
git add .

# Commit the changes
git commit -m "Fix: Update AuthContext and add API utility for proper backend connection"

# Push to GitHub
git push origin main

Write-Host "✅ API connection fixes pushed to GitHub!" -ForegroundColor Green
Write-Host ""
Write-Host "🎉 Your app should now connect to the backend properly!" -ForegroundColor Yellow
Write-Host "📋 Check your Netlify dashboard for the new deployment." -ForegroundColor Yellow
Write-Host ""
Write-Host "🔗 Your app: https://bharathcare.netlify.app" -ForegroundColor Cyan
Write-Host "🔗 Backend: https://hhh-1z4h.onrender.com" -ForegroundColor Cyan 