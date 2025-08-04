# Setup environment variables for deployment
Write-Host "🔧 Setting up environment variables..." -ForegroundColor Green

Write-Host ""
Write-Host "📋 Frontend Environment Variables (Netlify):" -ForegroundColor Yellow
Write-Host "1. Go to your Netlify dashboard" -ForegroundColor White
Write-Host "2. Select your site (bharathcare)" -ForegroundColor White
Write-Host "3. Go to Site settings → Environment variables" -ForegroundColor White
Write-Host "4. Add this environment variable:" -ForegroundColor White
Write-Host ""
Write-Host "   REACT_APP_API_URL=https://hhh-1z4h.onrender.com" -ForegroundColor Green
Write-Host ""
Write-Host "5. Save and redeploy" -ForegroundColor White
Write-Host ""

Write-Host "📋 Backend Environment Variables (Render):" -ForegroundColor Yellow
Write-Host "1. Go to your Render dashboard" -ForegroundColor White
Write-Host "2. Select your backend service (HHH)" -ForegroundColor White
Write-Host "3. Go to Environment tab" -ForegroundColor White
Write-Host "4. Add these environment variables:" -ForegroundColor White
Write-Host ""
Write-Host "   NODE_ENV=production" -ForegroundColor Green
Write-Host "   PORT=10000" -ForegroundColor Green
Write-Host "   SUPABASE_URL=https://wkpxjqadtqfpmwewovpn.supabase.co" -ForegroundColor Green
Write-Host "   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrcHhqcWFkdHFmcG13ZXdvdnBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4OTQ5ODMsImV4cCI6MjA2OTQ3MDk4M30.OCO4ZOLzxjWCV0g5l7LcCF-kfrTyNMEcCzvXdbzVu4Q" -ForegroundColor Green
Write-Host "   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrcHhqcWFkdHFmcG13ZXdvdnBuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Mzg5NDk4MywiZXhwIjoyMDY5NDcwOTgzfQ.8Tpoe4ZMBZ2_9k8WiWr4gOkgErEQK7rugbUmcejObxI" -ForegroundColor Green
Write-Host "   JWT_SECRET=UPU+Pt+/rfKFpsBTfo1bHWrSOHJKANARkT5NZx0RifA2/SdE3Zve3Lq7XNxrlgOn+Z94CDiv12ZLE/oQ6Xgb0g==" -ForegroundColor Green
Write-Host "   CLIENT_URL=https://bharathcare.netlify.app" -ForegroundColor Green
Write-Host ""
Write-Host "5. Save and redeploy" -ForegroundColor White
Write-Host ""

Write-Host "🔗 URLs:" -ForegroundColor Cyan
Write-Host "Frontend: https://bharathcare.netlify.app" -ForegroundColor White
Write-Host "Backend: https://hhh-1z4h.onrender.com" -ForegroundColor White 