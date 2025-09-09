FROM node:20-alpine

WORKDIR /app

# Copy server package files first (for better Docker caching)
COPY server/package*.json ./server/

# Install dependencies in the server directory
RUN cd server && npm install --only=production

# Copy all source code
COPY . .

# Expose port
EXPOSE 5000

# Change to server directory and run the app
WORKDIR /app/server
CMD ["node", "server.js"]
