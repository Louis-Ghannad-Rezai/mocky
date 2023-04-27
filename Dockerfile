FROM node:16

RUN wget https://fastdl.mongodb.org/tools/db/mongodb-database-tools-debian92-x86_64-100.3.1.deb && \
    apt install ./mongodb-database-tools-*.deb && \
    rm -f mongodb-database-tools-*.deb

WORKDIR /usr/src/app


ADD package*.json ./
RUN npm install

ADD . .
EXPOSE 3000
CMD [ "node", "index.js" ]