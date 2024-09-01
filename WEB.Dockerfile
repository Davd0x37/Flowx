FROM node:lts-alpine AS base

# Install pnpm
RUN npm install -g pnpm

# Create new build step and mark it as the build stage
FROM base AS build

WORKDIR /app_build
RUN addgroup --system app && adduser --system -G app app
COPY . .
RUN chown -R app:app .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm build:web
RUN pnpm prune --prod

# Create new build step and mark it as the release stage
FROM build AS release

WORKDIR /app
COPY --from=build /app_build/apps/web/dist .