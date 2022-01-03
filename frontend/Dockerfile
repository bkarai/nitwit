FROM node:16.13.1-alpine3.14

WORKDIR /app
COPY ./package.json yarn.lock ./
RUN yarn install --production

COPY ./public ./public
COPY ./src ./src

CMD ["/bin/sh", "-c", "yarn start"]

EXPOSE 3000
