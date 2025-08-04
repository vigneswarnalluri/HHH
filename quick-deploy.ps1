# Quick deployment script
Write-Host "🚀 Quick deployment..." -ForegroundColor Green

# Add all changes
git add .

# Commit the changes
git commit -m "Fix: Add .gitignore and clean up build files for Netlify deployment"

# Push to GitHub
git push origin main

Write-Host "✅ Changes pushed to GitHub!" -ForegroundColor Green
Write-Host ""
Write-Host "🎉 Your Netlify deployment should now work!" -ForegroundColor Yellow
Write-Host "📋 Check your Netlify dashboard for the successful deployment." -ForegroundColor Yellow 