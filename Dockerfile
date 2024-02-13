# Use the official Node.js 14 Alpine image
FROM node:18.19.0-alpine3.18

# Set the working directory
WORKDIR /app

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Expose the port that ng serve will use
EXPOSE 4200

# Start ng serve when the container starts
CMD ["ng", "serve", "--host", "0.0.0.0"]

