FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source files and tsconfig
COPY src ./src
COPY tsconfig.json ./

# Build the project
RUN yarn build

# Remove dev dependencies
RUN yarn install --production --ignore-scripts --prefer-offline

# Start the application
CMD ["node", "dist/index.js"]
