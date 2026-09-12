# ---- deps: install with bun ----
FROM oven/bun:1 AS deps
WORKDIR /app
COPY package.json ./
RUN bun install

# ---- build: types, client, lint, and static-site generation ----
FROM oven/bun:1 AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bunx qwik build

# ---- runtime: serve the pre-rendered HTML ----
FROM oven/bun:1 AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/dist ./dist
COPY --from=build /app/server-static ./server-static
EXPOSE 4173
CMD ["bun", "server-static/serve.ts"]