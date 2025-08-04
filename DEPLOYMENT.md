# Deployment Guide for Netlify

This guide will help you deploy your volunteer management application to Netlify.

## Prerequisites

1. **GitHub Account**: Your code should be in a GitHub repository
2. **Netlify Account**: Sign up at [netlify.com](https://netlify.com)
3. **Backend Deployment**: You'll need to deploy your backend separately (see Backend Deployment section)

## Frontend Deployment (Netlify)

### Step 1: Prepare Your Repository

1. Make sure your code is pushed to GitHub
2. Ensure the `netlify.toml` file is in your root directory (already created)

### Step 2: Deploy to Netlify

#### Option A: Deploy via Netlify UI (Recommended)

1. Go to [netlify.com](https://netlify.com) and sign in
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub account and select your repository
4. Configure the build settings:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
5. Click "Deploy site"

#### Option B: Deploy via Netlify CLI

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Deploy:
   ```bash
   cd client
   netlify deploy --prod --dir=build
   ```

### Step 3: Configure Environment Variables

In your Netlify dashboard, go to Site settings → Environment variables and add:

```
REACT_APP_API_URL=https://your-backend-url.com
```

Replace `your-backend-url.com` with your actual backend URL.

## Backend Deployment

Since Netlify doesn't support Node.js servers, you'll need to deploy your backend separately. Here are some options:

### Option 1: Render (Recommended)

1. Go to [render.com](https://render.com) and sign up
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: volunteer-management-backend
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node

5. Add environment variables in Render dashboard:
   ```
   NODE_ENV=production
   PORT=10000
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   JWT_SECRET=your_jwt_secret
   ```

### Option 2: Railway

1. Go to [railway.app](https://railway.app) and sign up
2. Create a new project from GitHub
3. Set the root directory to `server`
4. Add environment variables as above

### Option 3: Heroku

1. Create a `Procfile` in the server directory:
   ```
   web: npm start
   ```

2. Deploy using Heroku CLI or GitHub integration

## Environment Variables Setup

### Frontend (Netlify)

Add these environment variables in Netlify dashboard:

```
REACT_APP_API_URL=https://your-backend-url.com
```

### Backend (Render/Railway/Heroku)

Add these environment variables in your backend deployment platform:

```
NODE_ENV=production
PORT=10000
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
JWT_SECRET=your_jwt_secret
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
AWS_S3_BUCKET=your_s3_bucket_name
```

## Post-Deployment Steps

1. **Test the Application**: Visit your Netlify URL and test all features
2. **Update CORS Settings**: Ensure your backend allows requests from your Netlify domain
3. **Set up Custom Domain** (Optional): Configure a custom domain in Netlify
4. **Enable HTTPS**: Netlify provides free SSL certificates

## Troubleshooting

### Common Issues

1. **Build Failures**: Check the build logs in Netlify dashboard
2. **API Connection Issues**: Verify environment variables are set correctly
3. **CORS Errors**: Update backend CORS settings to include your Netlify domain
4. **Environment Variables**: Ensure all required variables are set in both frontend and backend

### Debugging

1. Check Netlify build logs for frontend issues
2. Check your backend deployment logs for server issues
3. Use browser developer tools to check for API call errors
4. Verify environment variables are being loaded correctly

## Security Considerations

1. **Environment Variables**: Never commit sensitive data to your repository
2. **CORS**: Configure CORS properly to prevent unauthorized access
3. **HTTPS**: Always use HTTPS in production
4. **Rate Limiting**: Ensure your backend has proper rate limiting

## Monitoring

1. **Netlify Analytics**: Enable analytics in Netlify dashboard
2. **Error Tracking**: Consider adding error tracking services like Sentry
3. **Performance**: Monitor your application performance regularly

## Updates and Maintenance

1. **Automatic Deployments**: Netlify will automatically deploy when you push to your main branch
2. **Manual Deployments**: You can trigger manual deployments from the Netlify dashboard
3. **Rollbacks**: Netlify allows you to rollback to previous deployments if needed 