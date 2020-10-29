FROM node:10
WORKDIR /usr/src/original
COPY package.json .
RUN npm install
COPY . .
RUN ls -l node_modules
CMD [ "node", "orig.js"]
