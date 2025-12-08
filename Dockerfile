# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# package files
COPY package*.json ./
RUN npm ci

# copy source code
COPY . .

# build project
RUN npm run build

# Stage 2: Production
FROM node:20-alpine
WORKDIR /app

# Only production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy build output from builder
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main.js"]
