FROM node:18.15-alpine3.17 as build
WORKDIR /app
COPY ./package.json ./yarn.lock ./
RUN yarn install

COPY ./ ./
RUN yarn build

FROM node:18.15-alpine3.17 as runtime
WORKDIR /app
RUN yarn global add serve@14.2.0 --exact
COPY --from=build /app/build ./build/
COPY --from=build /app/package.json ./
CMD ["/bin/sh", "-c", "yarn start:prod"]

EXPOSE 3000
