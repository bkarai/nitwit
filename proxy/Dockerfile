FROM nginx:1.23.3-alpine
RUN mkdir -p /var/www/certbot
RUN apk add certbot certbot-nginx
COPY nginx.conf /etc/nginx/nginx.conf
