# Foobar

Foobar is a Python library for dealing with word pluralization.
##
requirement 

- docker
- docker-compose
## Installation

- Download the repositorie.
- Inside the project folder run the following command
~~~bash
docker-compose up
~~~
If it is the first time you ever run this project, you will have to populate the database.

To do so, go inside the "mocky" container and run the following command.
~~~bash
npm run populate-database
~~~


Refers to the postman collection to test your application. You can import a demo postman collection from the repositorie
You will have to generate a new auth token using the `/auth` endoint to use the "policies endpoint"