FROM node:10
WORKDIR /usr/src/service1
COPY package.json .
RUN npm install    
COPY . .
EXPOSE 8001
CMD [ "node", "service1.js"]  