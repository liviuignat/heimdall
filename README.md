# Heimdall 
### Node JS Authentication service built on Express and TypeScript
#### Following full OAuth2 specs

[![Build Status](https://travis-ci.org/liviuignat/heimdall.svg?branch=master)](https://travis-ci.org/liviuignat/heimdall)

#### Prerequisites
Install NodeJS and Docker locally
Postgres with Docker:
```
docker run -d \
 -p 5432:5432 \
 -e POSTGRES_PASSWORD=password \
 -e POSTGRES_USER=postgres \
 --volume /path/to/your/volume:/var/lib/postgresql/data \
 --name postgres \
 postgres \
 ```

#### Install

```sh
yarn install
yarn build 
yarn start

# just for dev
yarn dev 

# tests
yarn tests
yarn test-once
```
#### Docker

```sh
docker build -t heimdall .

docker run -d -p 3000:3000 --name heimdall \
  -e PORT=3000 \
  heimdall
```
