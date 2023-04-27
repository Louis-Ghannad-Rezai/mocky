# mocky

Litle sample of js project
##
requirement for local installation :

- nodeJs
- npm
- a running mongodb server
- docker-compose
- docker
## Installation if you just need to run it on a container

- Download the repositorie.
- Inside the project folder run the following command
~~~bash
docker-compose up
~~~
If it is the first time you ever run this project, you will have to populate the database.

To do so, go inside the "mocky" container and run the following command.
~~~bash
npm run populate-database:docker
~~~


Refers to the postman collection to test your application. You can import a demo postman collection from the repositorie
You will have to generate a new auth token using the `/auth` endoint to use the "policies endpoint"

## Installation  if you want to run it localy

Download the repositorie.
Inside the project folder run the following command

~~~bash
wget https://fastdl.mongodb.org/tools/db/mongodb-database-tools-debian92-x86_64-100.3.1.deb && \
    apt install ./mongodb-database-tools-*.deb && \
    rm -f mongodb-database-tools-*.deb 
~~~
to install mongoImport.

then : 
~~~bash
npm install
~~~
If it is the first time that you run this application, you will have to populate the database localy. run the following command:
~~~bash
npm run populate-database:local
~~~
And set the local env to `local` before running the rest of the commands
You should be able to now run either the test batch :
~~~bash
npm test
~~~

or run the project localy
~~~bash
node index.js
~~~
