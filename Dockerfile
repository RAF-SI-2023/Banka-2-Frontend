# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:latest as build

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install all the dependencies
RUN npm install

# Copy the source code to the working directory
COPY . .

# Generate the build of the application
RUN if [ "$ENV" = "production" ]; then \
        npm run build:prod; \
    elif [ "$ENV" = "development" ]; then \
        npm run build:dev; \
    else \
        npm run build; \
    fi

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy the build output from the 'build' stage to replace the default nginx contents.
COPY --from=build /usr/src/app/dist/* /usr/share/nginx/html

# Copy custom Nginx config into container
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
