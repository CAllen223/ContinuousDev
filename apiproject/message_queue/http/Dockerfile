FROM node:10
WORKDIR /usr/src/http
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8082
CMD [ "node", "server.js"]
