# Stage 1: Build the React front-end
FROM node:lts-alpine AS build

# Set working directory to /app
WORKDIR /app

# Copy the client package.json and package-lock.json
COPY ./client/package*.json ./client/

# Install front-end dependencies
RUN cd client && npm install

# Copy the client source code
COPY ./client/ ./client/


# Stage 2: Set up the Node.js server
FROM node:lts-alpine

# Set working directory to /app
WORKDIR /app

# Copy server package.json and package-lock.json
COPY ./server/package*.json ./

# Install server dependencies
RUN npm install

# Copy the server source code
COPY ./server/ ./

# Copy the TypeScript compiled files from the server/dist directory
COPY ./server/dist ./dist

# Expose the port the app runs on
EXPOSE 3000

# Command to run the server
CMD ["node", "dist/server.js"]
