##################
### BASE IMAGE ###
##################
FROM node:18.15.0-alpine AS base

# Directory used in container
WORKDIR /usr/api/

# Copy everything
COPY . .

# Install TypeScript. Needed for build process.
RUN npm i -D typescript@5.2.2

# Compile to JavaScript build 
RUN npm run build


##################
### PROD IMAGE ###
##################
FROM node:18.15.0-alpine as prod
ENV NODE_ENV=production

ARG DATABASE_URL
# Add curl for health check
RUN apk --update --no-cache add curl

# Directory used in container
WORKDIR /usr/api/

# Install packages. Needed even for compiled build.
COPY package.json .
RUN npm i
# Need prisma for connection
RUN npm i prisma

# Copy compiled build from base
COPY --from=base /usr/api/dist .
COPY --from=base /usr/api/prisma /usr/api/prisma

RUN touch .env
RUN echo DATABASE_URL=${DATABASE_URL} >> .env

CMD npx prisma generate && npx prisma db push --schema='prisma/schema.prisma' --skip-generate && node server.js
