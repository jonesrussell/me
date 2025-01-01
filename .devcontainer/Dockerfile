FROM mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm

# Install additional required packages
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    libnss3 \
    libnspr4 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libdbus-1-3 \
    libxkbcommon0 \
    libatspi2.0-0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libpango-1.0-0 \
    libcairo2 \
    libasound2 \
    libxcursor1 \
    libgtk-3-0 \
    libgdk-3.0-0 \
    fonts-noto-color-emoji \
    fonts-liberation \
    fonts-freefont-ttf \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

# Set up non-root user
USER node

# Install Playwright browser
RUN npx playwright install chromium \
    && npm cache clean --force

# Set up environment
ENV NODE_ENV=development \
    LANG=en_US.UTF-8 \
    LANGUAGE=en_US:en \
    LC_ALL=en_US.UTF-8 