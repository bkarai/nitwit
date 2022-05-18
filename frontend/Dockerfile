FROM node:18.1-alpine3.15
RUN yarn global add serve@13.0.2 --exact

WORKDIR /app/.tmp
COPY ./ ./
RUN yarn install
RUN yarn build

WORKDIR /app
RUN mv .tmp/build .tmp/package.json ./
RUN rm -rf .tmp

CMD ["/bin/sh", "-c", "yarn start:prod"]

EXPOSE 3000
