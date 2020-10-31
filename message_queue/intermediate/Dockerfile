FROM node:10
WORKDIR /usr/src/intermediate
COPY package.json .
RUN npm install
COPY . .
RUN ls -l node_modules
COPY wait-for-it.sh /usr/wait-for-it.sh
RUN chmod +x /usr/wait-for-it.sh
