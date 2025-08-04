# PowerShell script to commit and push deployment fixes
Write-Host "🔧 Committing deployment fixes..." -ForegroundColor Green

# Add all changes
git add .

# Commit the changes
git commit -m "Fix: Remove all unused variables and accessibility issues for Netlify deployment"

# Push to GitHub
git push origin main

Write-Host "✅ Changes pushed to GitHub!" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Your Netlify deployment should now work!" -ForegroundColor Yellow
Write-Host "📋 Check your Netlify dashboard for the new deployment." -ForegroundColor Yellow 