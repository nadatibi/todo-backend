FROM node:alpine
WORKDIR /usr/src/app
COPY server.js .
COPY data.db .
COPY package.json .
RUN npm install
CMD ["node", "server.js"]