FROM node:10
WORKDIR /usr/src/rest
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8081
COPY wait-for-it.sh /usr/wait-for-it.sh
RUN chmod +x /usr/wait-for-it.sh
CMD [ "node", "rest.js"]
