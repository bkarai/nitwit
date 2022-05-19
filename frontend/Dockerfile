FROM node:18.2-alpine3.15 as build

WORKDIR /app
COPY ./ ./
RUN yarn install && yarn build

FROM node:18.2-alpine3.15 as runtime
WORKDIR /app
RUN yarn global add serve@13.0.2 --exact
COPY --from=build /app/build ./build/
COPY --from=build /app/package.json ./
CMD ["/bin/sh", "-c", "yarn start:prod"]

EXPOSE 3000
