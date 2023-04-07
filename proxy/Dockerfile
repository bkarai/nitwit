FROM nginx:1.23.4-alpine as development
COPY nginx.development.conf /etc/nginx/nginx.conf

FROM nginx:1.23.4-alpine as production
RUN mkdir -p /var/www/certbot
RUN apk add certbot
COPY nginx.production.conf /etc/nginx/nginx.conf
COPY autorenew-cert.sh /
