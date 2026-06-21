#!/bin/bash

# Vercel Deployment Script
# This script prepares the project for Vercel deployment

set -e

echo "🚀 Starting Vercel Deployment Preparation..."
echo "=============================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3 first."
    exit 1
fi

echo "✓ Node.js version: $(node --version)"
echo "✓ Python version: $(python3 --version)"
echo ""

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm ci
cd ..

# Check if Python virtual environment exists
if [ ! -d ".venv" ]; then
    echo "📦 Creating Python virtual environment..."
    python3 -m venv .venv
fi

echo "📦 Installing backend dependencies..."
source .venv/bin/activate 2>/dev/null || .\.venv\Scripts\activate 2>/dev/null || true
pip install -r backend/requirements.txt

# Run validation
echo ""
echo "🔍 Running deployment validation..."
python3 verify_deployment.py

echo ""
echo "✅ Deployment preparation complete!"
echo ""
echo "Next steps:"
echo "1. Set up environment variables in Vercel dashboard"
echo "2. Run: vercel --prod"
echo "3. Monitor deployment at: https://vercel.com"
echo ""
echo "For more information, see VERCEL_DEPLOYMENT.md"
