# Stage 1: Build the Angular application
FROM node:lts-alpine AS build

WORKDIR /app

# Copy package configuration files
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install --frozen-lockfile

# Copy the rest of the application source code
COPY . .

# Build the application for production
# The output path is defined in angular.json (dist/erp-turismo-app)
RUN yarn build --configuration production

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the built application from the build stage
COPY --from=build /app/dist/erp-turismo-app /usr/share/nginx/html

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]

