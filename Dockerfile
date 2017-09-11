FROM node:8.4.0-alpine

RUN apk update && \
  apk add --no-cache \
  vim \
  make \
  python


# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 3000
CMD [ "node", "index.js" ]
