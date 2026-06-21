"""
Vercel serverless function handler
Place this in api/index.py for Vercel serverless functions
"""
import sys
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.requests import Request
from starlette.responses import Response
import os

# Setup path for imports
backend_path = Path(__file__).parent.parent / 'backend'
sys.path.insert(0, str(backend_path))

# Import the FastAPI app
from server import app as fastapi_app

# Vercel serverless handler
async def handler(request: Request) -> Response:
    """Handle requests for Vercel serverless functions"""
    return fastapi_app(scope=request.scope, receive=request.receive, send=request._send)
