#!/usr/bin/env python3
"""
Quick Start Guide for Vercel Deployment
Minimal steps needed to deploy successfully
"""

import subprocess
import sys
import os

def print_header(text):
    print("\n" + "="*60)
    print(f"  {text}")
    print("="*60)

def print_step(num, text):
    print(f"\n📍 Step {num}: {text}")

def run_command(cmd, description=""):
    """Run a shell command and return success status"""
    try:
        if description:
            print(f"  Running: {description}")
        result = subprocess.run(cmd, shell=True, check=False)
        return result.returncode == 0
    except Exception as e:
        print(f"  ❌ Error: {e}")
        return False

def main():
    print_header("VERCEL DEPLOYMENT QUICK START")
    
    print("\n✅ Pre-requisites:")
    print("   - Node.js 18+ installed")
    print("   - Python 3.11 installed")
    print("   - Git repository initialized")
    print("   - Vercel account created")
    print("   - MongoDB Atlas cluster ready")
    
    print_step(1, "Prepare MongoDB Atlas")
    print("""
   1. Go to: https://www.mongodb.com/cloud/atlas
   2. Create cluster or use existing one
   3. Create database user
   4. Whitelist IP: 0.0.0.0/0
   5. Copy connection string
   6. Format: mongodb+srv://user:pass@cluster.mongodb.net/db?retryWrites=true&w=majority
    """)
    
    print_step(2, "Test Locally")
    print("""
   Terminal 1 - Frontend:
   $ cd frontend
   $ npm install
   $ npm start
   
   Terminal 2 - Backend:
   $ cd backend
   $ pip install -r requirements.txt
   $ python -c "from motor.motor_asyncio import AsyncIOMotorClient; print('Motor installed')"
   $ uvicorn server:app --reload
   
   Terminal 3 - Test:
   $ curl http://localhost:8000/api/
   $ # Should return: {"message": "Hello World"}
    """)
    
    print_step(3, "Prepare Frontend .env")
    print("""
   File: frontend/.env
   
   REACT_APP_API_URL=http://localhost:8000/api
   WDS_SOCKET_PORT=443
   ENABLE_HEALTH_CHECK=false
   REACT_APP_ENV=development
    """)
    
    print_step(4, "Prepare Backend .env")
    print("""
   File: backend/.env (development)
   
   MONGO_URL=mongodb+srv://user:password@cluster.mongodb.net/db?retryWrites=true&w=majority
   DB_NAME=development_database
   CORS_ORIGINS=http://localhost:3000,http://localhost:5173
    """)
    
    print_step(5, "Test Production Build")
    print("""
   $ cd frontend
   $ npm run build
   
   ✅ Should complete without errors
   ✅ Should create 'build' directory
    """)
    
    print_step(6, "Deploy to Vercel")
    print("""
   # Install Vercel CLI
   $ npm install -g vercel
   
   # Login to Vercel
   $ vercel login
   
   # Link to Vercel project
   $ vercel link
   
   # Deploy to production
   $ vercel --prod
    """)
    
    print_step(7, "Configure Vercel Environment Variables")
    print("""
   1. Go to: https://vercel.com/dashboard
   2. Select your project
   3. Go to Settings → Environment Variables
   4. Add these variables:
   
   PRODUCTION Environment:
   - MONGO_URL = <your_mongodb_atlas_connection_string>
   - DB_NAME = production_database
   - CORS_ORIGINS = https://yourdomain.vercel.app
   - REACT_APP_API_URL = https://yourdomain.vercel.app/api
   
   PREVIEW Environment (Optional):
   - Use same or separate test database
    """)
    
    print_step(8, "Verify Deployment")
    print("""
   1. Wait for deployment to complete
   2. Check: https://yourdomain.vercel.app
   3. Check browser console for errors
   4. Test API: curl https://yourdomain.vercel.app/api/
   5. Monitor Vercel dashboard for logs
   6. Check MongoDB Atlas connection count
    """)
    
    print_header("COMMON ISSUES & FIXES")
    
    issues = [
        {
            "issue": "Build fails",
            "fix": "Run 'npm run build' locally, fix errors, then deploy"
        },
        {
            "issue": "MongoDB connection error",
            "fix": "Check connection string, whitelist IP (0.0.0.0/0), verify credentials"
        },
        {
            "issue": "CORS error on frontend",
            "fix": "Add your domain to CORS_ORIGINS env var: https://yourdomain.vercel.app"
        },
        {
            "issue": "API returns 500",
            "fix": "Check Vercel logs: 'vercel logs', verify env vars set, check MongoDB"
        },
        {
            "issue": "Cannot find module error",
            "fix": "Run 'npm ci' locally, ensure all dependencies in package.json"
        },
    ]
    
    for i, issue_info in enumerate(issues, 1):
        print(f"\n❌ {i}. {issue_info['issue']}")
        print(f"   ✅ {issue_info['fix']}")
    
    print_header("VERIFICATION CHECKLIST")
    
    checklist = [
        "MongoDB Atlas cluster created and accessible",
        "Database user created with correct permissions",
        "IP whitelist set to 0.0.0.0/0 in MongoDB Atlas",
        "Frontend builds without errors locally",
        "Backend starts without errors locally",
        "API endpoint responds correctly",
        "Environment variables defined in .env files (for local testing)",
        "vercel.json configured correctly",
        ".vercelignore configured correctly",
        "Git repository is clean and up to date",
        "All files committed to Git",
        "Vercel project created and linked",
        "Environment variables added to Vercel dashboard",
    ]
    
    for i, item in enumerate(checklist, 1):
        print(f"   ☐ {item}")
    
    print_header("USEFUL COMMANDS")
    
    commands = [
        ("Verify deployment", "python verify_deployment.py"),
        ("Start dev server", "python run_dev_server.py"),
        ("Build frontend", "cd frontend && npm run build"),
        ("Install dependencies", "npm install && pip install -r backend/requirements.txt"),
        ("Check Vercel logs", "vercel logs"),
        ("View deployments", "vercel ls"),
        ("Rollback", "vercel rollback"),
        ("Local testing", "npm start (frontend) + uvicorn server:app --reload (backend)"),
    ]
    
    for desc, cmd in commands:
        print(f"   $ {cmd}")
        print(f"     ↳ {desc}\n")
    
    print_header("DOCUMENTATION FILES")
    
    print("""
   📖 VERCEL_CONFIG_SUMMARY.md
      Quick overview of all changes made
   
   📖 VERCEL_COMPLETE_GUIDE.md
      Comprehensive deployment guide with troubleshooting
   
   📖 VERCEL_DEPLOYMENT.md
      Detailed deployment steps and setup
   
   📖 DEPLOYMENT_CHECKLIST.md
      Pre-deployment checklist
   
   📖 verify_deployment.py
      Automated verification script
   
   📖 QUICK_START.md
      This file - minimal steps to deploy
    """)
    
    print_header("NEXT STEPS")
    
    print("""
   1. ✅ Read this entire guide
   2. ✅ Prepare MongoDB Atlas
   3. ✅ Test locally with both frontend and backend
   4. ✅ Test production build locally
   5. ✅ Follow Step 6-8 to deploy
   6. ✅ Monitor deployment and test live app
   
   Questions? Check VERCEL_COMPLETE_GUIDE.md for detailed information.
    """)
    
    print_header("STATUS")
    print("\n✅ Your project is configured and ready for Vercel deployment!\n")

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️  Interrupted by user")
        sys.exit(1)
