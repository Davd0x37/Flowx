FROM node:21-alpine AS base

# Install pnpm
RUN npm install -g pnpm

# Create new build step and mark it as the build stage
FROM base AS build

WORKDIR /api_build
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm api:build
RUN pnpm prune --prod

# Create new build step and mark it as the release stage
FROM build AS release

WORKDIR /api
COPY --from=build /api_build .


WORKDIR /api/packages/api
# Run the application as a non-root user
USER node

EXPOSE 3000
CMD ["node", "./dist/index.js"]