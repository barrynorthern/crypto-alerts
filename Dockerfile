FROM node:16.5.0
WORKDIR /usr/src/app
COPY package*.json app.js utils.js .env ./
COPY dapps ./dapps
RUN npm install
EXPOSE 8080
CMD ["node", "app.js"]