#!/usr/bin/env bash

# Package the frontend assets
cd frontend/
npm run build

# Build docker images
docker-compose build
