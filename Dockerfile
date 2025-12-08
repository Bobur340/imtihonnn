# Stage 1: build
FROM node:20-alpine AS builder
WORKDIR /app

# package files
COPY package*.json ./
RUN npm ci

# copy source code
COPY . .

# build project
RUN npm run build

# Stage 2: production
FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main.js"]
