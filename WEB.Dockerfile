FROM node:21-alpine AS base

# Install pnpm
RUN npm install -g pnpm

# Create new build step and mark it as the build stage
FROM base AS build

WORKDIR /app_build
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm web:build
RUN pnpm prune --prod

# Create new build step and mark it as the release stage
FROM build AS release

WORKDIR /app
COPY --from=build /app_build/packages/web/dist .

# Run the application as a non-root user
USER node
