# swimlane

Technologies used:
Backend - Node, Express, MySQL
Frontend - 
QA -
DevOps - 

App Requirements:
Backend - Basic CRUD API
/api/list/
/api/addboat
/api/editboat/[ID]
/api/deleteboat/[ID]


Design/Archetecture Choices:
Backend - Node, MySQL on AWS
Frontend - React on AWS
QA - Jest & Supertest to easily test http requests
DevOps - CircleCI with AWS Code Deploy - Database CICD was not implemented, ideally I would have tried to get something like Liquibase to work with CircleCI, and use a AWS RDS instance for the database instead of combining it with my backend container.

Planning:
[DONE]Work on backend first
Work on CICD and get backend working on AWS
- I can push a dockerfile to AWS, but I need MySQL to be pushed alongside it. Doing this with a dockerfile would be messy...I decided to create an RDS instance instead.
Once backend and CICD is working, Work on Frontend

If there is an issue with the mysql connection, the backend will crash. It would be good to run the backend with something like forever (npm package).

Environment Variables
The following environment variables must be set on the containers (or operating system, alternatively you can use a dotenv file [not implemented, you need to add this yourself])

Backend:
MYSQL_HOST = The address of the MySQL server/RDS instance
MYSQL_USER = The username of the MySQL user that has CREATE and ALTER permissions on 'swimlane' (or any table)
MYSQL_PASSWORD = The MYSQL_USER's password

Frontend:
REACT_APP_BACKEND_SERVICE_ADDRESS = The service address of the backend API service


