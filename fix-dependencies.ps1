# PowerShell script to fix dependency issues
Write-Host "🔧 Fixing dependency issues..." -ForegroundColor Green

# Navigate to client directory
cd client

# Remove node_modules and package-lock.json
Write-Host "🧹 Cleaning old dependencies..." -ForegroundColor Yellow
if (Test-Path "node_modules") { Remove-Item -Recurse -Force "node_modules" }
if (Test-Path "package-lock.json") { Remove-Item "package-lock.json" }

# Install dependencies
Write-Host "📦 Installing updated dependencies..." -ForegroundColor Yellow
npm install

# Test build
Write-Host "🔨 Testing build..." -ForegroundColor Yellow
npm run build

Write-Host "✅ Dependencies updated and build tested!" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Ready to deploy to Netlify!" -ForegroundColor Yellow 