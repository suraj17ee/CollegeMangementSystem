# Use nginx image
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy build folder to nginx's html directory
COPY build/ /usr/share/nginx/html

# Copy custom nginx config to run app on custom port
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8002
EXPOSE 8002

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
