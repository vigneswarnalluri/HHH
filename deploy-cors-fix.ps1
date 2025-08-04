# Deploy CORS fix to backend
Write-Host "Fixing CORS configuration..." -ForegroundColor Green

# Add the server changes
git add server/index.js

# Commit the changes
git commit -m "Fix: Update CORS to allow Netlify preview URLs"

# Push to GitHub
git push origin main

Write-Host "CORS fix deployed to GitHub!" -ForegroundColor Green
Write-Host ""
Write-Host "The backend will automatically redeploy on Render." -ForegroundColor Yellow
Write-Host "Wait 2-3 minutes for the backend to update." -ForegroundColor Yellow
Write-Host ""
Write-Host "Your app should work after the backend redeploys!" -ForegroundColor Cyan 