# Deployment Checklist

## Pre-Deployment
- [ ] Code is pushed to GitHub repository
- [ ] All environment variables are documented
- [ ] Database (Supabase) is properly configured
- [ ] File upload functionality is tested locally

## Frontend Deployment (Netlify)
- [ ] Create Netlify account
- [ ] Connect GitHub repository to Netlify
- [ ] Configure build settings:
  - [ ] Base directory: `client`
  - [ ] Build command: `npm run build`
  - [ ] Publish directory: `build`
- [ ] Set environment variables:
  - [ ] `REACT_APP_API_URL` (will be set after backend deployment)
- [ ] Deploy and get Netlify URL

## Backend Deployment
Choose one platform:

### Render (Recommended)
- [ ] Create Render account
- [ ] Create new Web Service
- [ ] Connect GitHub repository
- [ ] Configure settings:
  - [ ] Root directory: `server`
  - [ ] Build command: `npm install`
  - [ ] Start command: `npm start`
- [ ] Set environment variables:
  - [ ] `NODE_ENV=production`
  - [ ] `PORT=10000`
  - [ ] `SUPABASE_URL`
  - [ ] `SUPABASE_ANON_KEY`
  - [ ] `JWT_SECRET`
  - [ ] `AWS_ACCESS_KEY_ID`
  - [ ] `AWS_SECRET_ACCESS_KEY`
  - [ ] `AWS_REGION`
  - [ ] `AWS_S3_BUCKET`
  - [ ] `CLIENT_URL` (your Netlify URL)
- [ ] Deploy and get backend URL

### Railway
- [ ] Create Railway account
- [ ] Create new project from GitHub
- [ ] Set root directory to `server`
- [ ] Set environment variables (same as above)
- [ ] Deploy and get backend URL

### Heroku
- [ ] Create Heroku account
- [ ] Install Heroku CLI
- [ ] Create new Heroku app
- [ ] Set environment variables (same as above)
- [ ] Deploy using Heroku CLI or GitHub integration

## Post-Deployment Configuration
- [ ] Update `REACT_APP_API_URL` in Netlify with backend URL
- [ ] Test all features on deployed site:
  - [ ] User registration
  - [ ] User login
  - [ ] Volunteer profile creation
  - [ ] Survey submission
  - [ ] Admin dashboard
  - [ ] File uploads
- [ ] Test on different devices/browsers
- [ ] Check mobile responsiveness

## Security & Performance
- [ ] Enable HTTPS (automatic with Netlify)
- [ ] Set up custom domain (optional)
- [ ] Configure CORS properly
- [ ] Test rate limiting
- [ ] Verify file upload security

## Monitoring & Maintenance
- [ ] Set up error tracking (optional)
- [ ] Enable Netlify analytics
- [ ] Test automatic deployments
- [ ] Document deployment process

## Troubleshooting
If deployment fails:
- [ ] Check build logs
- [ ] Verify environment variables
- [ ] Test locally with production settings
- [ ] Check CORS configuration
- [ ] Verify database connections

## Success Criteria
- [ ] Frontend loads without errors
- [ ] Backend API responds correctly
- [ ] Database operations work
- [ ] File uploads function properly
- [ ] Authentication works
- [ ] All features are accessible 