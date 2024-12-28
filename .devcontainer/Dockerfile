FROM mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm as base

# Install common utilities and zsh
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    zsh \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

# Install Oh My Zsh
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended

# Install Docker CLI and Buildx
FROM base as docker
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    ca-certificates \
    curl \
    gnupg \
    && install -m 0755 -d /etc/apt/keyrings \
    && curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg \
    && chmod a+r /etc/apt/keyrings/docker.gpg \
    && echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
    $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
    tee /etc/apt/sources.list.d/docker.list > /dev/null \
    && apt-get update \
    && apt-get -y install --no-install-recommends \
    docker-ce-cli \
    docker-buildx-plugin \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

# Install GitHub CLI
FROM docker as github
RUN curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg \
    && chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
    && apt-get update \
    && apt-get -y install --no-install-recommends \
    gh \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

# Install Playwright dependencies and browsers
FROM github as playwright
RUN npx playwright install-deps \
    && npx playwright install chromium

# Install latest npm
RUN npm install -g npm@11.0.0

# Install act for GitHub Actions local testing
FROM playwright as act
RUN curl https://raw.githubusercontent.com/nektos/act/master/install.sh | bash

# Final stage
FROM act as final

# Set up shell history
RUN git clone https://github.com/stuartleeks/shell-history.git /tmp/shell-history \
    && cd /tmp/shell-history \
    && ./install.sh \
    && rm -rf /tmp/shell-history

# Set default shell to zsh
RUN chsh -s $(which zsh)

# Create workspace directory
WORKDIR /workspaces/me

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Set up environment
ENV NODE_ENV=development 