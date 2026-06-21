"""
ASGI application for Vercel deployment
This file exports the FastAPI app as an ASGI application
"""
import sys
from pathlib import Path

# Add backend to path
backend_path = Path(__file__).parent / 'backend'
sys.path.insert(0, str(backend_path))

from server import app

# Export for Vercel
__all__ = ['app']
