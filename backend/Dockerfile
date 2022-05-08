FROM node:18.1-alpine3.15

WORKDIR /app
COPY ./package.json yarn.lock ./
RUN yarn install --production

COPY ./start.sh ./
COPY ./src ./src

CMD ["./start.sh"]

EXPOSE 3000
