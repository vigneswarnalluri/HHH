# Deploy admin client count fix
Write-Host "Deploying admin client count fix..." -ForegroundColor Green

# Add all changes
git add .

# Commit the fix
git commit -m "Fix: Use supabaseAdmin client for donations health count to bypass RLS"

# Push to trigger deployment
git push origin main

Write-Host "Deployment triggered! Check Render dashboard for build status." -ForegroundColor Yellow
Write-Host "After deployment, test: https://hhh-1z4h.onrender.com/api/donations/health" -ForegroundColor Cyan 