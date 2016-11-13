# Heimdall 
### Node JS Authentication service built on Express and TypeScript

[![Build Status](https://api.travis-ci.org/liviuignat/heimdall.svg?branch=master)](https://api.travis-ci.org/liviuignat/heimdall)

#### Instal

```sh
yarn install
yarn run start
yarn run dev
```
#### Docker

```sh
docker build -t heimdall .

docker run -d -p 3000:3000 --name heimdall \
  -e PORT=3000 \
  -e ENV_TEST="test env" \
  -e ENV2_TEST="test env 2" \
  heimdall
```
