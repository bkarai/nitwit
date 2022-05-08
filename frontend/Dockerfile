FROM node:18.1-alpine3.15

WORKDIR /app
COPY ./package.json yarn.lock ./
RUN yarn install --production

COPY ./public ./public
COPY ./src ./src

CMD ["/bin/sh", "-c", "yarn start"]

EXPOSE 3000
