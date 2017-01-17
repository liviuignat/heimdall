FROM node:6.9.2-slim

RUN mkdir -p /src/app && cd /src/app
WORKDIR /src/app
COPY . /src/app
RUN npm install --production

WORKDIR /src/app
ADD . /src/app

RUN npm run build

ENV PORT=9200
EXPOSE 9200
CMD ["npm", "run", "start"]
