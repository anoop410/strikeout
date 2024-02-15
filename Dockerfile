# Use the official Node.js 14 Alpine image
FROM node:18.19.0-alpine3.18 AS build

# Set the working directory
WORKDIR /app
# copying .json package
COPY package*.json ./
# Install Angular CLI globally
RUN npm install
#RUN ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points
# COPY ALL the files
COPY . .
#RUN BUILD
RUN npm run build

# nginx docker container to run buld project
FROM nginx:stable
COPY --from=build /app/dist/sports-hub /usr/share/nginx/html
EXPOSE 80

