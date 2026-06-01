FROM node:22-alpine AS builder

WORKDIR /app

COPY api/package*.json ./
RUN npm ci

COPY tsconfig.json /tsconfig.json
COPY api/tsconfig.json ./tsconfig.json

COPY api/src ./src

RUN npm run build


FROM node:22-alpine

WORKDIR /app

COPY api/package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

EXPOSE 5000

CMD ["node", "--import=./dist/instrumentation.js", "./dist/start.js"]
