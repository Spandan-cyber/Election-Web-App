# ---- Stage 1: Build React frontend ----
FROM node:20-alpine AS frontend-build

WORKDIR /app

# Install frontend dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy all frontend source files
COPY . .

# Build the React app (output goes to /app/dist)
RUN npm run build

# ---- Stage 2: Production server ----
FROM node:20-alpine AS production

WORKDIR /app

# Copy server dependencies and install
COPY server/package.json server/package-lock.json* ./server/
RUN cd server && npm ci --omit=dev

# Copy server source
COPY server/ ./server/

# Copy built React frontend from stage 1
COPY --from=frontend-build /app/dist ./dist

# Cloud Run sets PORT env variable
ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

# Start the Express server (it serves both API and React app)
CMD ["node", "server/index.js"]
