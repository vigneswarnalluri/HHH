# Force Render redeploy
Write-Host "Forcing Render redeploy..." -ForegroundColor Green

# Add a timestamp to force redeploy
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$deployFile = "render-deploy-timestamp.txt"
$timestamp | Out-File -FilePath $deployFile -Encoding UTF8

# Add and commit
git add $deployFile
git commit -m "Force Render redeploy - $timestamp"

# Push to trigger redeploy
git push origin main

Write-Host "Render redeploy triggered!" -ForegroundColor Green
Write-Host ""
Write-Host "Check Render dashboard for deployment status." -ForegroundColor Yellow
Write-Host "Wait 3-5 minutes for complete redeploy." -ForegroundColor Yellow 