FROM node:18.2-alpine3.15

WORKDIR /app
COPY ./package.json yarn.lock ./
RUN yarn install --production

COPY ./src ./src

CMD ["/bin/sh", "-c", "yarn start:prod"]

EXPOSE 3000
