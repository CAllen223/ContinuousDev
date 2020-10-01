FROM node:10
WORKDIR /usr/src/service2
COPY package.json .
RUN npm install    
COPY . .
EXPOSE 8002
CMD [ "node", "service2.js"]  