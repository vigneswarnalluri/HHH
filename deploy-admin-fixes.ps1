# Deploy admin component API fixes
Write-Host "🔧 Fixing admin components API connections..." -ForegroundColor Green

# Add all changes
git add .

# Commit the changes
git commit -m "Fix: Update admin components to use proper API base URL"

# Push to GitHub
git push origin main

Write-Host "✅ Admin component fixes pushed to GitHub!" -ForegroundColor Green
Write-Host ""
Write-Host "🎉 Your admin dashboard should now load data properly!" -ForegroundColor Yellow
Write-Host "📋 Check your Netlify dashboard for the new deployment." -ForegroundColor Yellow
Write-Host ""
Write-Host "🔗 Your app: https://bharathcare.netlify.app" -ForegroundColor Cyan
Write-Host "🔗 Backend: https://hhh-1z4h.onrender.com" -ForegroundColor Cyan 