FROM node:10
WORKDIR /usr/src/observer
COPY package.json .
RUN npm install
COPY . .
COPY results.txt /usr/results.txt
RUN chmod +x /usr/results.txt
RUN ls -l node_modules
COPY wait-for-it.sh /usr/wait-for-it.sh

# Install extra packages
RUN apt-get update
RUN apt-get install nano

# Start waiting for rabbitmqs
RUN chmod +x /usr/wait-for-it.sh
