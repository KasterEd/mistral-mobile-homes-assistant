# Build stage
FROM node:20-alpine AS build

WORKDIR /app

COPY frontend/package*.json ./
RUN npm ci

COPY frontend ./
RUN npm run build-only

# Serve stage
FROM nginx:1.27-alpine

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

# Custom Nginx config for SPA + API proxy
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
