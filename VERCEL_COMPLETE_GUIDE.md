# Complete Vercel Deployment Guide

This document provides comprehensive instructions for deploying your full-stack application to Vercel.

## Project Structure Overview

```
├── frontend/                 # React app (Create React App with Craco)
│   ├── src/                 # React source code
│   ├── public/              # Static assets
│   ├── package.json         # Frontend dependencies
│   ├── .env                 # Frontend environment variables
│   └── build/               # Production build (generated)
│
├── backend/                 # FastAPI application
│   ├── server.py           # FastAPI app
│   ├── requirements.txt     # Python dependencies
│   └── .env                # Backend environment variables
│
├── api/                    # Serverless API routes (optional)
├── vercel.json            # Vercel configuration
└── .vercelignore          # Files to exclude from deployment
```

## Prerequisites

1. **Vercel Account**: Sign up at https://vercel.com
2. **Git Repository**: Project must be in a Git repository (GitHub, GitLab, or Bitbucket)
3. **MongoDB Atlas**: Create a free cluster at https://www.mongodb.com/cloud/atlas
4. **Node.js**: Version 18+ installed locally
5. **Python**: Version 3.11 installed locally
6. **npm/yarn**: Latest version

## Step 1: Prepare Your MongoDB Database

### Create MongoDB Atlas Cluster:

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account or sign in
3. Create a new project
4. Create a free cluster
5. Create a database user:
   - Click "Database Access"
   - Add new database user
   - Use strong password
   - Choose "Read and write to any database"
6. Whitelist IP addresses:
   - Click "Network Access"
   - Add IP Address
   - **Important**: Use `0.0.0.0/0` to allow all IPs (for Vercel)
   - Or add specific Vercel IP ranges
7. Get connection string:
   - Click "Connect"
   - Choose "Drivers"
   - Copy connection string
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority`

## Step 2: Local Testing (Important!)

Before deploying to Vercel, test everything locally:

### Test Frontend:
```bash
cd frontend
npm install
npm start
```

### Test Backend (in another terminal):
```bash
cd backend
pip install -r requirements.txt
python run_dev_server.py
```

Or using uvicorn directly:
```bash
cd backend
uvicorn server:app --reload --host 0.0.0.0 --port 8000
```

### Update Environment Variables:

**backend/.env** (for local testing):
```
MONGO_URL=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database?retryWrites=true&w=majority
DB_NAME=your_database_name
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

**frontend/.env** (for local testing):
```
REACT_APP_API_URL=http://localhost:8000/api
WDS_SOCKET_PORT=443
ENABLE_HEALTH_CHECK=false
```

## Step 3: Test Production Build Locally

```bash
# Build frontend
cd frontend
npm run build

# The build/ directory should be created with no errors
```

## Step 4: Deploy to Vercel

### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Link project to Vercel
vercel link

# Deploy to staging
vercel

# Deploy to production
vercel --prod
```

### Option B: Using Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click "Add New..."
3. Select "Project"
4. Choose your Git repository
5. Configure project:
   - Framework: React
   - Build Command: `cd frontend && npm ci && npm run build`
   - Output Directory: `frontend/build`
   - Install Command: `npm ci`
6. Add environment variables (see Step 5)
7. Click "Deploy"

## Step 5: Set Environment Variables in Vercel

### In Vercel Dashboard:

1. Go to your project settings
2. Click "Environment Variables"
3. Add the following variables:

**For Production:**
```
MONGO_URL = mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
DB_NAME = production_database
CORS_ORIGINS = https://yourdomain.vercel.app,https://yourdomain.com
REACT_APP_API_URL = https://yourdomain.vercel.app/api
```

**For Preview (optional):**
```
MONGO_URL = [same as production or separate test DB]
DB_NAME = preview_database
CORS_ORIGINS = https://*.vercel.app
REACT_APP_API_URL = https://*.vercel.app/api
```

## Step 6: Custom Domain (Optional)

1. In Vercel dashboard, go to project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions
5. Update CORS_ORIGINS to include your custom domain

## Troubleshooting Deployment Issues

### Issue: Build Fails

**Solution:**
```bash
# Verify build works locally
cd frontend
npm ci  # Clean install
npm run build

# Check for errors in console output
# Fix any errors before re-deploying
```

### Issue: MongoDB Connection Errors

**Check these:**
1. MongoDB connection string format
2. Database name is correct
3. Username and password are URL-encoded if they contain special characters
4. IP whitelist includes `0.0.0.0/0`
5. Database user has proper permissions

**Test connection:**
```python
from motor.motor_asyncio import AsyncIOMotorClient

async def test_connection():
    client = AsyncIOMotorClient("your_connection_string")
    db = client["your_database"]
    # Should not raise any errors
```

### Issue: CORS Errors

**Solution:**
1. Check `CORS_ORIGINS` environment variable
2. Include your Vercel domain: `https://project-name.vercel.app`
3. Include any custom domains you're using
4. Format: comma-separated list without spaces

### Issue: 404 on Frontend

**Solution:**
1. Verify `vercel.json` routes configuration
2. Ensure `frontend/build/index.html` exists
3. Check that build command completes successfully

### Issue: API Returns 500 Error

**Check Vercel logs:**
```bash
vercel logs
```

Common causes:
1. Environment variables not set
2. MongoDB connection string incorrect
3. Database offline or credentials wrong
4. Python dependency missing

### Issue: Environment Variables Not Loading

**Verify:**
```bash
# In Vercel dashboard, check:
1. Variables are set for correct environment (Production/Preview)
2. Variable names are exactly correct
3. Values are not truncated
4. Deploy after adding/changing variables
```

## Monitoring After Deployment

### 1. Check Vercel Dashboard
- Monitor build and deployment status
- View function execution logs
- Check resource usage

### 2. Monitor MongoDB Atlas
- Connection count
- Query performance
- Storage usage

### 3. Test Live Application
```bash
# Test frontend
curl https://your-app.vercel.app

# Test API
curl https://your-app.vercel.app/api/

# Test with data
curl -X POST https://your-app.vercel.app/api/status \
  -H "Content-Type: application/json" \
  -d '{"client_name":"test"}'
```

### 4. Check Browser Console
- No CORS errors
- API responses correct
- No missing resources

## Performance Optimization Tips

### Frontend
1. Enable image optimization
2. Code splitting for large bundles
3. Remove unused dependencies
4. Use production builds

### Backend
1. Connection pooling for MongoDB
2. Proper indexing in database
3. Cache frequently accessed data
4. Monitor query performance

## Common Vercel Limitations

- **Maximum function size**: 50 MB uncompressed
- **Maximum execution time**: 60 seconds (60 seconds for paid tier)
- **Memory**: 3008 MB
- **Cold starts**: May experience delay on first request
- **Database connections**: MongoDB Atlas has connection pool limits

## Rollback Deployment

If something goes wrong:

```bash
# View deployment history
vercel ls

# Rollback to previous deployment
vercel rollback

# Or promote a previous deployment
vercel promote <deployment-url>
```

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Python Support](https://vercel.com/docs/concepts/functions/serverless-functions/runtimes/python)
- [MongoDB Atlas Documentation](https://docs.mongodb.com/atlas/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)

## Support

- Vercel Support: https://vercel.com/support
- MongoDB Support: https://www.mongodb.com/support
- Check VERCEL_DEPLOYMENT.md for more specific setup
- Check DEPLOYMENT_CHECKLIST.md before deployment

---

**Version**: 1.0
**Last Updated**: 2024
**Status**: Production Ready
