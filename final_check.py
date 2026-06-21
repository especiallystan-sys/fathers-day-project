#!/usr/bin/env python3
"""
Vercel Deployment - Final Pre-Deployment Check
Run this immediately before deploying to Vercel
"""

import os
import json
import subprocess
from pathlib import Path
from typing import List, Tuple

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    END = '\033[0m'
    BOLD = '\033[1m'

def check_file_exists(filepath: str, description: str) -> Tuple[bool, str]:
    """Check if a file exists"""
    exists = Path(filepath).exists()
    status = f"{Colors.GREEN}✓{Colors.END}" if exists else f"{Colors.RED}✗{Colors.END}"
    return exists, f"{status} {description}: {filepath}"

def check_env_variables(env_file: str) -> Tuple[bool, List[str]]:
    """Check environment file content"""
    try:
        if not Path(env_file).exists():
            return False, [f"{Colors.RED}✗{Colors.END} {env_file} not found"]
        
        with open(env_file, 'r') as f:
            content = f.read()
        
        lines = [line.strip() for line in content.split('\n') if line.strip() and not line.startswith('#')]
        results = [f"{Colors.GREEN}✓{Colors.END} {env_file} contains {len(lines)} variables"]
        return True, results
    except Exception as e:
        return False, [f"{Colors.RED}✗{Colors.END} Error reading {env_file}: {str(e)}"]

def check_build_can_run() -> Tuple[bool, str]:
    """Check if frontend build would work"""
    try:
        result = subprocess.run(
            "cd frontend && npm list react react-dom 2>/dev/null | head -3",
            shell=True,
            capture_output=True,
            text=True
        )
        
        if result.returncode == 0:
            return True, f"{Colors.GREEN}✓{Colors.END} React dependencies found"
        else:
            return False, f"{Colors.RED}✗{Colors.END} Issue with React dependencies"
    except:
        return False, f"{Colors.YELLOW}⚠{Colors.END} Could not verify build dependencies"

def main():
    print(f"\n{Colors.BOLD}{Colors.BLUE}{'='*70}{Colors.END}")
    print(f"{Colors.BOLD}{Colors.BLUE}VERCEL DEPLOYMENT - FINAL PRE-DEPLOYMENT CHECK{Colors.END}")
    print(f"{Colors.BOLD}{Colors.BLUE}{'='*70}{Colors.END}\n")
    
    all_good = True
    
    # Check 1: Required Configuration Files
    print(f"{Colors.BOLD}1️⃣  Configuration Files{Colors.END}")
    print("-" * 70)
    
    config_files = [
        ('vercel.json', 'Vercel configuration'),
        ('.vercelignore', 'Vercel ignore file'),
        ('runtime.txt', 'Python runtime version'),
        ('VERCEL_COMPLETE_GUIDE.md', 'Deployment guide'),
        ('DEPLOYMENT_CHECKLIST.md', 'Pre-deployment checklist'),
    ]
    
    for filepath, desc in config_files:
        exists, msg = check_file_exists(filepath, desc)
        print(f"   {msg}")
        all_good = all_good and exists
    
    # Check 2: Environment Files
    print(f"\n{Colors.BOLD}2️⃣  Environment Configuration{Colors.END}")
    print("-" * 70)
    
    env_files = [
        ('backend/.env.example', 'Backend env template'),
        ('frontend/.env.example', 'Frontend env template'),
    ]
    
    for filepath, desc in env_files:
        exists, msg = check_file_exists(filepath, desc)
        print(f"   {msg}")
        all_good = all_good and exists
    
    # Check 3: Code Files
    print(f"\n{Colors.BOLD}3️⃣  Backend Files{Colors.END}")
    print("-" * 70)
    
    backend_files = [
        ('backend/server.py', 'FastAPI server'),
        ('backend/requirements.txt', 'Python dependencies'),
        ('wsgi.py', 'ASGI wrapper'),
        ('api/index.py', 'Serverless handler'),
    ]
    
    for filepath, desc in backend_files:
        exists, msg = check_file_exists(filepath, desc)
        print(f"   {msg}")
        all_good = all_good and exists
    
    # Check 4: Frontend Files
    print(f"\n{Colors.BOLD}4️⃣  Frontend Files{Colors.END}")
    print("-" * 70)
    
    frontend_files = [
        ('frontend/.env', 'Frontend environment'),
        ('frontend/package.json', 'Frontend dependencies'),
        ('frontend/src/config/api.js', 'API configuration'),
    ]
    
    for filepath, desc in frontend_files:
        exists, msg = check_file_exists(filepath, desc)
        print(f"   {msg}")
        all_good = all_good and exists
    
    # Check 5: Helper Scripts
    print(f"\n{Colors.BOLD}5️⃣  Helper Scripts{Colors.END}")
    print("-" * 70)
    
    scripts = [
        ('verify_deployment.py', 'Deployment verification'),
        ('run_dev_server.py', 'Development server'),
        ('prepare-deployment.sh', 'Deployment prep (Linux/Mac)'),
        ('prepare-deployment.bat', 'Deployment prep (Windows)'),
    ]
    
    for filepath, desc in scripts:
        exists, msg = check_file_exists(filepath, desc)
        print(f"   {msg}")
        all_good = all_good and exists
    
    # Check 6: Dependency Verification
    print(f"\n{Colors.BOLD}6️⃣  Dependencies{Colors.END}")
    print("-" * 70)
    
    can_build, build_msg = check_build_can_run()
    print(f"   {build_msg}")
    all_good = all_good and can_build
    
    # Check 7: Backend Code Updates
    print(f"\n{Colors.BOLD}7️⃣  Backend Updates (Code Quality){Colors.END}")
    print("-" * 70)
    
    backend_checks = [
        ('backend/server.py', 'CORS_ORIGINS', 'Proper CORS parsing'),
        ('backend/server.py', 'os.environ.get', 'Safe environment variable loading'),
        ('backend/server.py', 'app_instance', 'App exported for Vercel'),
    ]
    
    for filepath, keyword, desc in backend_checks:
        try:
            with open(filepath, 'r') as f:
                content = f.read()
                found = keyword in content
                status = f"{Colors.GREEN}✓{Colors.END}" if found else f"{Colors.YELLOW}⚠{Colors.END}"
                print(f"   {status} {desc}")
                all_good = all_good and found
        except:
            print(f"   {Colors.RED}✗{Colors.END} Could not verify {desc}")
            all_good = False
    
    # Check 8: Frontend Configuration
    print(f"\n{Colors.BOLD}8️⃣  Frontend Configuration{Colors.END}")
    print("-" * 70)
    
    try:
        with open('frontend/src/config/api.js', 'r') as f:
            content = f.read()
            has_api_url = 'REACT_APP_API_URL' in content
            status = f"{Colors.GREEN}✓{Colors.END}" if has_api_url else f"{Colors.RED}✗{Colors.END}"
            print(f"   {status} API URL configuration system")
            all_good = all_good and has_api_url
    except:
        print(f"   {Colors.RED}✗{Colors.END} Could not verify API configuration")
        all_good = False
    
    # Summary
    print(f"\n{Colors.BOLD}{Colors.BLUE}{'='*70}{Colors.END}")
    
    if all_good:
        print(f"{Colors.BOLD}{Colors.GREEN}✅ ALL CHECKS PASSED - READY FOR DEPLOYMENT!{Colors.END}\n")
        
        print(f"{Colors.BOLD}Next Steps:{Colors.END}")
        print(f"""
   1. Read QUICK_START.md for deployment instructions
   2. Prepare MongoDB Atlas cluster
   3. Test locally:
      • cd frontend && npm start
      • python run_dev_server.py
   4. Test production build:
      • cd frontend && npm run build
   5. Deploy:
      • vercel --prod
   6. Monitor deployment and test live app
        """)
        
        return 0
    else:
        print(f"{Colors.BOLD}{Colors.RED}⚠️  SOME CHECKS FAILED{Colors.END}\n")
        print(f"{Colors.BOLD}Please fix the issues above before deploying.{Colors.END}")
        print(f"See DEPLOYMENT_CHECKLIST.md for detailed instructions.\n")
        
        return 1

if __name__ == '__main__':
    import sys
    sys.exit(main())
