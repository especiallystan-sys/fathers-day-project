"""
Vercel API route for status checks
"""
from backend.server import app
from fastapi import Request

async def handler(request: Request):
    """
    Handle API requests through Vercel serverless functions
    """
    # The request will be routed by Vercel based on the file structure
    return await app(request)
