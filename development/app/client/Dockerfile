FROM node:17-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 5000

ENV DATABASE_HOST=sqldata

CMD ["npm", "start"]