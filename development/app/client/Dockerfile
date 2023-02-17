FROM node:17-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 3000

ENV DATABASE_HOST=sql-server

CMD ["npm", "start"]