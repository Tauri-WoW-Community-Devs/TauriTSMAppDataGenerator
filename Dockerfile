FROM oven/bun:1.3.0-alpine AS builder

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

FROM oven/bun:1.3.0-alpine

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --production

COPY --from=builder /app/dist ./dist

CMD ["bun", "dist/index.js"]