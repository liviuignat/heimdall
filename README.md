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
docker run -d -p 9200:9200 --name heimdall \
  --add-host "host-machine:10.0.0.80" \
  -e CONF='{"port":9200,"sessionSecret":"my-session-secret","loggedInRedirectUrl":"http://dev.everreal.co:9300/properties","baseUrl":"http://auth.dev.everreal.co:9200","redis":{"url":"redis://host-machine:6379"},"database":{"host":"host-machine","database":"everreal","username":"postgres","password":"password","dialect":"postgres","port":5432,"logging":false,"pool":{"idle":10000,"max":10,"min":0}},"logger":{"level":"info"},"notification":{"email":"everreal.dev@gmail.com","from":"\"EverReal\" <everreal.dev@gmail.com>","password":"everrealsecret"},"token":{"accessTokenExpiresIn":3600,"authorizationTokenExpiresIn":3600,"refreshTokenExpiresIn":2592000,"timeToCheckExpiredTokens":3600},"defaultClients":[{"id":"dbf8fc00-d7e1-11e6-be11-4df610fa68f6","clientSecret":"9864b910-d742-11e6-b754-976f8d441951","description":"EverReal Default client","name":"EverReal Default Client","trustedClient":true}]}' \
  heimdall
```
