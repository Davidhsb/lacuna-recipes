# BUILD
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx prisma generate

RUN npm run build

# PROD
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/generated/prisma ./generated/prisma

EXPOSE 3000
ENTRYPOINT ["node", "dist/main"]


