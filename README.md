# swimlane

swimlane is a tracker that tracks boats. This may be used tour operators, or other similar organizations. 

Boats can be placed in different swimlanes. They may be docked, outbound, inbound, or out of service for maintenance. This tracker allows you to easily add and delete boats and keep track of their swimlane state by editing any boat.

[AWS ECS Hosted Frontend](http://52.26.126.217/)

[AWS ECS Hosted Backend](http://34.223.135.122/)

___
#### Tech Stack Overview

**`Backend`** => Node, Express, MySQL

**`Frontend`** => React, React-Bootstrap

**`QA`** => Jest, Supertest

**`DevOps/Hosting`** => AWS ECS Fargate, AWS ECR, AWS RDS, CircleCI, GitHub

___
#### API Endpoints
GET `/api/list/`

GET `/api/list/{ID}`

POST `/api/addboat`

POST `/api/editboat/{ID}`

DELETE `/api/deleteboat/{ID}`


The API service was assumed to be setup as publicly accessible as no user authentication is required, as well as for endpoint testing.
___
#### Deployment
To deploy this project you will need to fork this repo to your own GitHub, and have CircleCI connected to it. Then you need to setup your ECR/ECS repositories and cluster. 

____
#### CircleCI Variables
The following variables must be set in CircleCI

`AWS_ACCESS_KEY_ID` The IAM user access key (IAM User should have the existing policies attached: AmazonEC2ContainerRegistryFullAccess and AmazonECS_FullAccess)

`AWS_SECRET_ACCESS_KEY` The IAM user access key secret/password

`AWS_ACCOUNT_ID` AWS Account ID shown in the top right menu under your username (I removed the dashes)

`AWS_ECR_REGISTRY_ID` The 12 digit AWS id associated with the ECR account. (Same as your Account ID, unless using another account's ECR repo...)

`AWS_REGION` The region you are hosting your ECS/ECR.

`AWS_RESOURCE_NAME_PREFIX` The resource name prefix (In following examples this is `swimlane`)

___
#### Environment Variables
The following environment variables are **required** be set on the containers/instances (or operating system, or IDE environment if in dev environment)
___
###### Backend
`MYSQL_HOST` The address of the MySQL server/RDS instance

`MYSQL_USER` The username of the MySQL user that has CREATE and ALTER permissions on 'swimlane' (or any table)

`MYSQL_PASSWORD` The MYSQL_USER's password

Note: if running node in with `NODE_ENV=development`, it overrides to a localhost MYSQL with hardcoded credentials in config/database.js.

##### Frontend
`REACT_APP_BACKEND_SERVICE_ADDRESS` The service address of the backend API service
___

#### ECR Setup
- Private repo for backend and frontend are created with the following names: swimlane-backend, swimlane-frontend... (i.e. '${AWS_RESOURCE_NAME_PREFIX}-frontend')

Now the CircleCI script can push images to ECR, but the pipeline will fail, you need to continue to setup ECS below.

___

#### ECS Setup
- Create task definitions of swimlane-backend, swimlane-frontend. Don't forget to add the environment variables above. Frontend container needs inbound port 3001 exposed. Backend container needs inbound port 3000 exposed.
- Create a cluster 'swimlane'
- Create 2 fargate single-task linux services under the cluster one for the frontend, and one for the backend (swimlane-frontend, swimlane-backend). I used 0.5CPU/1GB RAM per task. Note the VPC/subnets for creating the load balance to give the instances static IPs.
-Optionally create a [load balancer](https://aws.amazon.com/premiumsupport/knowledge-center/ecs-fargate-static-elastic-ip-address/) to have a static IP. If not you will need to check the task under Clusters->swimlane->Tasks tab->Click on task to view public IP.

___

#### Issues
- Database CICD was not implemented for RDS, ideally I would have tried to get something like Liquibase to work with CircleCI, and use it with RDS that way. However, I did setup a database initialization script (/backend/config/init.sql), which should get initial deployments working easily.
- There is no HTTPS implemented as I didn't have enough time. There is no user authentication to secure or anything confidential/mission critical data, but someone could potentially man in the middle and mess up the boat tracking ;)
- I was going to cleanup the frontend further and component-ize the Modal popup and (repeated) columns, but I ran into issues passing the modal functions back into the column. I admit I should have implemented these as components in the first place! 
- Attempting to make things into components took some time, I didn't have time to make the frontend look a bit better. I would have liked to made some padding around the add boat button, and perhaps add some icons. In the mobile view the boat status selector (when editing) leaks outside of the screen bounds in some cases, which I also would have fixed if I had more time.
- As there are multiple boat operators I assumed we would also want to have the operator names of each boat. This was not explicitly stated in the requirements but there was lots of mention of boat operators, I assumed this would be a good field to have - especially since adding it did not take too long to implement anyway.
- I assumed this to be only used by EcoCatch tours so I hard coded the name.
- The assignment wanted a "view" functionality however I implemented this in way that did not need the API to have an explicit view endpoint. Instead I only have a list function in the backend. I listed the boats by their status, and sent out it's full row data. Then on the frontend mapped only the boat names to display on the Kanban board, then displayed the rest of the data (view) once the full card (modal/pop-up) view was opened.
___
#### Todo:
- [x] Work on backend first (on development environment)
- [x] Work on ECS/CICD config and push backend to AWS ECS
- [x] Work on Frontend (on development environment)
- [x] Work on ECS/CICD config for front end and push backend to AWS ECS
- [ ] Add more frontend tests
- [ ] Componentalize frontend
- [ ] Add enviroment variable error checking
- [ ] Add HTTPS load balancer
___


