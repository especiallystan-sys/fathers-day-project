#!/bin/bash

# Vercel Deployment Build Script

echo "Building Frontend..."
cd frontend
npm ci
npm run build

if [ $? -ne 0 ]; then
  echo "Frontend build failed!"
  exit 1
fi

echo "Frontend build completed successfully!"
cd ..

echo "Checking Python dependencies..."
pip install -r backend/requirements.txt

echo "Build process completed!"
