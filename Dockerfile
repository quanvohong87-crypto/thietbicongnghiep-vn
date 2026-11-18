# ITC TECHNOLOGY - Industrial Web Platform Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package info
COPY package*.json ./

# Copy all application code
COPY . .

# Expose standard port
EXPOSE 3050

# Set environment variable
ENV PORT=3050
ENV NODE_ENV=production

# Start application
CMD ["node", "server.js"]
