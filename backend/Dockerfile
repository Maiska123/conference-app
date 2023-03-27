# Use Node.js as the base image
FROM node:14-alpine

# Create app directory and set as working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json .

RUN yarn install

# Copy the rest of the app files to the container
COPY . .

# Expose port 3000 for the backend API
EXPOSE 3000

# Start the backend API
CMD ["yarn", "run", "start"]
