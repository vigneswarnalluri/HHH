# Force a new deployment
Write-Host "Forcing a new deployment..." -ForegroundColor Green

# Add a small change to trigger deployment
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$deployFile = "deploy-timestamp.txt"
$timestamp | Out-File -FilePath $deployFile -Encoding UTF8

# Add and commit the change
git add $deployFile
git commit -m "Force deployment - $timestamp"

# Push to trigger new deployment
git push origin main

Write-Host "New deployment triggered!" -ForegroundColor Green
Write-Host ""
Write-Host "Check your Netlify dashboard for the new deployment." -ForegroundColor Yellow
Write-Host "Wait 2-3 minutes for the deployment to complete." -ForegroundColor Yellow
Write-Host ""
Write-Host "Your app: https://bharathcare.netlify.app" -ForegroundColor Cyan
Write-Host "Backend: https://hhh-1z4h.onrender.com" -ForegroundColor Cyan 