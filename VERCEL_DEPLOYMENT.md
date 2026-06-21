"""
Vercel Deployment Guide

This project is a monorepo with:
- Frontend: React app (Create React App with Craco)
- Backend: FastAPI application

## Deployment Steps

### 1. Set up Vercel Project
```bash
npm i -g vercel
vercel
```

### 2. Configure Environment Variables in Vercel Dashboard
Set these in your Vercel project settings:

**Backend (Production) Variables:**
- `MONGO_URL`: Your MongoDB Atlas connection string (mongodb+srv://...)
- `DB_NAME`: Your database name
- `CORS_ORIGINS`: Comma-separated list of allowed origins
- `VERCEL`: Set to "1" (automatically set by Vercel)

**Frontend (Production) Variables:**
- `REACT_APP_API_URL`: Your API endpoint URL

### 3. Deployment Options

#### Option A: Frontend Only (Recommended)
Deploy only the frontend to Vercel and host backend elsewhere:
```bash
cd frontend
npm ci
npm run build
```

Then set `REACT_APP_API_URL` to your backend service URL.

#### Option B: Monorepo on Vercel
This configuration supports deploying both frontend and backend.
The frontend builds to `frontend/build` and is served as the main site.

### 4. Build Command
Frontend builds automatically. Backend is available as serverless functions.

### 5. Local Development
```bash
# Terminal 1: Frontend
cd frontend
npm start

# Terminal 2: Backend
cd backend
pip install -r requirements.txt
uvicorn server:app --reload
```

### 6. Production Build
```bash
cd frontend
npm run build
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB Atlas IP whitelist includes Vercel IP ranges (use 0.0.0.0/0 or specific Vercel IPs)
- Verify connection string format: `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority`

### CORS Errors
- Set `CORS_ORIGINS` environment variable correctly
- Include your Vercel domain: `https://your-app.vercel.app`

### Build Failures
- Check `npm run build` works locally first
- Ensure all dependencies in package.json are correct
- Check Node.js version compatibility

### API Not Working
- Verify `REACT_APP_API_URL` environment variable is set correctly
- Test API endpoint with curl or Postman
- Check backend logs in Vercel dashboard
"""
