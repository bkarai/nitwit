FROM node:18.15-alpine3.17

WORKDIR /app
COPY ./package.json yarn.lock ./
RUN yarn install --production

COPY ./src ./src

CMD ["/bin/sh", "-c", "yarn start:prod"]

EXPOSE 3000
