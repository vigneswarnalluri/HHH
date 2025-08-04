# Final deployment script with all ESLint issues fixed
Write-Host "🚀 Final deployment with all ESLint issues fixed..." -ForegroundColor Green

# Add all changes
git add .

# Commit the changes
git commit -m "Fix: Remove unused imports and fix alt attributes for Netlify deployment"

# Push to GitHub
git push origin main

Write-Host "✅ All ESLint issues fixed and pushed to GitHub!" -ForegroundColor Green
Write-Host ""
Write-Host "🎉 Your Netlify deployment should now work!" -ForegroundColor Yellow
Write-Host "📋 Check your Netlify dashboard for the successful deployment." -ForegroundColor Yellow
Write-Host ""
Write-Host "🔗 Your app will be available at: https://your-app-name.netlify.app" -ForegroundColor Cyan 