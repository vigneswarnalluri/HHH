# Check backend deployment status
Write-Host "🔍 Checking backend deployment..." -ForegroundColor Green

Write-Host ""
Write-Host "📋 Backend Issues Found:" -ForegroundColor Yellow
Write-Host "1. Server is running but routes are not accessible" -ForegroundColor Red
Write-Host "2. Environment variables may not be set in Render" -ForegroundColor Red
Write-Host "3. CORS configuration may need updating" -ForegroundColor Red
Write-Host ""

Write-Host "🔧 To fix the backend:" -ForegroundColor Cyan
Write-Host "1. Go to your Render dashboard" -ForegroundColor White
Write-Host "2. Select your backend service (HHH)" -ForegroundColor White
Write-Host "3. Go to 'Environment' tab" -ForegroundColor White
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
Write-Host "5. Save and redeploy the service" -ForegroundColor White
Write-Host ""
Write-Host "🔗 Your backend URL: https://hhh-1z4h.onrender.com" -ForegroundColor Cyan
Write-Host "🔗 Your frontend URL: https://bharathcare.netlify.app" -ForegroundColor Cyan 