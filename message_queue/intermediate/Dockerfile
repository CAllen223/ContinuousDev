FROM node:10
WORKDIR /usr/src/intermediate
COPY package.json .
RUN npm install  
COPY . .
CMD [ "node", "interm.js"]
