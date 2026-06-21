#!/usr/bin/env python3
"""
Development server script
Run this to start the FastAPI backend for local development
"""

import os
import sys
from pathlib import Path

# Add current directory to path
sys.path.insert(0, str(Path(__file__).parent))

if __name__ == '__main__':
    import uvicorn
    
    # Load environment variables
    os.environ.setdefault('MONGO_URL', 'mongodb://localhost:27017')
    os.environ.setdefault('DB_NAME', 'test_database')
    os.environ.setdefault('CORS_ORIGINS', '*')
    
    # Run the server
    uvicorn.run(
        'backend.server:app',
        host='0.0.0.0',
        port=8000,
        reload=True,
        log_level='info'
    )
