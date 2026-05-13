FROM oven/bun:1 AS build
WORKDIR /app

COPY package.json package-lock.json* bun.lock* bun.lockb* ./
RUN bun install --frozen-lockfile || bun install

COPY . .
RUN bun run build

FROM nginx:alpine-slim AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost/health || exit 1
CMD ["nginx", "-g", "daemon off;"]
