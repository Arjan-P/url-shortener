FROM node:22-alpine AS builder

RUN apk add --no-cache openssl

WORKDIR /app

COPY api/package*.json ./
RUN npm ci

COPY tsconfig.json /tsconfig.json
COPY api/tsconfig.json ./tsconfig.json

COPY api/prisma ./prisma
COPY api/src ./src

RUN npx prisma generate
RUN npm run build


FROM node:22-alpine

RUN apk add --no-cache openssl

WORKDIR /app

COPY api/package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

EXPOSE 5000

CMD ["node", "--import=./dist/instrumentation.js", "./dist/start.js"]
