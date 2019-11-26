FROM node:carbon-slim

# Create app directory
WORKDIR /git/api_gateway

# Install app dependencies
COPY package.json /git/api_gateway
RUN npm install

# Bundle app source
COPY . /git/api_gateway
RUN npm run prepublish

EXPOSE 5000

CMD [ "npm", "run", "runServer" ]