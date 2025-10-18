FROM oven/bun:1-alpine AS builder

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

FROM oven/bun:1-alpine

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --production

COPY --from=builder /app/dist ./dist

RUN chown -R bun:bun /app
USER bun

EXPOSE ${SERVER_PORT:-9876}

CMD ["bun", "dist/index.js"]