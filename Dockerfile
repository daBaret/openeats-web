FROM node:10-alpine3.11

# Create app directory
RUN mkdir /code
WORKDIR /code

# Install app dependencies
ADD . /code/

RUN apk update && apk add yarn python2 g++ make && rm -rf /var/cache/apk/*

# Run Yarn to install all dependencies
RUN yarn install --pure-lockfile
