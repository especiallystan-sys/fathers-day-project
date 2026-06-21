# Pre-Deployment Checklist

## Before Deploying to Vercel

### 1. Environment Configuration ✓
- [ ] Create MongoDB Atlas cluster
- [ ] Copy MongoDB connection string
- [ ] Note your database name
- [ ] Update CORS_ORIGINS with your domain

### 2. Local Testing
```bash
# Terminal 1: Frontend
cd frontend
npm start

# Terminal 2: Backend
cd backend
python -m pip install -r requirements.txt
uvicorn server:app --reload
```

- [ ] Frontend builds without errors
- [ ] Backend starts without errors
- [ ] API endpoints are accessible
- [ ] No console errors in browser
- [ ] Environment variables are loaded correctly

### 3. Production Build Test
```bash
cd frontend
npm run build
```
- [ ] Build completes successfully
- [ ] No warnings about missing dependencies
- [ ] build/ directory created with index.html

### 4. Code Quality
- [ ] No commented code
- [ ] All imports are used
- [ ] No console.log in production code
- [ ] No hardcoded URLs (use REACT_APP_API_URL)

### 5. Vercel Configuration
- [ ] vercel.json is correctly configured
- [ ] .vercelignore is in place
- [ ] Environment variables set in Vercel dashboard:
  - [ ] MONGO_URL
  - [ ] DB_NAME
  - [ ] CORS_ORIGINS
  - [ ] REACT_APP_API_URL

### 6. Database Setup
- [ ] MongoDB Atlas project created
- [ ] Whitelist Vercel IP ranges (0.0.0.0/0 or specific IPs)
- [ ] Database user created with proper permissions
- [ ] Connection string tested locally

### 7. Git & Repository
- [ ] All changes committed
- [ ] No sensitive data in .env files
- [ ] .gitignore properly configured
- [ ] Remote repository updated

### 8. Deployment Steps
```bash
# Login to Vercel
vercel login

# Deploy
vercel --prod

# Or link to existing project
vercel link
vercel --prod
```

### 9. Post-Deployment Verification
- [ ] Frontend loads without errors
- [ ] Check Vercel deployment logs
- [ ] Test API endpoints
- [ ] Verify CORS is working
- [ ] Check MongoDB connection
- [ ] Test all frontend features

### 10. Troubleshooting
If deployment fails, check:
- [ ] Vercel deployment logs
- [ ] Environment variables are set
- [ ] MongoDB connection string is correct
- [ ] CORS_ORIGINS includes your domain
- [ ] Node.js version compatibility
- [ ] Python version (3.11)
- [ ] All dependencies installed

## Deployment Commands Reference

```bash
# Initialize Vercel in project
vercel

# Deploy to staging
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs

# Set environment variables
vercel env add VARIABLE_NAME

# List all deployments
vercel ls

# Remove old deployments
vercel remove [deployment-url]
```

## Environment Variables to Set in Vercel

| Variable | Example | Required |
|----------|---------|----------|
| MONGO_URL | mongodb+srv://user:pass@cluster.mongodb.net/db?retryWrites=true&w=majority | Yes |
| DB_NAME | production_database | Yes |
| CORS_ORIGINS | https://yourdomain.vercel.app,https://yourdomain.com | Yes |
| REACT_APP_API_URL | https://yourdomain.vercel.app/api | Yes |

## Monitoring After Deployment

- Monitor Vercel dashboard for errors
- Check MongoDB Atlas for connection issues
- Review CORS errors in browser console
- Monitor API response times
- Check database query performance

---

For more help, visit:
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Python Support](https://vercel.com/docs/concepts/functions/serverless-functions/runtimes/python)
- [MongoDB Atlas Connection Guide](https://docs.mongodb.com/manual/reference/connection-string/)
