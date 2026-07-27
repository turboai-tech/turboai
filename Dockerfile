# syntax=docker/dockerfile:1

# Prefer building on your laptop (fast), then ship the image tarball to ECS.
# Building on Aliyun ECS is often slow due to Hub / Alpine / CPU limits.
#
# Local build + upload:
#   docker build \
#     --build-arg NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co \
#     --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key \
#     -t turboai:latest .
#   docker save turboai:latest | gzip > turboai.tar.gz
#   scp turboai.tar.gz admin@ECS_IP:~/
#   # on ECS:
#   gunzip -c ~/turboai.tar.gz | sudo docker load
#   sudo docker run -d --name turboai --restart unless-stopped -p 3000:3000 turboai:latest
#
# If you must build on ECS, use a China base image + Alpine mirror:
#   sudo docker build \
#     --build-arg BASE_IMAGE=docker.m.daocloud.io/library/node:22-alpine \
#     --build-arg NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co \
#     --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key \
#     -t turboai:latest .

ARG BASE_IMAGE=node:22-alpine
FROM ${BASE_IMAGE} AS base
# Alpine packages via Aliyun mirror (much faster on China ECS)
RUN sed -i 's#https\?://dl-cdn.alpinelinux.org/alpine#https://mirrors.aliyun.com/alpine#g' /etc/apk/repositories \
  && apk add --no-cache libc6-compat
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
