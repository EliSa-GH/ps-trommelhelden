
FROM node:latest
 
EXPOSE 5000

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install 

COPY . .
COPY config/database.js ./config/

ENV DATABASE_HOST=sqldata

CMD [ "node", "app.js" ]