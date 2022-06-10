FROM node:18.3-alpine3.16

WORKDIR /app
COPY ./package.json yarn.lock ./
RUN yarn install --production

COPY ./src ./src

CMD ["/bin/sh", "-c", "yarn start:prod"]

EXPOSE 3000
