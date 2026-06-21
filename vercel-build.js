#!/usr/bin/env node

/**
 * Vercel Build Manifest
 * This file contains build configuration for Vercel
 */

const path = require('path');

module.exports = {
  version: 2,
  builds: [
    {
      src: 'package.json',
      use: '@vercel/static-build',
      config: {
        distDir: 'frontend/build',
      },
    },
  ],
  routes: [
    {
      src: '/(.*)',
      dest: 'frontend/build/$1',
    },
    {
      src: '/index.html',
      dest: 'frontend/build/index.html',
    },
  ],
};
