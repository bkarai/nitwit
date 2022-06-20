FROM nginx:1.21.6-alpine as development
COPY nginx.development.conf /etc/nginx/nginx.conf

FROM nginx:1.21.6-alpine as production
COPY nginx.production.conf /etc/nginx/nginx.conf
