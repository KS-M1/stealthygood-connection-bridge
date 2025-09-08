FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
EXPOSE 5000

# Use node directly instead of npm to avoid signal issues
CMD ["node", "server.js"]
