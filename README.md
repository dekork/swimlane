# swimlane

swimlane is a tracker that tracks boats. This may be used tour operators, or other similar organizations. 

Boats can be placed in different swimlanes. They may be docked, outbound (out a voyage), or inbound (coming back to the dock), or out of service for maintenance. This tracker allows you to easily add and delete boats and keep track of their swimlane state.

___
#### Tech Stack Overview

Backend - Node, Express, MySQL
Frontend - React, React-Bootstrap
QA - Jest, Supertest
DevOps/Hosting - AWS ECS Fargate, AWS ECR, AWS RDS, CircleCI, GitHub

Database CICD was not implemented for RDS, ideally I would have tried to get something like Liquibase to work with CircleCI, and use a AWS. However I did setup a database initialization script, which should get initial deployments working easily.

___
#### API Endpoints
GET `/api/list/`

GET `/api/list/[ID]`

POST `/api/addboat`

POST `/api/editboat/[ID]`

DELETE `/api/deleteboat/[ID]`

___
#### Environment Variables
The following environment variables are **required** be set on the containers (or operating system, alternatively you can use a dotenv file [not implemented, you need to add this yourself])

###### Backend
`MYSQL_HOST` The address of the MySQL server/RDS instance

`MYSQL_USER` The username of the MySQL user that has CREATE and ALTER permissions on 'swimlane' (or any table)

`MYSQL_PASSWORD` The MYSQL_USER's password

##### Frontend
`REACT_APP_BACKEND_SERVICE_ADDRESS` The service address of the backend API service
___

#### Planning:
- [x] Work on backend first (on development environment)
- [x] Work on ECS/CICD config and push backend to AWS ECS
- [x] Work on Frontend (on development environment)
- [x] Work on ECS/CICD config for front end and push backend to AWS ECS
- [ ] Add more frontend tests
- [ ] Add enviroment variable error checking


___


