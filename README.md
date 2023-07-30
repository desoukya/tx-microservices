# Candy Store Architecture
The selected architecture for the candy store project consists of GraphQL microservices using Apollo Federation.
![image](https://drive.google.com/uc?export=view&id=1RshzdlvhnsTKYeyLZpBYPCt-L-5KN8Fh)

# Technologies & Frameworks
- Apollo GraphQL
- Nodejs
- Nestjs
- Prisma
- Postgres
- Lerna/Nx

# Monorepo
The project is structured as a monorepo comprised of gql-services and shared packages.

### Installation
Run :
 - `yarn`
 - `yarn bootstrap`
 - `yarn build`

### Prerequisite
- Download and run postgres server
- From the root of each microservice (gql/*), run the following:
 - `yarn db:migrate` to create tables in postgres
 - `yarn db:generate` to create the prisma client
 - `yarn db:seed` to initialize the db with sample data

### Start Services
Start the subgraphs first by navigating to the root directory of each microservice (gql/*) and running:
 - `yarn start`

Start the gateway next by navigating to gql/gateway and running:
- `yarn start`


 
