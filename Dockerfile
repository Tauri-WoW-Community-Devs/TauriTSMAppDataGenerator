FROM oven/bun:1-alpine AS builder

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

FROM oven/bun:1-alpine

WORKDIR /app

RUN apk add --no-cache curl

COPY package.json bun.lock ./
RUN bun install --production

COPY --from=builder /app/dist ./dist

RUN chown -R bun:bun /app
USER bun

EXPOSE ${SERVER_PORT:-9876}

HEALTHCHECK --interval=1m --timeout=10s --start-period=30s --retries=3 \
  CMD curl -f "http://localhost:${SERVER_PORT:-9876}/health" || exit 1

CMD ["bun", "dist/index.js"]