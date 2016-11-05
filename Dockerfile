FROM node:6.9.1
RUN apt-get update

ADD package.json /tmp/package.json
RUN cd /tmp && npm install --no-optional --production
RUN mkdir -p /src/app && cp -a /tmp/node_modules /src/app/

WORKDIR /src/app
ADD . /src/app

ENV SERVICE_NAME=heimdall
ENV SERVICE_TAGS=heimdall
ENV NODE_ENV production
ENV NODE_PATH ./src
ENV PORT=3000

EXPOSE 3000
CMD ["npm", "run", "start"]
