# pull official base image
FROM node:13.12.0-alpine
RUN yarn config set proxy http://10.152.203.53:3128
RUN yarn config set https-proxy https://10.152.203.53:3128


# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN yarn add .

# add app
COPY . ./

# start app
CMD ["npm", "start"]