#!/bin/bash

# Fix deployment issues script
echo "🔧 Fixing deployment issues..."

# Add all changes
git add .

# Commit the changes
git commit -m "Fix: Remove unused variables and package-lock.json for Netlify deployment"

# Push to GitHub
git push origin main

echo "✅ Changes pushed to GitHub!"
echo ""
echo "🚀 Your Netlify deployment should now work!"
echo "📋 Check your Netlify dashboard for the new deployment." 