FROM node:10
WORKDIR /usr/src/original
COPY package.json .
RUN npm install  
COPY . .
CMD [ "node", "orig.js"]  
