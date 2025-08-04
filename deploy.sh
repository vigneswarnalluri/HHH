#!/bin/bash

# Deployment script for Volunteer Management System
# This script helps prepare and deploy the application

echo "🚀 Starting deployment process..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm run install-all

# Build the client
echo "🔨 Building client..."
cd client
npm run build
cd ..

# Check if build was successful
if [ ! -d "client/build" ]; then
    echo "❌ Error: Build failed. Please check the build logs."
    exit 1
fi

echo "✅ Build completed successfully!"

echo ""
echo "📋 Next steps:"
echo "1. Push your code to GitHub"
echo "2. Deploy frontend to Netlify:"
echo "   - Go to netlify.com"
echo "   - Import your GitHub repository"
echo "   - Set base directory to 'client'"
echo "   - Set build command to 'npm run build'"
echo "   - Set publish directory to 'build'"
echo ""
echo "3. Deploy backend to Render/Railway/Heroku:"
echo "   - Set root directory to 'server'"
echo "   - Set build command to 'npm install'"
echo "   - Set start command to 'npm start'"
echo ""
echo "4. Configure environment variables:"
echo "   - Frontend: REACT_APP_API_URL=https://your-backend-url.com"
echo "   - Backend: All variables from server/.env"
echo ""
echo "5. Update CORS settings in backend to include your Netlify domain"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions" 