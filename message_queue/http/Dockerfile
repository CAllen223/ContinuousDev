FROM node:10
WORKDIR /usr/src/http
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "node", "server.js"]
