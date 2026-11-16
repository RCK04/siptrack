# syntax=docker/dockerfile:1

FROM oven/bun:1.3.5-alpine AS base
WORKDIR /app

FROM base AS dependencies
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM dependencies AS development
ENV NODE_ENV=development
EXPOSE 3000
CMD ["bun", "run", "dev"]

FROM base AS build
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
ARG BUN_PUBLIC_CLERK_PUBLISHABLE_KEY
ENV BUN_PUBLIC_CLERK_PUBLISHABLE_KEY=$BUN_PUBLIC_CLERK_PUBLISHABLE_KEY
RUN bun run build

FROM base AS production-dependencies
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

FROM base AS runtime
ENV NODE_ENV=production \
    PORT=3000

COPY --from=production-dependencies /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/bunfig.toml ./bunfig.toml
COPY --from=build /app/src ./src
COPY --from=build /app/dist ./dist
COPY --from=build /app/scripts/migrate.script.ts ./scripts/migrate.script.ts

USER bun
EXPOSE 3000

CMD ["bun", "run", "start"]
