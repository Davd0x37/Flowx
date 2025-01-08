# --------------------------
# 1) Bootstrap stage
# --------------------------
FROM node:lts-alpine AS bootstrap
# Install pnpm
RUN npm install -g pnpm

# Change current directory
WORKDIR /app

# @FIXME: reduce number of package json files

# Copy only package.json and pnpm-lock.yaml to leverage Docker layer caching
COPY package.json pnpm*.yaml ./
# Create apps/packages directories
RUN mkdir -p apps/backend apps/frontend packages/api packages/i18n packages/utils
# Copy package.json and pnpm-lock.yaml to each directory
COPY apps/backend/package.json ./apps/backend/
COPY apps/frontend/package.json ./apps/frontend/
COPY packages/api/package.json ./packages/api/
COPY packages/i18n/package.json ./packages/i18n/
COPY packages/utils/package.json ./packages/utils/

# Install dependencies and cache them
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Copy the rest of the source code
COPY . .

# Change owner to node
# RUN chown -R node:node .

# Set user to node
# USER node

# --------------------------
# 2) BACKEND Build with node_modules
# --------------------------
FROM bootstrap AS builds_backend

# Turn off nx daemon
ENV NX_DAEMON=false

# Generate prisma
RUN pnpm backend:generate-types

# Run migrate and start server
CMD ["pnpm", "run", "backend:serve:migrate"]

# --------------------------
# 3) Frontend Build Builds Only
# --------------------------
FROM bootstrap AS builds_frontend

# Build Frontend
RUN pnpm frontend:build

# Copy builded files
COPY ./apps/frontend/dist/* /srv
