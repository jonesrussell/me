# Use the base image from the devcontainer.json
FROM mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm

# Update npm to the desired version
RUN npm install -g npm@latest

# Install Playwright dependencies
RUN npx playwright install --with-deps chromium firefox webkit

# Set environment variables
ENV NODE_ENV=development
