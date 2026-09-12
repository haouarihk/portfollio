# ---- deps: install with bun ----
FROM oven/bun:1 AS deps
WORKDIR /app
COPY package.json ./
RUN bun install

# ---- build: types, client, lint, and SSR preview bundle ----
FROM oven/bun:1 AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bunx qwik build preview

# ---- runtime: serve the built app ----
FROM oven/bun:1 AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app ./
EXPOSE 4173
CMD ["bunx", "vite", "preview", "--host", "0.0.0.0", "--port", "4173"]