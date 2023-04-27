FROM node:16
# Create app directory

#RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.9/main' >> /etc/apk/repositories
#RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.9/community' >> /etc/apk/repositories
#RUN apk update
#RUN apk add mongodb

#RUN mongo --version
RUN wget https://fastdl.mongodb.org/tools/db/mongodb-database-tools-debian92-x86_64-100.3.1.deb && \
    apt install ./mongodb-database-tools-*.deb && \
    rm -f mongodb-database-tools-*.deb

WORKDIR /usr/src/app

#Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
ADD package*.json ./
#RUN apt-get install -y mongodb 
RUN npm install

#RUN mongoimport --db mocky --collection users --file resources/client.json --jsonArray mongod://mongo:27017
#RUN mongoimport --db mocky --collection policies --file resources/policies.json --jsonArray mongod://mongo:27017
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
ADD . .
EXPOSE 3000
CMD [ "node", "index.js" ]