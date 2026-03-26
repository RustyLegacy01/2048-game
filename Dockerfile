# 2048 Game Docker Image
FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application files
COPY . .

# Create data directory for scores
RUN mkdir -p /app/data && touch /app/data/scores.json

# Expose the port
EXPOSE 8989

# Start the server
CMD ["node", "server.js"]
