# Use the base image from the devcontainer.json
FROM mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm

# Install Playwright dependencies
RUN sudo npx playwright install-deps

# Update npm to the desired version
RUN npm install -g npm@latest

# Set environment variables
ENV NODE_ENV=development
