#!/usr/bin/env python3
"""
Deployment validation script
Run this before deploying to ensure everything is configured correctly
"""
import os
import sys
from pathlib import Path

def check_files_exist():
    """Check if all required files exist"""
    required_files = {
        'vercel.json': 'Vercel configuration',
        '.vercelignore': 'Vercel ignore file',
        'frontend/package.json': 'Frontend package',
        'frontend/.env.example': 'Frontend env example',
        'backend/.env.example': 'Backend env example',
        'backend/requirements.txt': 'Backend requirements',
        'backend/server.py': 'Backend server',
    }
    
    errors = []
    for file_path, desc in required_files.items():
        if not Path(file_path).exists():
            errors.append(f"❌ Missing {desc}: {file_path}")
        else:
            print(f"✓ Found {desc}: {file_path}")
    
    return errors

def check_env_variables():
    """Check if environment variables are set correctly"""
    print("\n--- Environment Variables Check ---")
    
    required_vars = {
        'backend': ['MONGO_URL', 'DB_NAME'],
        'frontend': ['REACT_APP_API_URL'],
    }
    
    warnings = []
    
    for env, vars_list in required_vars.items():
        print(f"\n{env.upper()} Environment:")
        for var in vars_list:
            value = os.environ.get(var)
            if not value:
                warnings.append(f"⚠ {var} not set (required for production)")
            else:
                print(f"  ✓ {var} is set")
    
    return warnings

def check_dependencies():
    """Check if dependencies are properly configured"""
    print("\n--- Dependencies Check ---")
    
    errors = []
    
    # Check frontend
    pkg_path = Path('frontend/package.json')
    if pkg_path.exists():
        print("✓ Frontend package.json exists")
    else:
        errors.append("❌ Frontend package.json missing")
    
    # Check backend
    req_path = Path('backend/requirements.txt')
    if req_path.exists():
        with open(req_path, 'r') as f:
            content = f.read()
            required_packages = ['fastapi', 'uvicorn', 'motor', 'pydantic']
            for pkg in required_packages:
                if pkg in content.lower():
                    print(f"✓ {pkg} found in requirements")
                else:
                    errors.append(f"❌ {pkg} not found in backend/requirements.txt")
    else:
        errors.append("❌ Backend requirements.txt missing")
    
    return errors

def main():
    print("=" * 50)
    print("Vercel Deployment Validation")
    print("=" * 50)
    
    all_errors = []
    all_warnings = []
    
    # Run checks
    print("\n--- Files Check ---")
    all_errors.extend(check_files_exist())
    all_warnings.extend(check_env_variables())
    all_errors.extend(check_dependencies())
    
    # Summary
    print("\n" + "=" * 50)
    print("SUMMARY")
    print("=" * 50)
    
    if all_errors:
        print(f"\n❌ Found {len(all_errors)} error(s):")
        for error in all_errors:
            print(f"  {error}")
        return 1
    
    if all_warnings:
        print(f"\n⚠ Found {len(all_warnings)} warning(s):")
        for warning in all_warnings:
            print(f"  {warning}")
    
    print("\n✓ All checks passed! Ready for deployment.")
    return 0

if __name__ == '__main__':
    sys.exit(main())
