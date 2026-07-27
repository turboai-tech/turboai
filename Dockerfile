# syntax=docker/dockerfile:1

# Next.js production image for Alibaba Cloud (ACR / ACK / SAE / ECS)
# Build:
#   docker build \
#     --build-arg NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co \
#     --build-arg NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_... \
#     -t turboai:latest .
# Run:
#   docker run -p 3000:3000 \
#     -e NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co \
#     -e NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_... \
#     turboai:latest

FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable && corepack prepare pnpm@10.12.1 --activate

FROM base AS deps
ARG PNPM_REGISTRY=https://registry.npmmirror.com
RUN pnpm config set registry "$PNPM_REGISTRY"
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
ARG PNPM_REGISTRY=https://registry.npmmirror.com
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=$NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NODE_ENV=production
RUN pnpm config set registry "$PNPM_REGISTRY"
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
