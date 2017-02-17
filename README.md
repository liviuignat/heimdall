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

# override configuration file by setting CONF environment variable with the stringified JSON
docker run -d -p 9200:9200 --name heimdall \
  -e CONF='{"redis":{"url":"redis://10.0.0.80:6379"}, "database":{"host":"10.0.0.80","port":5432,"database":"everreal","username":"postgres","password":"password","dialect":"postgres","logging":false,"pool":{"idle":10000,"max":10,"min":0}}}' \
  heimdall

# OR add host mapping for running the doker image on the local machine
MACHINE_IP=10.0.0.80 \
docker run -d -p 9200:9200 --name heimdall \
  --add-host "postgres":${MACHINE_IP} \
  --add-host "redis":${MACHINE_IP} \
  heimdall
```
