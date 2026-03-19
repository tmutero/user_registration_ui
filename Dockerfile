FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app
COPY package.json package-lock.json ./

RUN npm ci --legacy-peer-deps
COPY . .

RUN npm run build

FROM node:20-alpine AS production

# Set working directory
WORKDIR /app

RUN apk add --no-cache dumb-init

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

COPY package.json package-lock.json ./

RUN npm ci --legacy-peer-deps && \
    npm cache clean --force

COPY --from=builder --chown=nodejs:nodejs /app/dist/user-registration-ui-web ./dist/user-registration-ui-web

USER nodejs
EXPOSE 4000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:4000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

ENTRYPOINT ["dumb-init", "--"]

# Start the SSR server
CMD ["node", "dist/user-registration-ui-web/server/server.mjs"]